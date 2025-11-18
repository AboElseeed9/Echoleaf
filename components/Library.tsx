import React, { useState, useMemo } from 'react';
import type { SavedStudy } from '../types';
import { OutputDisplay } from './OutputDisplay';

interface LibraryProps {
  studies: SavedStudy[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const Library: React.FC<LibraryProps> = ({ studies, onDelete, onClearAll }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<SavedStudy | null>(null);
  const [bibtexCopied, setBibtexCopied] = useState(false);

  const filteredStudies = useMemo(() => {
    return studies.filter(study =>
      study.generatedContent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.originalInputs.studyText.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }, [studies, searchTerm]);

  const handleBackToList = () => {
    setSelectedStudy(null);
    setBibtexCopied(false);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all saved studies? This action cannot be undone.')) {
      onClearAll();
    }
  };

  const handleExportBibtex = () => {
    if (!selectedStudy) return;
    
    const { title, authorYear } = selectedStudy.generatedContent;
    const author = authorYear.split('(')[0].trim() || 'Unknown Author';
    const year = authorYear.match(/\d{4}/)?.[0] || new Date().getFullYear().toString();
    const cleanAuthor = author.replace(/[^a-zA-Z\s]/g, '').split(' ')[0];
    const key = `${cleanAuthor}${year}`;
    
    const bibtex = `@article{${key},
  title = {{${title}}},
  author = {${author}},
  year = {${year}},
  note = {Synthesized by EchoLeaf AI}
}`;

    navigator.clipboard.writeText(bibtex).then(() => {
        setBibtexCopied(true);
        setTimeout(() => setBibtexCopied(false), 2000);
    });
  };
  
  if (selectedStudy) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
            <button onClick={handleBackToList} className="btn-secondary text-sm px-4 py-2 rounded-full inline-flex items-center">
            <BackIcon />
            <span className="ml-2">Back to Library</span>
            </button>
            <button 
                onClick={handleExportBibtex} 
                className="btn-secondary text-sm px-4 py-2 rounded-full inline-flex items-center transition-all-theme"
            >
                {bibtexCopied ? <CheckIcon /> : <QuoteIcon />}
                <span className="ml-2">{bibtexCopied ? 'Copied!' : 'Export BibTeX'}</span>
            </button>
        </div>
        <OutputDisplay 
          content={selectedStudy.generatedContent}
          initialTone={selectedStudy.originalInputs.tone}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-text-primary">Research Library</h2>
        {studies.length > 0 && (
          <button onClick={handleClear} className="btn-secondary text-sm px-4 py-2 rounded-full inline-flex items-center !text-danger border-danger/50 hover:!border-danger">
            <TrashIcon className="w-4 h-4" />
            <span className="ml-2">Clear All</span>
          </button>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search your saved studies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input !pl-10"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon />
        </div>
      </div>
      
      {filteredStudies.length > 0 ? (
        <ul className="space-y-4">
          {filteredStudies.map(study => (
            <li key={study.id} className="card p-4 rounded-2xl flex justify-between items-center transition-all-theme hover:border-[var(--btn-secondary-border)]">
              <button onClick={() => setSelectedStudy(study)} className="text-left flex-grow mr-4">
                <h3 className="font-semibold text-text-primary">{study.generatedContent.title}</h3>
                <p className="text-sm text-text-muted">
                  Saved on {new Date(study.savedAt).toLocaleDateString()}
                </p>
              </button>
              <button onClick={() => onDelete(study.id)} className="btn-icon text-text-muted hover:text-danger">
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 text-text-secondary">
          <p>{studies.length === 0 ? "Your library is empty. Save a summary to get started." : "No studies found matching your search."}</p>
        </div>
      )}
    </div>
  );
};

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-muted"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const TrashIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
const CheckIcon = ({ className = "w-4 h-4" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;
