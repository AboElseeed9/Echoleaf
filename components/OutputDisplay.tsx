
import React, { useState } from 'react';
import type { GeneratedContent } from '../types';

interface OutputDisplayProps {
  content: GeneratedContent;
  initialTone: string;
}

const MarkdownRenderer: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/(\n\s*){2,}/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');

    return <div className={`leading-relaxed ${className}`} dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = [
      `# ${content.title}`,
      `## ${content.subtitle}`,
      `### Summary`,
      content.summary,
      `---`,
      `### Full Analysis`,
      content.mainContent,
      content.selfHelpOutline ? `--- \n### Professional Self-Help Outline\n ${content.selfHelpOutline}` : ''
    ].join('\n\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article className="prose prose-lg max-w-none prose-p:text-text-secondary prose-strong:text-text-primary prose-headings:text-text-primary text-text-primary">
      <div className="flex justify-between items-start flex-wrap gap-y-4">
        <div className="flex-grow pr-4">
          <h1 className="text-4xl md:text-5xl font-bold !text-text-primary !mb-2">{content.title}</h1>
          <p className="text-xl md:text-2xl text-text-secondary mt-0">{content.subtitle