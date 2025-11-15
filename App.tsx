

import React, { useState, useEffect, useCallback } from 'react';
import type { FormData, GeneratedContent, ChatMessage, ResearchData, SavedStudy } from './types';
import * as geminiService from './services/geminiService';
import { useLibrary } from './hooks/useLibrary';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { Chatbot } from './components/Chatbot';
import { ResearchMode } from './components/ResearchMode';
import { HomePage } from './components/HomePage';
import { Library } from './components/Library';


type Tab = 'Synthesizer' | 'Chatbot' | 'Research Mode' | 'Library';

const App: React.FC = () => {
    // Theme management
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme');
            if (storedTheme === 'light' || storedTheme === 'dark') {
                return storedTheme;
            }
        }
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark'; // Default
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // App state
    const [showApp, setShowApp] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('Synthesizer');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { savedStudies, saveStudy, deleteStudy } = useLibrary();

    // State for each tab
    const [currentSynthesisResult, setCurrentSynthesisResult] = useState<{ formData: FormData, content: GeneratedContent } | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [researchData, setResearchData] = useState<ResearchData | null>(null);

    const handleEnterApp = useCallback(() => {
        setShowApp(true);
    }, []);

    const handleSynthesize = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        setCurrentSynthesisResult(null);
        try {
            const content = await geminiService.generateContent(formData);
            setCurrentSynthesisResult({ formData, content });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSaveToLibrary = () => {
        if (currentSynthesisResult) {
            saveStudy({
                id: Date.now().toString(),
                savedAt: new Date().toISOString(),
                originalInputs: currentSynthesisResult.formData,
                generatedContent: currentSynthesisResult.content,
            });
            alert('Study saved to your library!');
        }
    };

    const handleSendMessage = useCallback(async (message: string) => {
        const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', content: message }];
        setChatMessages(newMessages);
        setIsLoading(true);
        setError(null);

        try {
            const response = await geminiService.sendMessage(newMessages, currentSynthesisResult?.content ?? null);
            setChatMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
            setChatMessages(prev => [...prev, { role: 'model', content: `Sorry, I encountered an error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    }, [chatMessages, currentSynthesisResult]);

    const handleResearch = useCallback(async (topic: string) => {
        setActiveTab('Research Mode');
        setIsLoading(true);
        setError(null);
        setResearchData(null);
        try {
            const data = await geminiService.getResearchData(topic);
            setResearchData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChatbotQuestion = (question: string) => {
        setActiveTab('Chatbot');
        handleSendMessage(question);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Synthesizer':
                return (
                    <>
                        <InputForm onSubmit={handleSynthesize} isLoading={isLoading} />
                        {error && !isLoading && <div className="mt-6 text-danger bg-danger/10 p-4 rounded-2xl">{error}</div>}
                        {currentSynthesisResult && (
                            <div key={currentSynthesisResult.content.title} className="mt-12 border-t border-border pt-12">
                                <OutputDisplay content={currentSynthesisResult.content} onSave={handleSaveToLibrary} />
                                <div className="mt-16 text-center">
                                    <button
                                        onClick={() => handleResearch(currentSynthesisResult.content.title)}
                                        className="btn-primary px-8 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isLoading}
                                    >
                                        Dive Deeper with Research Mode
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                );
            case 'Chatbot':
                return <Chatbot 
                    messages={chatMessages} 
                    onSendMessage={handleSendMessage} 
                    isLoading={isLoading}
                    initialPrompts={currentSynthesisResult ? [
                        `Explain the key findings of "${currentSynthesisResult.content.title}" in simpler terms.`,
                        `What are the limitations of the study on "${currentSynthesisResult.content.title}"?`,
                        `Who would benefit most from the results of "${currentSynthesisResult.content.title}"?`,
                        `What are the practical applications of "${currentSynthesisResult.content.title}"?`,
                    ] : []}
                />;
            case 'Research Mode':
                return <ResearchMode 
                    data={researchData} 
                    isLoading={isLoading} 
                    error={error} 
                    onQuestionClick={handleChatbotQuestion}
                />;
            case 'Library':
                return <Library studies={savedStudies} onDelete={deleteStudy} />;
            default:
                return null;
        }
    };

    if (!showApp) {
        return <HomePage onEnterApp={handleEnterApp} theme={theme} toggleTheme={toggleTheme} />;
    }

    return (
        <div className="min-h-screen text-text-primary transition-all-theme overflow-hidden">
            <main className="container mx-auto px-4 py-8 md:py-12">
                <Header 
                    theme={theme} 
                    toggleTheme={toggleTheme} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                    variant="app"
                />
                
                <div className="max-w-5xl mx-auto mt-8">
                    <div className="card p-6 sm:p-10 rounded-3xl transition-all-theme min-h-[60vh]">
                        {renderContent()}
                    </div>
                </div>
                 <footer className="text-center py-8 mt-8">
                    <p className="text-sm text-text-muted">Designed by EchoLeaf AI</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
