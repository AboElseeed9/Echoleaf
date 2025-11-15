
import React from 'react';

type Tab = 'Synthesizer' | 'Chatbot' | 'Research Mode';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    activeTab?: Tab;
    setActiveTab?: (tab: Tab) => void;
    variant?: 'app' | 'home';
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeTab, setActiveTab, variant = 'app' }) => {
  const tabs: Tab[] = ['Synthesizer', 'Chatbot', 'Research Mode'];

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
              <div role="tablist" className="flex justify-center items-center space-x-6 sm:space-x-10">
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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFB774'}} />
                <stop offset="45%" style={{stopColor: '#FF8A75'}} />
                <stop offset="100%" style={{stopColor: '#F06DD9'}} />
            </linearGradient>
        </defs>
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 12 2 12 2Z" fill="url(#logoGradient)" fillOpacity="0.1"/>
        <path d="M12 4C10.129 4 8.42306 4.79317 7.23401 6.02341C7.81749 6.22053 8.35808 6.54191 8.82283 6.97659C9.71239 7.81031 10.2222 8.96916 10.2222 10.2222C10.2222 11.4753 9.71239 12.6341 8.82283 13.4678C8.35808 13.9025 7.81749 14.2239 7.23401 14.421C8.42306 15.6512 10.129 16.4444 12 16.4444C14.4533 16.4444 16.4444 14.4533 16.4444 12C16.4444 9.54671 14.4533 7.55556 12 7.55556C11.3651 7.55556 10.762 7.66989 10.2222 7.86889V10.2222H12.5757C12.3768 9.68239 12.0654 9.1418 11.6307 8.67705C11.196 8.2123 10.6554 7.86889 10.2222 7.86889" fill="url(#logoGradient)"/>
        <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22V20Z" fill="url(#logoGradient)"/>
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
