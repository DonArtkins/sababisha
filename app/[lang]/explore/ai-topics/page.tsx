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
    title: "Natural Language Processing",
    excerpt: "Turning Text into Business Intelligence",
    author: "John Lokoko",
    date: "5/3/2026",
    category: "NLP & Machine Learning",
    image: "/images/img6.jpg",
    slug: "/en/explore/ai-topics/nlp-pytorch"
  },
  {
    title: "LlamaIndex",
    excerpt: "Connecting LLMs with Enterprise Data",
    author: "Enock Borabu",
    date: "2026",
    category: "Data Frameworks",
    image: "/images/img1.jpg",
    slug: "/en/explore/ai-topics/llamaindex"
  },
  {
    title: "QLoRA",
    excerpt: "Efficient Fine-Tuning for Large Language Models",
    author: "Civious Rumaita",
    date: "2026",
    category: "Model Optimization",
    image: "/images/img6.jpg",
    slug: "/en/explore/ai-topics/qlora"
  },
  {
    title: "Make.com Automation",
    excerpt: "No-Code Automation with AI Agents",
    author: "Sheila Samita",
    date: "2026",
    category: "Automation & AI Agents",
    image: "/images/img1.jpg",
    slug: "/en/explore/ai-topics/make-automation"
  },
  {
    title: "LoRA PEFT",
    excerpt: "Fine-Tuning with LoRA / PEFT — Efficient LLM Optimization",
    author: "Herman Alany",
    date: "2026",
    category: "AI Training",
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
    <main className="bg-transparent pt-32 min-h-screen text-[#111111]">
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              AI<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Topics
          </h1>
          <p className="text-gray-600 font-sans text-lg">Our AI Topics Include</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentTopics.map((topic, i) => (
            <Link href={topic.slug} key={i} className="group cursor-none interactive">
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] mb-6 bg-gray-100 relative">
                <OptimizedImage 
                  src={topic.image} 
                  alt={topic.title} 
                  wrapperClassName="absolute inset-0 w-full h-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                <span className="text-accent">{topic.category}</span>
                <span>•</span>
                <span>{topic.date}</span>
                <span>•</span>
                <span>{topic.author}</span>
              </div>
              <h3 className="font-display text-2xl text-[#111111] leading-tight mb-3 group-hover:text-accent transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-500 font-sans text-sm mb-6 line-clamp-2">
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
