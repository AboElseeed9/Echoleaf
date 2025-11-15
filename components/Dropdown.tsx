import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: readonly string[];
  selected: string;
  onSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-text-primary mb-2">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="form-input text-left flex justify-between items-center"
        >
          <span className="text-text-primary">{selected}</span>
          <svg className={`w-5 h-5 text-text-secondary transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-[var(--surface-card)] rounded-2xl shadow-lg max-h-60 overflow-auto focus:outline-none transition-all-theme border border-border">
            {options.map(option => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="p-3 text-sm text-text-primary hover:bg-[var(--surface-subtle)] cursor-pointer transition-colors"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};