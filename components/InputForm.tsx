import React, { useState, useRef } from 'react';
import type { FormData } from '../types';
import { TONES, OUTPUT_FORMATS, CATEGORIES, AUDIENCES, LENGTHS, STYLE_REWRITES } from '../constants';
import { Dropdown } from './Dropdown';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [studyText, setStudyText] = useState('');
  const [studyUrls, setStudyUrls] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [studyFile, setStudyFile] = useState<{ name: string; mimeType: string; data: string; } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tone, setTone] = useState(TONES[0]);
  const [outputFormat, setOutputFormat] = useState(OUTPUT_FORMATS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [length, setLength] = useState(LENGTHS[2]);
  const [styleRewrite, setStyleRewrite] = useState<string[]>([]);

  const handleStyleChange = (style: string) => {
    setStyleRewrite(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };
  
  const handleAddUrl = () => {
    if (currentUrl) {
        try {
            new URL(currentUrl);
            setStudyUrls([currentUrl]);
            setCurrentUrl('');
            setStudyText('');
            setStudyFile(null);
        } catch (_) {
            alert('Please enter a valid URL.');
        }
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setStudyUrls(studyUrls.filter(url => url !== urlToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.type !== 'application/pdf') {
          alert('Please select a PDF file.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            const base64Data = (loadEvent.target?.result as string)?.split(',')[1];
            if (base64Data) {
                setStudyFile({
                    name: file.name,
                    mimeType: file.type,
                    data: base64Data,
                });
                setStudyText('');
                setStudyUrls([]);
            }
        };
        reader.onerror = () => {
            alert('Failed to read file.');
        }
        reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
      setStudyFile(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setStudyText(e.target.value);
      if (e.target.value) {
          setStudyFile(null);
          setStudyUrls([]);
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studyText.trim() && !studyFile && studyUrls.length === 0) {
        alert("Please paste study text, upload a PDF, or provide a URL to synthesize.");
        return;
    }
    onSubmit({ studyText, studyFile, studyUrls, tone, outputFormat, category, audience, length, styleRewrite });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
       <div className="space-y-3">
        <label htmlFor="studyText" className="block text-lg font-semibold text-text-primary">
          1. Provide Study Content
        </label>
        <div className="relative">
          <textarea
            id="studyText"
            value={studyText}
            onChange={handleTextChange}
            rows={8}
            className="form-input"
            placeholder="Paste the text from the scientific study here..."
          />
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" id="pdf-upload" />
             <label htmlFor="pdf-upload" className="btn-secondary cursor-pointer text-sm font-semibold py-2 px-4 rounded-full inline-flex items-center">
                 <UploadIcon />
                 <span className="ml-2">Upload PDF</span>
             </label>
           </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-text-muted">
            <hr className="w-full border-border"/>
            <span>OR</span>
            <hr className="w-full border-border"/>
        </div>

        <div className="flex items-center gap-2">
            <input
              type="url"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              className="form-input text-sm"
              placeholder="Enter a URL to a study..."
            />
            <button type="button" onClick={handleAddUrl} className="btn-secondary px-5 py-3 rounded-2xl font-semibold text-sm">Add</button>
        </div>
      </div>

      {(studyFile || studyUrls.length > 0) && (
        <div className="space-y-2">
            {studyFile && (
                <div className="flex items-center justify-between bg-[var(--surface-subtle)] p-3 rounded-2xl text-sm transition-all-theme">
                    <span className="text-text-secondary truncate pr-2">{studyFile.name}</span>
                    <button type="button" onClick={handleRemoveFile} className="text-text-muted hover:text-red-500 p-1 rounded-full transition-colors"> <TrashIcon /> </button>
                </div>
            )}
            {studyUrls.map(url => (
                <li key={url} className="flex items-center justify-between list-none bg-[var(--surface-subtle)] p-3 rounded-2xl text-sm transition-all-theme">
                    <span className="text-text-secondary truncate pr-2">{url}</span>
                    <button type="button" onClick={() => handleRemoveUrl(url)} className="text-text-muted hover:text-red-500 p-1 rounded-full transition-colors"> <TrashIcon /> </button>
                </li>
            ))}
        </div>
      )}
      
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-text-primary">
            2. Define Output Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Dropdown label="Target Tone" selected={tone} onSelect={setTone} options={TONES} />
            <Dropdown label="Output Format" selected={outputFormat} onSelect={setOutputFormat} options={OUTPUT_FORMATS} />
            <Dropdown label="Category" selected={category} onSelect={setCategory} options={CATEGORIES} />
            <Dropdown label="Audience" selected={audience} onSelect={setAudience} options={AUDIENCES} />
            <Dropdown label="Length" selected={length} onSelect={setLength} options={LENGTHS} />
        </div>
      </div>

      <div className="space-y-4">
          <label className="block text-lg font-semibold text-text-primary">Style Rewrite (Optional)</label>
          <div className="flex flex-wrap gap-3">
              {STYLE_REWRITES.map(style => (
                  <Chip key={style} label={style} selected={styleRewrite.includes(style)} onClick={() => handleStyleChange(style)} />
              ))}
          </div>
      </div>
      
      <div className="border-t border-border pt-8 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary inline-flex items-center justify-center px-10 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : 'Synthesize Study'}
        </button>
      </div>
    </form>
  );
};

interface ChipProps { label: string; selected: boolean; onClick: () => void; }

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all-theme duration-200 ${
            selected 
                ? 'text-white' 
                : 'text-text-secondary bg-[var(--surface-subtle)] hover:bg-[var(--input-border)]'
        }`}
        style={{ background: selected ? 'var(--gradient-primary)' : undefined }}
    >
        {label}
    </button>
);

const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;