import React from 'react';

interface Props {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export const FollowUpBox: React.FC<Props> = ({ questions, onQuestionClick }) => {
  return (
    <section>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Ask a Follow-up</h3>
      <div className="card p-6 rounded-2xl">
        <h4 className="font-semibold text-text-primary">Suggested Questions:</h4>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {questions.map((q, i) => (
                <button 
                    key={i} 
                    onClick={() => onQuestionClick(q)}
                    className="btn-secondary text-left text-sm p-4 rounded-xl"
                >
                    {q}
                </button>
            ))}
        </div>
        <div className="mt-6 text-center">
            <button
                onClick={() => onQuestionClick("Tell me more about this study.")}
                className="btn-primary px-8 py-3 font-semibold"
            >
                Ask Chatbot More
            </button>
        </div>
      </div>
    </section>
  );
};