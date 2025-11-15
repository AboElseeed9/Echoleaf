
import React from 'react';
import type { ResearchData } from '../types';

interface Props {
    timelineData: ResearchData['evolutionTimeline'];
}

export const EvolutionTimeline: React.FC<Props> = ({ timelineData }) => {
    const sortedData = [...timelineData].sort((a, b) => a.year - b.year);
    
    return (
        <section>
            <h3 className="text-2xl font-bold text-text-primary mb-10">Research Evolution Timeline</h3>
            <div className="relative border-l-2 border-border ml-4">
                {sortedData.map((item, index) => (
                    <div key={index} className="mb-12 ml-8 group">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-bkgd rounded-full -left-4 ring-8 ring-bkgd border-2 border-primary">
                             <span className="w-3 h-3 rounded-full" style={{background: 'var(--gradient-primary)'}}></span>
                        </span>
                        <div className="p-5 card rounded-2xl relative transition-all-theme group-hover:shadow-lg group-hover:-translate-y-1">
                            <time className="text-sm font-semibold text-gradient">{item.year}</time>
                            <p className="mt-1 text-sm text-text-secondary">Citations: {item.citationCount}</p>
                            <p className="mt-2 text-base text-text-primary">{item.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
