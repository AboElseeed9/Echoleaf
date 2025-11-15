import React from 'react';
// Fix: Use the correct constant `ACADEMIC_WEBSITES` which is exported from constants.ts.
import { ACADEMIC_WEBSITES } from '../constants';
// Fix: Import the type `AcademicWebsite` from the central types.ts file.
import type { AcademicWebsite } from '../types';

interface QuickAccessGridProps {
  onSearch: (query: string, source: AcademicWebsite) => void;
  isLoading: boolean;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ onSearch, isLoading }) => {
  return (
    <div className="mt-6">
        <p className="text-center text-sm text-slate-500 mb-3">Or start your search on a specific platform:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ACADEMIC_WEBSITES.map(source => (
                <button
                    key={source.name}
                    onClick={() => onSearch(source.name, source)}
                    disabled={isLoading}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-center text-sm font-medium text-slate-300 hover:bg-slate-700 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {source.name}
                </button>
            ))}
        </div>
    </div>
  );
};
