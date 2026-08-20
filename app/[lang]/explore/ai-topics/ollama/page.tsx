"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, User, Calendar, Tag, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { getAITopicBySlug } from "@/lib/db";

export default function OllamaArticle() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const topic = getAITopicBySlug("/en/explore/ai-topics/ollama");

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

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <main className="bg-[#EFEFEF] min-h-screen pt-32 pb-24 text-[#111111]">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header ref={headerRef} className="mb-12">
          <Link href="/en/explore/ai-topics" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="Back to AI Topics" speed={30} />
          </Link>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            Running AI Locally <br />
            <span className="italic text-[#FF5A36] relative inline-block">
              with Ollama
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-sans mb-8">
            {topic.content?.subtitle || topic.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-semibold text-[#111111]">{topic.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5A36]" />
              <span>{topic.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span className="uppercase tracking-wider text-xs font-bold">{topic.category}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden aspect-video mb-16 bg-gray-200 relative p-6 sm:p-8">
          <OptimizedImage
            src={topic.image}
            alt={topic.title}
            wrapperClassName="w-full h-full"
            imageClassName="w-full h-full object-contain object-center"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Ollama?</h2>
          <p className="mb-6">
            Ollama is a lightweight platform that enables organizations to run large language models (LLMs) locally on their own infrastructure. It provides a simple and efficient way to deploy AI systems without relying on external cloud services.
          </p>

          <h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Key Features</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Local model execution (no cloud dependency)</li>
            <li>Supports models such as LLaMA 3, Mistral, and DeepSeek</li>
            <li>Cross-platform compatibility (Linux, macOS, Windows)</li>
            <li>Built-in API for application integration</li>
          </ul>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Why Run AI Locally?</h2>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Core Benefits</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Data Privacy & Security:</strong> Sensitive data stays within your infrastructure</li>
            <li><strong>No External API Dependency:</strong> Full autonomy over AI operations</li>
            <li><strong>Cost Efficiency:</strong> Eliminates recurring API costs</li>
            <li><strong>Offline Capability:</strong> Works without internet connectivity</li>
            <li><strong>Full Control:</strong> Customize and fine-tune models internally</li>
          </ul>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">How Ollama Works</h2>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Architecture Overview</h3>
          <ul className="list-decimal pl-6 mb-6 space-y-2">
            <li>Users interact with internal applications</li>
            <li>Applications send requests to a local API</li>
            <li>Ollama processes prompts using locally hosted models</li>
            <li>Responses are returned in real-time</li>
          </ul>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
            <h4 className="font-bold text-[#111111] mb-2">Typical Flow</h4>
            <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">User → Web App → Internal API → Ollama → Response</p>

            <h4 className="font-bold text-[#111111] mt-4 mb-2">Optional (RAG Integration)</h4>
            <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">User → Retrieve Internal Data → Augment Prompt → Ollama → Insight</p>
          </div>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Getting Started with Ollama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-display text-xl text-[#111111] mb-3">Installation</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong>Linux/macOS:</strong> Install via script</li>
                <li><strong>Windows:</strong> Install via official installer</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-display text-xl text-[#111111] mb-3">Running Models</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Pull and run models like LLaMA 3 or DeepSeek</li>
                <li>Manage installed models locally</li>
              </ul>
            </div>
          </div>

          <h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">API Usage</h3>
          <p className="mb-6">
            Default endpoint: <code className="bg-gray-200 px-2 py-1 rounded text-sm text-[#FF5A36]">http://localhost:11434</code><br/>
            Easily integrates with web apps, microservices, and internal tools.
          </p>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Hardware Requirements</h2>
          <ul className="list-none space-y-3 mb-8">
            <li className="flex gap-3"><span className="text-[#FF5A36] font-bold">•</span> <strong>Minimum:</strong> 16GB RAM (CPU-based inference)</li>
            <li className="flex gap-3"><span className="text-[#FF5A36] font-bold">•</span> <strong>Recommended:</strong> 32GB RAM</li>
            <li className="flex gap-3"><span className="text-[#FF5A36] font-bold">•</span> <strong>GPU:</strong> 8GB+ VRAM for optimal performance</li>
            <li className="flex gap-3"><span className="text-[#FF5A36] font-bold">•</span> <strong>Enterprise Setup:</strong> Dedicated AI server</li>
          </ul>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Business Use Cases</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>AI-powered internal assistants (copilots)</li>
            <li>Sales and performance summaries</li>
            <li>Financial insights and reporting</li>
            <li>Document summarization</li>
            <li>Risk analysis and decision support</li>
          </ul>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Implementation Roadmap</h2>
          <div className="space-y-4 mb-16">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#FF5A36] text-white flex items-center justify-center font-bold">1</div>
              <p className="font-semibold text-[#111111]">Phase 1: Install and test locally</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#FF5A36] text-white flex items-center justify-center font-bold">2</div>
              <p className="font-semibold text-[#111111]">Phase 2: Integrate with internal systems (read-only)</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#FF5A36] text-white flex items-center justify-center font-bold">3</div>
              <p className="font-semibold text-[#111111]">Phase 3: Build AI-driven insight generation tools</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#FF5A36] text-white flex items-center justify-center font-bold">4</div>
              <p className="font-semibold text-[#111111]">Phase 4: Controlled rollout across teams</p>
            </div>
          </div>
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
