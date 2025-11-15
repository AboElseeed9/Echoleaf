import React from 'react';
import { Loader } from './Loader';
import type { ResearchData } from '../types';
import { ResearchSummaryHeader } from './ResearchSummaryHeader';
import { EvidenceBlock } from './EvidenceBlock';
import { ComparativeTable } from './ComparativeTable';
import { EvolutionTimeline } from './EvolutionTimeline';
import { FollowUpBox } from './FollowUpBox';
import { ExportSection } from './ExportSection';

interface ResearchModeProps {
  data: ResearchData | null;
  isLoading: boolean;
  error: string | null;
  onQuestionClick: (question: string) => void;
}

export const ResearchMode: React.FC<ResearchModeProps> = ({ data, isLoading, error, onQuestionClick }) => {
  if (isLoading) {
    return (
        <div className="text-center py-10">
            <Loader />
            <p className="mt-4 text-text-secondary">Analyzing research and searching for consensus...</p>
        </div>
    );
  }

  if (error && !data) {
    return <div className="text-danger bg-danger/10 p-4 rounded-2xl">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center text-text-secondary py-10">Generate a study in the Synthesizer tab and click "Dive Deeper" to see research data here.</div>;
  }

  return (
    <div className="space-y-16">
      <ResearchSummaryHeader headerData={data.summaryHeader} />
      
      {data.evidenceBlocks && data.evidenceBlocks.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-text-primary mb-6">Evidence Blocks</h3>
          <div className="mt-4 space-y-6">
            {data.evidenceBlocks.map((block, i) => <EvidenceBlock key={i} blockData={block} />)}
          </div>
        </section>
      )}

      {data.comparativeTable && data.comparativeTable.length > 0 && (
        <ComparativeTable tableData={data.comparativeTable} />
      )}
      
      {data.evolutionTimeline && data.evolutionTimeline.length > 0 && (
        <EvolutionTimeline timelineData={data.evolutionTimeline} />
      )}

      {data.sources && data.sources.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-text-primary mb-6">Sources</h3>
            <div className="glass-card p-6 rounded-2xl">
                <ul className="space-y-4">
                    {data.sources.map((source, i) => (
                        <li key={i}>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-focus transition-colors group">
                                <span className="font-semibold group-hover:underline">{source.title || 'Untitled Source'}</span>
                                <span className="block text-sm text-text-secondary truncate">{source.uri}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
          </section>
      )}

      <FollowUpBox questions={data.questionGenerator} onQuestionClick={onQuestionClick} />
      <ExportSection />
    </div>
  );
};