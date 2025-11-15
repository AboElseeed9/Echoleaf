

import React from 'react';

type Tab = 'Synthesizer' | 'Chatbot' | 'Research Mode' | 'Library';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    activeTab?: Tab;
    setActiveTab?: (tab: Tab) => void;
    variant?: 'app' | 'home';
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeTab, setActiveTab, variant = 'app' }) => {
  const tabs: Tab[] = ['Synthesizer', 'Chatbot', 'Research Mode', 'Library'];

  return (
    <header className={variant === 'home' ? 'container mx-auto px-4' : ''}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <p className="text-2xl font-bold text-text-primary tracking-tight">
            EchoLeaf
          </p>
        </div>
        <button 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
          className="p-2 rounded-full text-text-secondary hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-bkgd transition-all-theme"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>

      {variant === 'app' && activeTab && setActiveTab && (
          <>
            <div className="text-center my-10 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">Welcome to EchoLeaf</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                Transform dense scientific studies into beautiful, clear, actionable content. Explore research deeper than ever before with AI.
              </p>
            </div>

            <nav aria-label="Primary navigation" className="mt-8 mb-4">
              <div role="tablist" className="flex justify-center items-center space-x-2 sm:space-x-10 flex-wrap">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-3 px-2 font-semibold text-base sm:text-lg transition-all-theme duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bkgd ${
                      activeTab === tab 
                        ? 'text-text-primary' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'var(--gradient-primary)'}}></span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
        </>
      )}
    </header>
  );
};

const LogoIcon = () => (
    <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB774" />
                <stop offset="45%" stopColor="#FF8A75" />
                <stop offset="100%" stopColor="#F06DD9" />
            </linearGradient>
            <style>
                {`
                    .circuit-branch {
                        stroke: #1A1026;
                        fill: #1A1026;
                    }
                `}
            </style>
        </defs>
        <path d="M60 5C30 25 15 55 15 70C15 90 33 110 60 105C87 110 105 90 105 70C105 55 90 25 60 5Z" fill="url(#brandGradient)"/>
        
        {/* The circuit branches inside the leaf */}
        <g className="circuit-branch" strokeWidth="3.5" strokeLinecap="round">
            <path d="M60 95V60" />
            <path d="M60 78L40 63" />
            <path d="M60 78L80 63" />
            <path d="M60 60L45 48" />
            <path d="M60 60L75 48" />
        </g>
        <g className="circuit-branch">
            <circle cx="60" cy="98" r="4.5" />
            <circle cx="40" cy="63" r="4.5" />
            <circle cx="80" cy="63" r="4.5" />
            <circle cx="45" cy="48" r="4.5" />
            <circle cx="75" cy="48" r="4.5" />
        </g>
        
        {/* The golden data streams */}
        <g stroke="url(#brandGradient)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
            <path d="M90 65 C 98 63, 105 59, 110 53" strokeDasharray="5 5" />
            <path d="M92 78 C 102 76, 110 72, 115 65" strokeDasharray="5 5" />
            <path d="M88 52 C 95 50, 102 46, 107 40" strokeDasharray="5 5" />
        </g>
         <g fill="url(#brandGradient)" opacity="0.9">
            <circle cx="110" cy="53" r="3" />
            <circle cx="115" cy="65" r="3" />
            <circle cx="107" cy="40" r="3" />
        </g>
    </svg>
);


const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);