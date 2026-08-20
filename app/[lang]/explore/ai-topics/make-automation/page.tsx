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
            Make.com Automation <br />
            <span className="italic text-[#FF5A36] relative inline-block mt-2">
              No-Code Automation with AI Agents
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-semibold text-[#111111]">Sheila Samita</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5A36]" />
              <span>16/02/2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span className="uppercase tracking-wider text-xs font-bold">Automation & AI Systems</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden aspect-video mb-16 bg-gray-200 relative">
          <OptimizedImage 
            src="/images/img1.jpg" 
            alt="Make.com Automation" 
            wrapperClassName="absolute inset-0 w-full h-full"
            imageClassName="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700 space-y-6">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Make.com?</h2>
<p>Make.com is a powerful no-code automation platform that connects applications and automates workflows using trigger-action logic. With built-in AI capabilities, it goes beyond simple automation to enable intelligent, decision-making systems.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Key Features</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>Visual drag-and-drop workflow builder</li>
  <li>2,000+ app integrations</li>
  <li>AI-powered decision making</li>
  <li>Real-time and scheduled automation</li>
  <li>Advanced logic (filters, branching, error handling)</li>
</ul>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How It Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Trigger → Actions → Logic → Output</p>
  <p className="mt-4 text-sm text-gray-600">An event (like a form submission or email) triggers a workflow, which then executes a sequence of actions, applies logic, and produces results automatically.</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Real-World Use Cases</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Lead Capture:</strong> Save leads and send instant responses</li>
  <li><strong>Bug Tracking:</strong> Sync GitHub issues with Jira and Slack</li>
  <li><strong>E-Commerce:</strong> Automate orders, inventory, and emails</li>
  <li><strong>AI Support Bots:</strong> Respond to customers automatically</li>
  <li><strong>Reporting:</strong> Generate and send AI-powered summaries</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Why Teams Choose Make.com</h3>
<p>Cost Efficiency, No-Code Simplicity, Scalability, and AI Integration.</p>
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
