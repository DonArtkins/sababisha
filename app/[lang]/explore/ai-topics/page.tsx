"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Pagination } from "@/components/Pagination";

const TOPICS = [
  {
    title: "AI Infrastructure & Ollama",
    excerpt: "Run LLMs on Your Own Infrastructure",
    author: "David Maru",
    date: "12/2/2026",
    category: "AI Infrastructure",
    image: "/images/img6.jpg",
    slug: "/en/explore/ai-topics/ollama"
  },
  {
    title: "Natural Language Processing (NLP) with PyTorch",
    excerpt: "Building AI-Powered Text Intelligence Systems",
    author: "John Lokok",
    date: "5/03/2026",
    category: "AI Training Series",
    image: "/images/img6.jpg",
    slug: "/en/explore/ai-topics/nlp-pytorch"
  },
  {
    title: "LlamaIndex: Data Framework for LLM Applications",
    excerpt: "Connecting enterprise data to LLMs for intelligent AI systems",
    author: "Enock Borabu",
    date: "2026",
    category: "AI Data Engineering & Retrieval",
    image: "/images/img1.jpg",
    slug: "/en/explore/ai-topics/llamaindex"
  },
  {
    title: "QLoRA: Advanced Model Fine-Tuning",
    excerpt: "Efficiently training large language models with minimal hardware resources",
    author: "Civious Rumaita",
    date: "2026",
    category: "AI Model Optimization",
    image: "/images/img6.jpg",
    slug: "/en/explore/ai-topics/qlora"
  },
  {
    title: "Make.com: No-Code Automation & AI Agents",
    excerpt: "Automate workflows and build intelligent systems without writing code",
    author: "Sheila Samita",
    date: "16/02/2026",
    category: "Automation & AI Systems",
    image: "/images/img1.jpg",
    slug: "/en/explore/ai-topics/make-automation"
  },
  {
    title: "Fine-Tuning with LoRA / PEFT",
    excerpt: "Parameter-Efficient Fine-Tuning for Large Language Models",
    author: "Herman Alany",
    date: "2026",
    category: "AI Training Session",
    image: "/images/img6.jpg",
    slug: "/en/explore/ai-topics/lora-peft"
  }
];

const ITEMS_PER_PAGE = 3;

export function AITopics() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(TOPICS.length / ITEMS_PER_PAGE);
  const currentTopics = TOPICS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="bg-transparent pt-24 sm:pt-32 min-h-screen text-[#111111]">
      <div className="py-12 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 flex flex-col items-center px-2">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-3 sm:mb-4">
            Our <span className="text-accent relative inline-block">
              AI<svg className="absolute w-full h-2 sm:h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Topics
          </h1>
          <p className="text-gray-600 font-sans text-base sm:text-lg">Our AI Topics Include</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {currentTopics.map((topic, i) => (
            <Link href={topic.slug} key={i} className="group cursor-none interactive">
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[4/3] mb-4 sm:mb-6 bg-gray-100 relative">
                <OptimizedImage 
                  src={topic.image} 
                  alt={topic.title} 
                  wrapperClassName="absolute inset-0 w-full h-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-2 sm:mb-3">
                <span className="text-accent">{topic.category}</span>
                <span className="hidden sm:inline">•</span>
                <span>{topic.date}</span>
                <span className="hidden sm:inline">•</span>
                <span>{topic.author}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#111111] leading-tight mb-2 sm:mb-3 group-hover:text-accent transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-500 font-sans text-sm mb-4 sm:mb-6 line-clamp-2">
                {topic.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold group-hover:gap-3 transition-all">
                <CyberText text="Explore Topic" speed={40} />
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      
    </main>
  );
}

export default AITopics;
