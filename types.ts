export interface AcademicWebsite {
  name: string;
  domain: string;
}

export interface SearchFilters {
  pdfOnly: boolean;
  peerReviewed: boolean;
  systematicReviews: boolean;
  metaAnalyses: boolean;
  clinicalTrials: boolean;
  yearStart: string;
  yearEnd: string;
}

export interface SearchResult {
  title: string;
  source: string;
  year: string;
  link: string;
  summary: string;
}

export interface SearchResponseData {
  query_used: string;
  website_selected: string;
  filters_used: string[];
  results: SearchResult[];
}

export interface ApiResponse {
  searchResults: SearchResponseData;
  explanation?: string;
}

// Fix: Add missing type definitions for various components.
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

export interface AcademicResult {
  title: string;
  link: string;
  authors: string | null;
  year: string | null;
  journal: string | null;
  citations: number | null;
  summary: string | null;
  key_findings: string | null;
  evidence_level: string | null;
  source_website: string | null;
  pdf: string | null;
}
