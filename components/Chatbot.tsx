import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface ChatbotProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  initialPrompts?: string[];
}

export const Chatbot: React.FC<ChatbotProps> = ({ messages, onSendMessage, isLoading, initialPrompts = [] }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[65vh]">
      <h2 className="text-3xl font-bold text-text-primary mb-6">EchoLeaf Chatbot</h2>
      <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-6">
        {messages.length === 0 && initialPrompts.length > 0 && (
          <div className="card p-5 rounded-2xl transition-all-theme">
            <p className="text-sm font-semibold text-text-secondary mb-3">Suggested Prompts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {initialPrompts.map((prompt, i) => (
                <button 
                  key={i}
                  onClick={() => onSendMessage(prompt)}
                  className="btn-secondary text-left text-sm p-4 rounded-xl"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'var(--gradient-primary)'}}><LogoIcon/></div>}
            <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'text-white' : 'card text-text-primary'}`}
              style={{ background: msg.role === 'user' ? 'var(--gradient-primary)' : undefined }}
            >
              <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1]?.role === 'user' && (
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'var(--gradient-primary)'}}><LogoIcon/></div>
                <div className="max-w-md p-4 rounded-2xl card text-text-primary">
                    <div className="flex items-center space-x-1.5">
                        <span className="h-2 w-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-text-secondary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a follow-up question..."
              className="form-input flex-grow rounded-r-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-5 py-4 text-white rounded-r-2xl disabled:opacity-60 transition-all-theme"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.826L11.25 9.25v1.5L4.643 11.98a.75.75 0 00-.95.826l-1.414 4.949a.75.75 0 00.826.95l14.433-5.25a.75.75 0 000-1.418L3.105 2.289z" />
              </svg>
            </button>
          </div>
      </div>
    </div>
  );
};

const LogoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 12 2 12 2Z" fillOpacity="0.5"/><path d="M12 4C10.129 4 8.42306 4.79317 7.23401 6.02341C7.81749 6.22053 8.35808 6.54191 8.82283 6.97659C9.71239 7.81031 10.2222 8.96916 10.2222 10.2222C10.2222 11.4753 9.71239 12.6341 8.82283 13.4678C8.35808 13.9025 7.81749 14.2239 7.23401 14.421C8.42306 15.6512 10.129 16.4444 12 16.4444C14.4533 16.4444 16.4444 14.4533 16.4444 12C16.4444 9.54671 14.4533 7.55556 12 7.55556C11.3651 7.55556 10.762 7.66989 10.2222 7.86889V10.2222H12.5757C12.3768 9.68239 12.0654 9.1418 11.6307 8.67705C11.196 8.2123 10.6554 7.86889 10.2222 7.86889" /><path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22V20Z" /></svg>;