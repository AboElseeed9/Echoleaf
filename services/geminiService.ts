
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { FormData, GeneratedContent, ChatMessage, ResearchData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const generativeModel = 'gemini-2.5-flash';
const chatModel = 'gemini-2.5-flash-lite';
const researchModel = 'gemini-2.5-pro';

const parseJsonFromMarkdown = <T>(text: string): T | null => {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]) as T;
        } catch (e) {
            console.error("Failed to parse JSON from markdown", e);
            // Fallback for cases where the model doesn't use markdown
            try {
                return JSON.parse(text) as T;
            } catch (e2) {
                console.error("Failed to parse JSON directly", e2);
                return null;
            }
        }
    }
    // Fallback for cases where the model returns raw JSON without markdown
    try {
        return JSON.parse(text) as T;
    } catch (e) {
        console.error("Failed to parse JSON directly", e);
    }
    return null;
}

export const generateContent = async (formData: FormData): Promise<GeneratedContent> => {
    const basePrompt = `
        You are an expert science communicator and research analyst. Your task is to transform a dense scientific study into a clear, engaging, and multi-faceted piece of content, while also extracting key data points and potential limitations.
        
        **CONTENT REQUIREMENTS:**
        - Tone: ${formData.tone}
        - Output Format: ${formData.outputFormat}
        - Category: ${formData.category}
        - Target Audience: ${formData.audience}
        - Desired Length: ${formData.length}
        - Style Rewrites: ${formData.styleRewrite.join(', ') || 'None'}
        - Output Language: Generate the output in ${formData.language}. Preserve scientific terms where appropriate.
        - Task Template: Structure the output according to the '${formData.taskTemplate}' template.

        **YOUR TASK:**
        Generate a JSON object with the following structure. Do not include any text before or after the JSON block.

        \`\`\`json
        {
          "title": "[A compelling, SEO-friendly title in ${formData.language}]",
          "subtitle": "[An engaging subtitle that hooks the reader in ${formData.language}]",
          "summary": "[A 2-3 sentence 'TL;DR' summary in plain language in ${formData.language}]",
          "authorYear": "[Identify the primary author and year, e.g., 'Smith et al. (2023)']",
          "contradiction": "[What is the core problem or contradiction this study addresses? In ${formData.language}]",
          "clarityEngine": "[Explain the single most important finding as if you were talking to a 5th grader. In ${formData.language}]",
          "insights": [
            "[Insight 1: A high-impact takeaway, formatted with markdown for bolding/italics. In ${formData.language}]",
            "[Insight 2: Another significant point, formatted with markdown. In ${formData.language}]",
            "[Insight 3: A final key insight, formatted with markdown. In ${formData.language}]"
          ],
          "mainContent": "[The main body of the content, written according to the specified format, tone, and audience. Use markdown for formatting (headings, lists, bold, italics). In ${formData.language}]",
          "keyEvidence": {
            "sampleSize": "[Extract the sample size, e.g., 'n=256' or 'Not specified']",
            "studyType": "[Extract the study type, e.g., 'Randomized Controlled Trial', 'Observational Study', 'Meta-analysis']",
            "mainResults": "[Summarize the main quantitative results, e.g., '25% reduction in symptoms']",
            "confidenceIntervals": "[Extract the confidence interval, e.g., '95% CI [0.65, 0.85]']",
            "pValues": "[Extract the p-value, e.g., 'p < 0.05' or 'Not significant']"
          },
          "limitationsAndBias": [
            "[Identify a potential limitation or bias, e.g., 'Small sample size limits generalizability.']",
            "[Identify another potential limitation, e.g., 'Potential for selection bias as participants were self-referred.']",
            "[Identify another, e.g., 'Lack of a long-term follow-up period.']"
          ]
        }
        \`\`\`
    `;

    try {
        let response: GenerateContentResponse;

        if (formData.studyFile) {
            const promptWithFile = `Based on the attached scientific study, ${basePrompt}`;
            response = await ai.models.generateContent({
                model: generativeModel,
                contents: {
                    parts: [
                        { inlineData: { mimeType: formData.studyFile.mimeType, data: formData.studyFile.data } },
                        { text: promptWithFile }
                    ]
                }
            });
        } else if (formData.studyUrls.length > 0) {
            const url = formData.studyUrls[0];
            const promptWithUrl = `First, find and analyze the scientific study located at the following URL: ${url}.
            
            After you have analyzed the study, please perform the following task:
            ${basePrompt}`;
            
            response = await ai.models.generateContent({
                model: generativeModel,
                contents: promptWithUrl,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

        } else {
            const promptWithText = `
                **INPUT STUDY TEXT:**
                ---
                ${formData.studyText}
                ---
                ${basePrompt}
            `;
            response = await ai.models.generateContent({
                model: generativeModel,
                contents: promptWithText,
            });
        }

        const content = parseJsonFromMarkdown<GeneratedContent>(response.text);
        if (!content) {
            throw new Error("The AI returned an invalid data format.");
        }
        return content;
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content from the study.");
    }
};

export const sendMessage = async (history: ChatMessage[], context: GeneratedContent | null): Promise<string> => {
    const geminiHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
    }));

    const lastMessage = history[history.length - 1];
    let userPrompt = lastMessage.content;

    if (context) {
        userPrompt = `
            CONTEXT from the study titled "${context.title}":
            - Summary: ${context.summary}
            - Main Content: ${context.mainContent.substring(0, 2000)}...
            - Key Evidence: ${JSON.stringify(context.keyEvidence)}
            - Limitations: ${context.limitationsAndBias.join(', ')}

            Based on the context above, please answer the following question from the user:
            
            USER QUESTION: "${lastMessage.content}"
        `;
    }

    try {
        const chat: Chat = ai.chats.create({
            model: chatModel,
            history: geminiHistory,
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message: userPrompt });
        return response.text;
    } catch (error) {
        console.error("Error sending chat message:", error);
        throw new Error("Failed to get a response from the chatbot.");
    }
};

