import React from 'react';
import type { GeneratedContent } from '../types';

interface KeyEvidencePanelProps {
  evidence: GeneratedContent['keyEvidence'];
}

export const KeyEvidencePanel: React.FC<KeyEvidencePanelProps> = ({ evidence }) => {
  const evidenceItems = [
    { label: "Study Type", value: evidence.studyType, icon: <StudyTypeIcon /> },
    { label: "Sample Size", value: evidence.sampleSize, icon: <SampleSizeIcon /> },
    { label: "Main Results", value: evidence.mainResults, icon: <ResultsIcon /> },
    { label: "P-Values", value: evidence.pValues, icon: <PValueIcon /> },
    { label: "Confidence Intervals", value: evidence.confidenceIntervals, icon: <CI_Icon /> },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-text-primary border-b border-border pb-4">Key Numbers & Evidence</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidenceItems.filter(item => item.value && item.value.toLowerCase() !== 'not specified' && item.value.toLowerCase() !== 'n/a').map((item, index) => (
          <div 
            key={item.label} 
            className="card p-5 rounded-2xl flex items-start opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 w-7 h-7 mr-4 mt-1">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{item.label}</h3>
              <p className="text-text-secondary">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
const StudyTypeIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125z" /></svg></>;
const SampleSizeIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-2.438M15 19.128v-3.86a2.25 2.25 0 01.9-1.75l2.45-1.788M15 19.128l-2.45-1.788a2.25 2.25 0 00-.9-1.75v-3.86m0-3.86l2.45-1.788a2.25 2.25 0 01.9-1.75l2.45-1.788m-4.8 12.022a2.25 2.25 0 01-1.8 0l-2.45-1.788a2.25 2.25 0 01-.9-1.75v-3.86m-1.8 0a2.25 2.25 0 01-1.8 0l-2.45 1.788a2.25 2.25 0 00-.9 1.75v3.86m6.6 0l2.45 1.788a2.25 2.25 0 001.8 0l2.45-1.788m-6.6 0l-2.45-1.788a2.25 2.25 0 00-1.8 0l-2.45 1.788m6.6 0l-2.45-1.788" /></svg></>;
const ResultsIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m1-1.5l1 1.5m0 0l1 1.5m-2-1.5l-1-1.5m-1.5-3l1.5-1.5m0 0l1.5 1.5m-1.5-1.5V3" /></svg></>;
const PValueIcon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25" /></svg></>;
const CI_Icon = () => <><GradientDefs /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#iconGradient)" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25M3 8.25V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M12 12h.008v.008H12V12zm0 4.5h.008v.008H12v-.008zm-4.5-4.5h.008v.008H7.5V12zm0 4.5h.008v.008H7.5v-.008zm9-4.5h.008v.008H16.5V12zm0 4.5h.008v.008H16.5v-.008z" /></svg></>;
