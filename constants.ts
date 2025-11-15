export const ACADEMIC_WEBSITES = [
    { name: 'Google Scholar', domain: 'scholar.google.com' },
    { name: 'PubMed', domain: 'pubmed.ncbi.nlm.nih.gov' },
    { name: 'NIH', domain: 'nih.gov' },
    { name: 'ResearchGate', domain: 'researchgate.net' },
    { name: 'ScienceDirect', domain: 'sciencedirect.com' },
    { name: 'Springer', domain: 'link.springer.com' },
    { name: 'Nature', domain: 'nature.com' },
    { name: 'IEEE Xplore', domain: 'ieeexplore.ieee.org' },
    { name: 'ACM Digital Library', domain: 'dl.acm.org' },
    { name: 'The Lancet', domain: 'thelancet.com' },
    { name: 'BMJ', domain: 'bmj.com' },
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