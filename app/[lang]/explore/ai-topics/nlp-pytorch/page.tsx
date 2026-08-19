"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, User, Calendar, Tag, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";

export default function ArticlePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#EFEFEF] min-h-screen pt-32 pb-24 text-[#111111]">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header ref={headerRef} className="mb-12">
          <Link href="/en/explore/ai-topics" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="Back to AI Topics" speed={30} />
          </Link>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            Natural Language Processing (NLP) with PyTorch <br />
            <span className="italic text-[#FF5A36] relative inline-block mt-2">
              Building AI-Powered Text Intelligence Systems
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-semibold text-[#111111]">John Lokok</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5A36]" />
              <span>5/03/2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span className="uppercase tracking-wider text-xs font-bold">AI Training Series</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden aspect-video mb-16 bg-gray-200 relative">
          <OptimizedImage 
            src="/images/img6.jpg" 
            alt="Natural Language Processing (NLP) with PyTorch" 
            wrapperClassName="absolute inset-0 w-full h-full"
            imageClassName="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700 space-y-6">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is NLP?</h2>
<p>Natural Language Processing (NLP) is a branch of AI that enables machines to understand, interpret, and generate human language. It powers systems that can analyze text, extract meaning, and make intelligent decisions based on language data.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Core Concepts</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>PyTorch Foundations:</strong> Tensors for numerical computation, Training loops (forward pass, loss, backpropagation, optimization)</li>
  <li><strong>Text Processing:</strong> Tokenization (converting text into machine-readable format), Word embeddings (numerical representation of text)</li>
  <li><strong>Modeling Techniques:</strong> LSTM (Long Short-Term Memory networks) for sequence learning, Text classification models for predictions</li>
</ul>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">Processing Pipeline</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Input Text → Tokenization → Numerical Encoding → Model Processing → Output Prediction</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Fintech Applications of NLP</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Customer Support Automation:</strong> Automated responses, smart ticket routing, and 24/7 availability</li>
  <li><strong>Fraud Detection:</strong> Detect phishing and suspicious messages, flag high-risk transactions</li>
  <li><strong>Sentiment Analysis:</strong> Analyze customer feedback and identify dissatisfaction early</li>
  <li><strong>KYC / AML Document Processing:</strong> Extract and verify identity data, automate onboarding workflows</li>
  <li><strong>Transaction Categorization:</strong> Automatically classify expenses and improve financial tracking</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Example: Fraud Detection Workflow</h3>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`Input: Customer message or transaction note
→ Tokenized into sequences
→ Processed by LSTM model
→ Output: Fraud probability score

If score > threshold → Alert triggered`}</code></pre>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Implementation Roadmap & Best Practices</h2>
<p>Start simple (LSTM) before scaling to Transformers. Use real company data for better accuracy. Focus on high-impact use cases (fraud, support, insights) and ensure explainability for decision-making.</p>
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-6 h-6 text-[#FF5A36]" />
            <h3 className="font-display text-3xl text-[#111111]">Leave a comment</h3>
          </div>
          
          <form className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your name"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-sans font-bold text-[#111111] ml-2">Message</label>
              <textarea 
                rows={5} 
                placeholder="Type your message here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all resize-none interactive cursor-none" 
              />
            </div>
            
            <div className="pt-2">
              <button type="button" className="group inline-flex items-center justify-center gap-2 bg-[#FF5A36] text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide uppercase hover:bg-[#E84E2D] hover:shadow-lg hover:shadow-[#FF5A36]/20 transition-all interactive cursor-none">
                <CyberText text="Submit Comment" speed={20} />
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </article>
    </main>
  );
}
