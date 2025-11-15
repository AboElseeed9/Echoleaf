import React from 'react';
import type { ResearchData } from '../types';

interface Props {
    headerData: ResearchData['summaryHeader'];
}

export const ResearchSummaryHeader: React.FC<Props> = ({ headerData }) => {
    const getScoreColor = (score: ResearchData['summaryHeader']['summaryScore']) => {
        switch (score) {
            case 'Strong Evidence':
                return 'bg-primary/10 text-primary border-primary/20';
            case 'Moderate Evidence':
                return 'bg-accent-complementary/10 text-accent-complementary border-accent-complementary/20';
            case 'Preliminary Evidence':
                return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20';
            default:
                return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20';
        }
    };


    return (
        <div className="p-6 card rounded-2xl">
            <h2 className="text-3xl font-bold text-text-primary">{headerData.topic}</h2>
            <p className="text-sm text-text-secondary mt-1">Generated on: {headerData.generatedDate}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getScoreColor(headerData.summaryScore)}`}>
                    {headerData.summaryScore}
                </span>
                {headerData.availableFilters.map(filter => (
                    <button key={filter} className="text-sm px-3 py-1 rounded-full card text-text-secondary hover:border-primary hover:text-primary transition-all-theme">
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};