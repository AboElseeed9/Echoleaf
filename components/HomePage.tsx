
import React from 'react';
import { Header } from './Header';

interface HomePageProps {
  onEnterApp: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnterApp, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen text-text-primary transition-all-theme overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full pt-8 z-10">
            <Header variant="home" theme={theme} toggleTheme={toggleTheme} />
        </div>
        
        <main>
            {/* Section 1: Hero */}
            <section className="relative text-center pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight leading-tight animate-fade-in-up">
                        Turn any research paper <br /> into a <span className="text-gradient">5-minute summary.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-text-secondary animate-fade-in-up" style={{ animationDelay: '0.2s'}}>
                        Upload a study, pick your audience, and let AI explain complex science in clear, accurate language.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s'}}>
                        <button onClick={onEnterApp} className="btn-primary px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                            Start summarizing (free)
                        </button>
                    </div>
                    <p className="mt-6 text-sm text-text-muted animate-fade-in-up" style={{ animationDelay: '0.6s'}}>
                        Built for students, clinicians, researchers, and science communicators.
                    </p>
                </div>
            </section>

            {/* Section 2: How it works */}
            <section className="py-20 bg-[var(--surface-subtle)]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">How it works</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <StepCard number="1" title="Add your study" description="Upload a PDF, paste text, or drop in a URL from PubMed, arXiv, or any journal." />
                        <StepCard number="2" title="Choose how you want it explained" description="Select tone, audience, length, and style presets like “Exam notes” or “Patient-friendly”." />
                        <StepCard number="3" title="Get clear insights in seconds" description="Receive a structured summary with key results, limitations, and action-ready insights." />
                    </div>
                </div>
            </section>
            
