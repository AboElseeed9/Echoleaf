
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { FormData, GeneratedContent, ChatMessage, ResearchData } from '../types';

const generativeModel = 'gemini-2.5-flash';
const chatModel = 'gemini-2.5-flash-lite';
const researchModel = 'gemini-2.5-pro';

const getAI = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

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

const mapGeminiError = (error: any, context?: 'research' | 'chat' | 'synthesis'): string => {
    const msg = error?.message || '';
    
    if (msg.includes('429')) return "Daily API quota exceeded. Please try again later.";
    
    if (msg.includes('400') || msg.includes('INVALID_ARGUMENT')) {
        return "The request was invalid. Please check your inputs.";
    }
    
    if (msg.includes('503') || msg.includes('500')) return "The AI service is currently overloaded. Please try again in a moment.";
    if (msg.includes('SAFETY')) return "The content generation was blocked due to safety settings.";
    
    return "An error occurred while communicating with the AI. Please check your connection.";
};

export const generateContent = async (formData: FormData): Promise<GeneratedContent> => {
    const ai = getAI();
    
    const getPromptConfig = (isSynthesis: boolean) => {
        if (formData.taskTemplate === 'Generate Self-Help Article Outline') {
            return `
                You are an expert in creating structured, motivational self-help content. Your task is to take a core topic and structure it into a self-help article outline, then format that outline into a specific JSON structure that the application can render.

                **CORE TOPIC:**
                ${formData.studyText}

                **FIRST, THINK STEP-BY-STEP to create the outline:**
                1.  **Problem:** Clearly define the core problem related to the topic.
                2.  **Turning Point:** Describe the transformative mindset shift required to overcome the problem.
                3.  **Solutions:** Create 3 actionable, step-by-step solutions that begin with a verb.
                4.  **Advice:** Formulate a single, concise piece of advice that is easy to remember.
                5.  **Quote:** Find a powerful and relevant quote to inspire the reader.
                6.  **Title:** Create a compelling title for the self-help article.

                **SECOND, YOUR FINAL TASK is to map your created outline into the following JSON object. This is the only thing you should output. Ensure all markdown formatting is correctly escaped for the JSON string.**

                \`\`\`json
                {
                  "title": "[Your generated title]",
                  "subtitle": "[Your generated quote]",
                  "summary": "[Your generated concise advice]",
                  "authorYear": "Self-Help Outline",
                  "contradiction": "[Your description of the Problem]",
                  "clarityEngine": "[Your description of the Turning Point]",
                  "insights": [
                    "[Your first Step-by-Step Solution]",
                    "[Your second Step-by-Step Solution]",
                    "[Your third Step-by-Step Solution]"
                  ],
                  "mainContent": "### The Problem\\n[A Markdown-formatted string of your description of the Problem.]\\n\\n### The Turning Point\\n[A Markdown-formatted string of your description of the Turning Point.]\\n\\n### 3 Steps to Take\\n1. **[Solution 1]**\\n2. **[Solution 2]**\\n3. **[Solution 3]**",
                  "keyEvidence": {
                    "sampleSize": "N/A",
                    "studyType": "N/A",
                    "mainResults": "N/A",
                    "confidenceIntervals": "N/A",
                    "pValues": "N/A"
                  },
                  "limitationsAndBias": []
                }
                \`\`\`
            `;
        }
        
        const commonConfig = `
            - Tone: ${formData.tone}
            - Output Format: ${formData.outputFormat}
            - Category: ${formData.category}
            - Target Audience: ${formData.audience}
            - Desired Length: ${formData.length}
            - Style Rewrites: ${formData.styleRewrite.join(', ') || 'None'}
            - Output Language: Generate the output in ${formData.language}. Preserve scientific terms where appropriate.
            - Task Template: Structure the output according to the '${formData.taskTemplate}' template.
        `;

        if (isSynthesis) {
            return `
                You are an expert science communicator and research analyst. Your task is to synthesize information from multiple scientific studies into a single, clear, engaging piece of content. Analyze all provided sources to find common themes, contrasting findings, and the overall consensus.

                **CONTENT REQUIREMENTS:**
                ${commonConfig}

                **YOUR TASK:**
                First, analyze the studies and generate all the content for the JSON structure below.
                Second, based on the practical implications of the synthesized findings, create a professional self-help article outline. The outline should be a single Markdown string containing these sections: Problem, Turning Point, 3 Actionable Steps, Final Advice, and a relevant Quote.
                Finally, generate a single JSON object with the following structure. Do not include any text before or after the JSON block.


                \`\`\`json
                {
                  "title": "[A compelling, SEO-friendly title that reflects the synthesis of the studies in ${formData.language}]",
                  "subtitle": "[An engaging subtitle that summarizes the collective findings in ${formData.language}]",
                  "summary": "[A 2-3 sentence 'TL;DR' summary of the overall consensus or key debate from the sources in ${formData.language}]",
                  "authorYear": "[List the primary studies, e.g., 'Smith et al. (2023), Chen (2022)'] or if many, state 'Synthesis of multiple studies']",
                  "contradiction": "[What are the key contradictions or differing results between the studies? If none, what is the core problem they collectively address? In ${formData.language}]",
                  "clarityEngine": "[Explain the single most important synthesized finding as if you were talking to a 5th grader. In ${formData.language}]",
                  "insights": [
                    "[Insight 1: A high-impact takeaway from the combined evidence. In ${formData.language}]",
                    "[Insight 2: Another significant point, perhaps highlighting a point of agreement or disagreement. In ${formData.language}]",
                    "[Insight 3: A final key insight about the state of the research on this topic. In ${formData.language}]"
                  ],
                  "mainContent": "[The main body of the content, written as a literature review or synthesis. Compare and contrast the studies according to the specified format, tone, and audience. Use markdown for formatting. In ${formData.language}]",
                  "keyEvidence": {
                    "sampleSize": "[Describe the range or total sample size, e.g., 'Total n > 2000 across studies']",
                    "studyType": "[List the types of studies included, e.g., 'RCTs and Observational Studies']",
                    "mainResults": "[Summarize the main quantitative results from the synthesis, e.g., 'Most studies found a significant effect, with an average reduction of 20%']",
                    "confidenceIntervals": "['Not applicable for synthesis' or summarize if possible]",
                    "pValues": "['Most studies reported p < 0.05']"
                  },
                  "limitationsAndBias": [
                    "[Identify a general limitation across the body of evidence, e.g., 'Most studies were short-term.']",
                    "[Identify another potential limitation, e.g., 'Publication bias may favor positive results.']"
                  ],
                  "selfHelpOutline": "[Your generated Markdown self-help outline based on the synthesis here.]"
                }
                \`\`\`
            `;
        }

        return `
            You are an expert science communicator and research analyst. Your task is to transform a dense scientific study into a clear, engaging, and multi-faceted piece of content, while also extracting key data points and potential limitations.
            
            **CONTENT REQUIREMENTS:**
            ${commonConfig}

            **YOUR TASK:**
            First, analyze the study and generate all the content for the JSON structure below.
            Second, based on the practical implications of the study, create a professional self-help article outline. The outline should be a single Markdown string containing these sections: Problem, Turning Point, 3 Actionable Steps, Final Advice, and a relevant Quote.
            Finally, generate a single JSON object with the following structure. Do not include any text before or after the JSON block.

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
              ],
              "selfHelpOutline": "[Your generated Markdown self-help outline here.]"
            }
            \`\`\`
        `;
    };

    try {
        let response: GenerateContentResponse;

        const lineCount = (formData.studyText.match(/\n/g) || []).length + 1;
        const wordCount = formData.studyText.split(/\s+/).filter(Boolean).length;
        const isTopicSearch = !formData.studyFile && formData.studyUrls.length === 0 && formData.studyText.trim().length > 0 && (formData.studyText.trim().length < 500 || (wordCount > 0 && wordCount / lineCount < 15));
        const isSynthesis = formData.studyUrls.length > 1 || isTopicSearch;

        const basePrompt = getPromptConfig(isSynthesis);
        
        const modelToUse = formData.thinkingMode ? researchModel : generativeModel;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const modelConfig: any = {};
        if (formData.thinkingMode) {
            modelConfig.thinkingConfig = { thinkingBudget: 32768 };
        }


        if (isSynthesis && formData.taskTemplate !== 'Generate Self-Help Article Outline') {
            const sources = formData.studyUrls.length > 1 
                ? `Analyze the studies from these URLs:\n${formData.studyUrls.join('\n')}`
                : `Find and analyze studies on these topics:\n${formData.studyText}`;
            
            const promptWithSources = `First, find and analyze the scientific studies based on the following:
            ${sources}
            
            After you have analyzed the studies, please perform the following synthesis task:
            ${basePrompt}`;

            response = await ai.models.generateContent({
                model: modelToUse,
                contents: promptWithSources,
                config: {
                    ...modelConfig,
                    tools: [{ googleSearch: {} }],
                },
            });
        } else {
            // SINGLE STUDY LOGIC (or Self-Help)
            if (formData.studyFile) {
                const promptWithFile = `Your first and most critical task is to accurately parse the entire PDF document. It may contain complex structures such as multi-column layouts, scientific tables, figures with captions, and unconventional formatting. Pay close attention to extracting all textual content, including headers, footers, and data from tables, before proceeding with the analysis. High-fidelity text extraction is paramount.\n\nAfter extracting the text, perform the following analysis:\n\n${basePrompt}`;
                response = await ai.models.generateContent({
                    model: modelToUse,
                    contents: {
                        parts: [
                            { inlineData: { mimeType: formData.studyFile.mimeType, data: formData.studyFile.data } },
                            { text: promptWithFile }
                        ]
                    },
                    config: modelConfig,
                });
            } else if (formData.studyUrls.length === 1) {
                const url = formData.studyUrls[0];
                const promptWithUrl = `First, find and analyze the scientific study located at the following URL: ${url}.
                
                After you have analyzed the study, please perform the following task:
                ${basePrompt}`;
                
                response = await ai.models.generateContent({
                    model: modelToUse,
                    contents: promptWithUrl,
                    config: {
                        ...modelConfig,
                        tools: [{ googleSearch: {} }],
                    },
                });

            } else {
                // This branch handles both plain text study and the self-help outline topic
                const promptWithText = `
                    **INPUT STUDY TEXT / TOPIC:**
                    ---
                    ${formData.studyText}
                    ---
                    ${basePrompt}
                `;
                response = await ai.models.generateContent({
                    model: modelToUse,
                    contents: promptWithText,
                    config: modelConfig
                });
            }
        }

        const content = parseJsonFromMarkdown<GeneratedContent>(response.text);
        if (!content) {
            throw new Error("The AI returned an invalid data format.");
        }
        return content;
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error(mapGeminiError(error, 'synthesis'));
    }
};


export const sendMessage = async (history: ChatMessage[], context: GeneratedContent | null): Promise<string> => {
    const ai = getAI();
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
        throw new Error(mapGeminiError(error, 'chat'));
    }
};

export const getResearchData = async (topic: string): Promise<ResearchData> => {
    const ai = getAI();
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
        throw new Error(mapGeminiError(error, 'research'));
    }
};
