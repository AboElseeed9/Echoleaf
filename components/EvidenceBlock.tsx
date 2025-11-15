import React from 'react';
import type { ResearchData } from '../types';

interface Props {
    blockData: ResearchData['evidenceBlocks'][0];
}

const StrengthIndicator: React.FC<{ strength: string }> = ({ strength }) => {
    const getStrengthInfo = (strengthVal: string) => {
        const normalized = (strengthVal || '').toLowerCase();
        switch (normalized) {
            case 'strong':
                return { label: 'Strong', color: 'bg-primary/10 text-primary border-primary/20' };
            case 'medium':
                 return { label: 'Medium', color: 'bg-accent-complementary/10 text-accent-complementary border-accent-complementary/20' };
            case 'low':
                return { label: 'Low', color: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20' };
            default:
                return { label: 'N/A', color: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20' };
        }
    };

    const strengthInfo = getStrengthInfo(strength);

    return (
        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold leading-none rounded-full border ${strengthInfo.color}`}>
            {strengthInfo.label}
        </span>
    );
};

export const EvidenceBlock: React.FC<Props> = ({ blockData }) => {
    return (
        <div className="card p-6 rounded-2xl space-y-5 transition-all-theme">
            <div>
                <h4 className="font-bold text-primary">Key Findings:</h4>
                <ul className="list-disc list-inside mt-2 text-text-secondary space-y-1">
                    {blockData.keyFindings.map((finding, i) => <li key={i}>{finding}</li>)}
                </ul>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm">
                <div className="flex items-center gap-2">
                    <strong className="text-text-primary">Strength:</strong>
                    <StrengthIndicator strength={blockData.strengthOfEvidence} />
                </div>
                <div className="flex items-center gap-3 flex-grow min-w-[150px]">
                    <strong className="text-text-primary">Confidence:</strong>
                    <div className="w-full bg-bkgd rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${blockData.confidence}%` }}></div>
                    </div>
                    <span className="font-semibold text-primary">{blockData.confidence}%</span>
                </div>
            </div>
            <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg">
                <p className="font-semibold text-text-secondary">
                    {blockData.insight}
                </p>
            </div>
        </div>
    );
};