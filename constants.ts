

export const LANGUAGES = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese (Simplified)',
    'Japanese',
    'Arabic',
    'Portuguese',
    'Russian',
    'Hindi'
] as const;

export const TASK_TEMPLATES = [
    'Standard Summary',
    'Write a layperson summary for a patient leaflet',
    'Create exam-style key points',
    'Draft discussion points for journal club',
    'Extract data for a literature review table',
    'Generate a press release draft',
    'Generate Self-Help Article Outline'
] as const;

export const TONES = [
    'Professional', 
    'Casual', 
    'Academic', 
    'Journalistic', 
    'Empathetic',
    'Objective',
    'Persuasive',
    'Inspirational',
    'Technical',
    'Creative'
] as const;

export const OUTPUT_FORMATS = [
    'Article', 
    'Blog Post', 
    'Executive Summary', 
    'Presentation Slides', 
    'Tweet Thread',
    'LinkedIn Post',
    'Infographic Script',
    'Podcast Script',
    'FAQ Document',
    'Email Newsletter'
] as const;

export const CATEGORIES = [
    'Health & Medicine', 
    'Technology & CS', 
    'Environmental Science', 
    'Social Sciences', 
    'Economics',
    'Physics & Astronomy',
    'Psychology',
    'History & Arts',
    'Business & Finance',
    'Engineering'
] as const;

export const AUDIENCES = [
    'General Public', 
    'Undergraduate Students', 
    'Graduate Researchers', 
    'Industry Experts', 
    'Policy Makers',
    'High School Students',
    'Investors',
    'Journalists',
    'Patients & Caregivers',
    'Hobbyists'
] as const;

export const LENGTHS = [
    'Very Short (Tweet)',
    'Short (~250 words)', 
    'Medium (~500 words)', 
    'Long (~1000 words)',
    'Detailed (~1500 words)'
] as const;

export const STYLE_REWRITES = [
    'Simplify Language', 
    'Add Analogies', 
    'Use Bullet Points', 
    'Provide Actionable Steps', 
    'Include a Q&A',
    'Format as Markdown',
    'Focus on Practical Implications',
    'Structure as a Story'
] as const;