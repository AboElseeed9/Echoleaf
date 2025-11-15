

import React from 'react';
import type { GeneratedContent } from '../types';
import { KeyEvidencePanel } from './KeyEvidencePanel';


interface OutputDisplayProps {
  content: GeneratedContent;
  onSave: () => void;
}

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/(\n\s*){2,}/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');

    return <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, onSave }) => {
  return (
    <article className="prose prose-lg max-w-none prose-p:text-text-secondary prose-strong:text-text-primary prose-headings:text-text-primary">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold !text-text-primary !mb-2">{content.title}</h1>
          <p className="text-xl md:text-2xl text-text-secondary mt-0">{content.subtitle}</p>
        </div>
        <button onClick={onSave} className="btn-secondary flex-shrink-0 ml-4 px-4 py-2 text-sm font-semibold rounded-full inline-flex items-center">
            <SaveIcon />
            <span className="ml-2">Save to Library</span>
        </button>
      </div>
      
      <p className="mt-6 text-xl text-text-secondary">{content.summary}</p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Author & Year" icon="user">
            <p>{content.authorYear}</p>
        </InfoCard>
        <InfoCard title="Core Contradiction" icon="contradiction">
            <p>{content.contradiction}</p>
        </InfoCard>
        <InfoCard title="Key Finding Simplified" icon="clarity">
            <p>{content.clarityEngine}</p>
        </InfoCard>
      </div>

      {content.keyEvidence && <KeyEvidencePanel evidence={content.keyEvidence} />}
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-text-primary border-b border-border pb-4">High-Impact Insights</h2>
        <ul className="list-none p-0 mt-6 space-y-4">
            {content.insights.map((insight, index) => (
                <li 
                    key={index} 
                    className="flex items-start p-5 card rounded-2xl opacity-0 animate-fade-in-up transition-all-theme"
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                    <div className="flex-shrink-0 h-7 w-7 mt-1">
                      <SparkleIcon />
                    </div>
                    <div className="ml-4 text-text-primary">
                        <MarkdownRenderer text={insight} />
                    </div>
                </li>
            ))}
        </ul>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-text-primary border-b border-border pb-4">Full Analysis</h2>
        <div className="mt-6 text-text-secondary leading-loose">
            <MarkdownRenderer text={content.mainContent} />
        </div>
      </div>

      {content.limitationsAndBias && content.limitationsAndBias.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-text-primary border-b border-border pb-4">Limitations & Bias Checker</h2>
          <div className="mt-6 space-y-4">
            {content.limitationsAndBias.map((item, index) => (
              <div key={index} className="flex items-start p-5 card rounded-2xl bg-primary/10 border-primary/20">
                <div className="flex-shrink-0 h-7 w-7 mt-1 text-primary">
                  <ContradictionIcon />
                </div>
                <div className="ml-4">
                  <p className="text-text-primary">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

const InfoCard: React.FC<{title: string, icon: string, children: React.ReactNode}> = ({ title, icon, children }) => {
    const icons: {[key: string]: React.ReactElement} = {
        user: <UserIcon />,
        contradiction: <ContradictionIcon />,
        clarity: <ClarityIcon />
    }
    return (
        <div className="card p-5 rounded-2xl transition-all-theme">
            <div className="flex items-center">
                <div className="h-7 w-7 mr-3">{icons[icon]}</div>
                <h3 className="text-md font-semibold text-text-primary">{title}</h3>
            </div>
            <div className="mt-2 text-text-secondary text-base">{children}</div>
        </div>
    )
}

const GradientDefs = () => (
    <svg width="0" height="0" style={{position: 'absolute'}}>
        <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFB774'}} />
                <stop offset="45%" style={{stopColor: '#FF8A75'}} />
                <stop offset="100%" style={{stopColor: '#F06DD9'}} />
            </linearGradient>
        </defs>
    </svg>
);

const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>;
const SparkleIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="url(#iconGradient)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.211.842.211-.842a3.375 3.375 0 00-2.455-2.456l-.842-.211.842-.211a3.375 3.375 0 002.455-2.456l.211-.842.211.842a3.375 3.375 0 002.455 2.456l.842.211-.842.211a3.375 3.375 0 00-2.455 2.456z" /></svg></>;
const UserIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></>;
const ContradictionIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg></>;
const ClarityIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311l-3.75 0m3.75-7.478c.097-.057.195-.111.293-.169m-1.5.189v.21c.58.093 1.15.204 1.7.343m-3 0a11.954 11.954 0 01-3 0m1.5-7.478c1.333.36 2.333.787 3 1.293m-3-1.293c-1.333.36-2.333.787-3 1.293m0 0a2.25 2.25 0 002.044 2.044m-2.044-2.044a2.25 2.25 0 012.044 2.044" /></svg></>;