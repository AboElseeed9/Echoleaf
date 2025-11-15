import React from 'react';
import type { ApiResponse, AcademicResult } from '../types';

interface ResultsDisplayProps {
  data: ApiResponse;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  const { searchResults, explanation } = data;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-200">Search Results</h2>
        <div className="mt-2 p-3 bg-slate-800 rounded-md text-sm">
            <span className="font-semibold text-slate-400">Optimized query used: </span>
            <span className="text-emerald-400 font-mono">{searchResults.search_query_used}</span>
            {searchResults.source_activated !== 'general' && (
                <span className="ml-4 pl-4 border-l border-slate-600 font-semibold text-slate-400">
                    Source: <span className="text-cyan-400">{searchResults.source_activated}</span>
                </span>
            )}
        </div>
      </div>

      <div className="space-y-6">
        {searchResults.results.length > 0 ? (
            searchResults.results.map((result, index) => (
                <ResultCard key={index} result={result} />
            ))
        ) : (
            <div className="text-center py-10 px-6 bg-slate-800/50 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-300">No Academic Results Found</h3>
                <p className="mt-2 text-slate-400">The AI could not find relevant academic papers for this query. Please try rephrasing your search.</p>
            </div>
        )}
      </div>

      {explanation && (
        <div>
            <h3 className="text-xl font-semibold text-slate-200 mb-3">Academic Explanation</h3>
            <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700 prose prose-invert prose-p:text-slate-300 prose-strong:text-slate-100">
                <p>{explanation}</p>
            </div>
        </div>
      )}
    </div>
  );
};

const ResultCard: React.FC<{ result: AcademicResult }> = ({ result }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg transition-all hover:border-emerald-500/50">
            <h4 className="text-xl font-bold text-emerald-400">
                <a href={result.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{result.title}</a>
            </h4>
            <div className="mt-2 text-sm text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                <span><strong>Authors:</strong> {result.authors || 'N/A'}</span>
                <span><strong>Year:</strong> {result.year || 'N/A'}</span>
                <span><strong>Journal:</strong> {result.journal || 'N/A'}</span>
                <span><strong>Citations:</strong> {result.citations || 'N/A'}</span>
            </div>
            <p className="mt-4 text-slate-300">{result.summary || 'No summary available.'}</p>
            {result.key_findings && (
                <div className="mt-3 p-3 bg-slate-800 rounded-md">
                    <p><strong className="text-slate-200">Key Finding:</strong> {result.key_findings}</p>
                </div>
            )}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-cyan-900 text-cyan-300">{result.evidence_level || 'N/A'}</span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300">{result.source_website || 'N/A'}</span>
                </div>
                {result.pdf !== 'Not found' && (
                     <a href={result.pdf} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:underline">
                        View PDF
                    </a>
                )}
            </div>
        </div>
    );
}