            {/* Section 3: Core features */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Powerful features, focused on real research work</h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard icon={<FeatureIcon1 />} title="Audience-aware summaries" description="Generate versions tailored for patients, students, clinicians, or the general public." />
                        <FeatureCard icon={<FeatureIcon2 />} title="Smart presets" description="One-click settings for common tasks: exam notes, patient leaflets, policy briefs and more." />
                        <FeatureCard icon={<FeatureIcon3 />} title="Multi-paper synthesis" description="Upload several studies and get a combined overview of what the evidence really says." />
                        <FeatureCard icon={<FeatureIcon4 />} title="Key numbers & limitations" description="Automatically surface sample sizes, effect sizes, and limitations so you can judge quality." />
                        <FeatureCard icon={<FeatureIcon5 />} title="Interactive Q&A" description="Chat with your paper: ask questions, clarify methods, and explore alternative explanations." />
                        <FeatureCard icon={<FeatureIcon6 />} title="Save, organize, and export" description="Keep a library of studies, add notes, and export summaries to your documents or notes apps." />
                    </div>
                </div>
            </section>

            {/* Section 4: Who it's for */}
            <section className="py-20 bg-[var(--surface-subtle)]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Built for everyone who has to read tough papers</h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <UseCaseCard title="Students & learners" description="Turn dense PDFs into exam-ready notes and simple explanations." />
                        <UseCaseCard title="Researchers" description="Scan more literature, extract key numbers, and keep organized summaries." />
                        <UseCaseCard title="Clinicians & healthcare teams" description="Quickly understand new trials and translate them into patient-friendly language." />
                        <UseCaseCard title="Science communicators & journalists" description="Turn technical findings into accurate, engaging stories for the public." />
                    </div>
                </div>
            </section>

             {/* Section 5: Example output */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">See the difference in one glance</h2>
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                        <div className="card rounded-2xl p-6 text-left">
                            <h3 className="font-bold text-text-primary mb-2">Original Abstract</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">"The pluripotent state is governed by a complex interplay of transcription factors and signaling pathways. We performed a high-throughput CRISPR-Cas9 screen to identify novel regulators of murine embryonic stem cell self-renewal. Our results reveal that the zinc-finger protein ZFP42, also known as Rex1, acts as a crucial gatekeeper of the naive pluripotent state by repressing endoderm specification pathways..."</p>
                        </div>
                        <div className="card rounded-2xl p-6 text-left">
                            <div className="flex border-b border-border mb-4">
                                <button className="py-2 px-4 font-semibold text-sm text-text-primary border-b-2" style={{borderColor: 'var(--btn-secondary-text)'}}>For Experts</button>
                                <button className="py-2 px-4 font-semibold text-sm text-text-muted">For the Public</button>
                            </div>
                            <h3 className="font-bold text-text-primary mb-2">EchoLeaf Summary</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">A new study identified a key protein, ZFP42, that prevents stem cells from accidentally turning into other cell types. This protein acts like a lock on a door, ensuring the cells remain in their powerful, flexible "pluripotent" state.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: FAQ */}
            <section className="py-20 bg-[var(--surface-subtle)]">
                 <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">Frequently asked questions</h2>
                    <div className="mt-12 space-y-4">
                        <FaqItem question="How accurate are the summaries?" answer="Our AI is trained on a vast corpus of scientific literature and aims for high accuracy. However, it's a tool for understanding and should not replace critical reading of the original source for high-stakes decisions." />
                        <FaqItem question="Where does the AI get its information?" answer="The AI's knowledge comes from its training data. For URL-based summaries, it directly analyzes the content of the provided link, grounded by Google Search technology to ensure it's accessing the correct information." />
                        <FaqItem question="Is my data private?" answer="Yes. We do not store your uploaded documents or pasted text after the summary is generated. Your privacy is a top priority." />
                        <FaqItem question="Can I use this for clinical decisions?" answer="No. EchoLeaf is an informational tool designed to aid in understanding research. It is not a substitute for professional medical advice, diagnosis, or treatment." />
                    </div>
                </div>
            </section>

            {/* Section 7: Final CTA */}
            <section className="py-24 text-center">
                 <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Start understanding research faster</h2>
                    <p className="mt-4 text-lg text-text-secondary">Try EchoLeaf on your next paper and see how much time you save.</p>
                    <div className="mt-8">
                         <button onClick={onEnterApp} className="btn-primary px-8 py-4 text-lg font-semibold">
                            Summarize a paper now
                        </button>
                    </div>
                </div>
            </section>
        </main>
        <footer className="text-center py-8">
            <p className="text-sm text-text-muted">Designed by EchoLeaf AI</p>
        </footer>
    </div>
  );
};

const StepCard: React.FC<{number: string, title: string, description: string}> = ({number, title, description}) => (
    <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center font-bold text-xl text-white" style={{background: 'var(--gradient-primary)'}}>
            {number}
        </div>
        <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        <p className="mt-2 text-text-secondary">{description}</p>
    </div>
);

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({icon, title, description}) => (
    <div className="card rounded-2xl p-6 text-left">
        <div className="w-10 h-10 mb-4">{icon}</div>
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
    </div>
);

const UseCaseCard: React.FC<{title: string, description: string}> = ({title, description}) => (
    <div className="card rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
    </div>
);

const FaqItem: React.FC<{question: string, answer: string}> = ({question, answer}) => (
    <details className="card rounded-2xl p-5 cursor-pointer">
        <summary className="font-semibold text-text-primary list-none flex justify-between items-center">
            {question}
            <svg className="w-5 h-5 text-text-secondary transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <p className="mt-3 text-text-secondary">{answer}</p>
    </details>
);

const GradientDefs = () => (
    <svg width="0" height="0" style={{position: 'absolute'}}>
        <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFB774'}} />
                <stop offset="45%" style={{stopColor: '#FF8A75'}} />
                <stop offset="100%" style={{stopColor: '#F06DD9'}} />
            </linearGradient>
        </defs>
    </svg>
);
const FeatureIcon1 = () => <><GradientDefs/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.962 0L14.25 18l-2.962 2.962a3.75 3.75 0 01-5.962 0L5.32 18.04a3.75 3.75 0 010-5.962L11.28 6.118a3.75 3.75 0 015.962 0z" /></svg></>;
const FeatureIcon2 = () => <><GradientDefs/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.211.842.211-.842a3.375 3.375 0 00-2.455-2.456l-.842-.211.842-.211a3.375 3.375 0 002.455-2.456l.211-.842.211.842a3.375 3.375 0 002.455 2.456l.842.211-.842.211a3.375 3.375 0 00-2.455 2.456z" /></svg></>;
const FeatureIcon3 = () => <><GradientDefs/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5" /></svg></>;
const FeatureIcon4 = () => <><GradientDefs/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" /></svg></>;
const FeatureIcon5 = () => <><GradientDefs/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg></>;
const FeatureIcon6 = () => <><GradientDefs/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="url(#iconGradient)"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></>;