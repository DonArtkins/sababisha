"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { ArticleCommentForm } from "@/components/ArticleCommentForm";
import { getAITopicBySlug } from "@/lib/db";

export default function ArticlePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const topic = getAITopicBySlug("/explore/ai-topics/qlora");

  useEffect(() => {
    if (!headerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }
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
          <Link href="/explore/ai-topics" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="Back to AI Topics" speed={30} />
          </Link>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            QLoRA: Advanced Model Fine-Tuning <br />
            <span className="text-accent relative inline-block mt-2">
              Efficiently training large language models
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
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
            priority
            loading="eager"
            wrapperClassName="w-full h-full"
            imageClassName="w-full h-full object-contain object-center"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700 space-y-6">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is QLoRA?</h2>
<p>QLoRA (Quantized Low-Rank Adaptation) is a parameter-efficient fine-tuning technique that enables training of massive LLMs by combining 4-bit quantization with lightweight LoRA adapters. It significantly reduces memory usage while maintaining high model performance.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">The QLoRA Workflow</h2>
<ul className="list-decimal pl-6 mb-8 space-y-2">
  <li><strong>Quantize:</strong> Compress the base model into 4-bit precision</li>
  <li><strong>Add LoRA:</strong> Inject trainable adapter layers</li>
  <li><strong>Train:</strong> Update only LoRA parameters</li>
  <li><strong>Deploy:</strong> Use optimized model for inference</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Architecture Overview</h3>
<p>It consists of a frozen 4-bit quantized base model and trainable LoRA adapter layers, combined in the inference pipeline.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Benefits & Use Cases</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Resource Efficiency:</strong> Fine-tune large models on limited hardware</li>
  <li><strong>Cost Reduction:</strong> Lower GPU and infrastructure costs</li>
  <li><strong>Modular Design:</strong> Swap LoRA adapters for different tasks</li>
  <li><strong>High Performance:</strong> Near full fine-tuning accuracy</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Enterprise Applications</h3>
<p>Custom enterprise chatbots, domain-specific AI assistants, code generation systems, and financial/analytics models.</p>
        </div>

        <ArticleCommentForm source="ai-topic" article={topic} />
      </article>
    </main>
  );
}
