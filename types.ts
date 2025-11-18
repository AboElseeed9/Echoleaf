

export interface FormData {
  studyText: string;
  studyFile?: {
    name: string;
    mimeType: string;
    data: string; // base64 encoded
  } | null;
  studyUrls: string[];
  tone: string;
  outputFormat: string;
  category: string;
  audience: string;
  length: string;
  styleRewrite: string[];
  language: string;
  taskTemplate: string;
  thinkingMode?: boolean;
}

export interface GeneratedContent {
  title: string;
  subtitle: string;
  summary: string;
  authorYear: string;
  contradiction: string;
  clarityEngine: string;
  insights: string[];
  mainContent: string;
  keyEvidence: {
    sampleSize: string;
    studyType: string;
    mainResults: string;
    confidenceIntervals: string;
    pValues: string;
  };
  limitationsAndBias: string[];
  selfHelpOutline?: string;
}

export interface SavedStudy {
  id: string;
  originalInputs: FormData;
  generatedContent: GeneratedContent;
  savedAt: string;
}


export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ResearchData {
  summaryHeader: {
    topic: string;
    generatedDate: string;
    summaryScore: 'Strong Evidence' | 'Moderate Evidence' | 'Preliminary Evidence';
    availableFilters: string[];
  };
  evidenceBlocks: {
    keyFindings: string[];
    strengthOfEvidence: 'low' | 'medium' | 'strong';
    confidence: number;
    insight: string;
  }[];
  comparativeTable: {
    topic: string;
    impactStrength: string;
    effectType: string;
    citationCount: number;
  }[];
  evolutionTimeline: {
    year: number;
    citationCount: number;
    summary: string;
  }[];
  sources: {
    uri: string;
    title: string;
  }[];
  questionGenerator: string[];
}