export const getResearchData = async (topic: string): Promise<ResearchData> => {
    const prompt = `
        You are a research analyst AI. Your goal is to synthesize information about a given topic using Google Search and present it in a structured JSON format. You have an extended thinking budget to provide a high-quality, comprehensive analysis.

        **TOPIC:** "${topic}"

        **YOUR TASK:**
        Perform a comprehensive search on the topic. Analyze the search results to identify key findings, evidence strength, consensus, and evolution over time. Generate a single JSON object with the exact structure below.

        \`\`\`json
        {
          "summaryHeader": {
            "topic": "${topic}",
            "generatedDate": "${new Date().toLocaleDateString()}",
            "summaryScore": "Moderate Evidence",
            "availableFilters": ["Key Studies", "Contrasting Views", "Future Directions"]
          },
          "evidenceBlocks": [
            {
              "keyFindings": ["Finding 1 from search", "Finding 2 from search"],
              "strengthOfEvidence": "medium",
              "confidence": 85,
              "insight": "A summary of what this evidence block implies based on search results."
            }
          ],
          "comparativeTable": [
            {
              "topic": "Aspect 1 of ${topic}",
              "impactStrength": "High",
              "effectType": "Positive",
              "citationCount": 500
            }
          ],
          "evolutionTimeline": [
            {
              "year": 2021,
              "citationCount": 150,
              "summary": "A key development or study published this year found via search."
            }
          ],
          "sources": [],
          "questionGenerator": [
            "What are the ethical implications of '${topic}'?",
            "How does '${topic}' compare to related fields?",
            "What is the next step in this research area?"
          ]
        }
        \`\`\`

        **INSTRUCTIONS:**
        1.  **CRITICAL**: The "sources" array in the JSON should be left empty. It will be populated programmatically.
        2.  Fill all other fields with relevant, synthesized information based on your search.
        3.  The final output must be only the JSON object, with no other text.
    `;

    try {
        const response = await ai.models.generateContent({
            model: researchModel,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                thinkingConfig: { thinkingBudget: 32768 },
            },
        });

        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map(chunk => ({
              uri: chunk.web?.uri || '',
              title: chunk.web?.title || 'Untitled Source'
          }))
          .filter(source => source.uri) || [];
        
        const data = parseJsonFromMarkdown<ResearchData>(response.text);
        if (!data) {
            throw new Error("The AI returned an invalid data format for research mode.");
        }
        
        data.sources = sources;

        return data;

    } catch (error) {
        console.error("Error fetching research data:", error);
        throw new Error("Failed to fetch research data.");
    }
};
