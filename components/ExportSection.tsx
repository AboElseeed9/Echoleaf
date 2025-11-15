
import React from 'react';

export const ExportSection: React.FC = () => {

    const handleExport = (format: string) => {
        alert(`Exporting as ${format}. (This is a demo feature)`);
    }

    return (
        <section>
            <h3 className="text-2xl font-bold text-text-primary mb-6">Export</h3>
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => handleExport('PDF')}
                    className="btn-secondary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all-theme"
                >
                    <FileIcon />
                    Export as PDF
                </button>
                 <button
                    onClick={() => handleExport('BibTeX')}
                    className="btn-secondary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all-theme"
                >
                    <QuoteIcon />
                    Export Citations (BibTeX)
                </button>
            </div>
        </section>
    );
};

const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
