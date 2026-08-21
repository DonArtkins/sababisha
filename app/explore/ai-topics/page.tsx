"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Pagination } from "@/components/Pagination";
import { AI_TOPICS } from "@/lib/db";

const ITEMS_PER_PAGE = 6;

export function AITopics() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(AI_TOPICS.length / ITEMS_PER_PAGE);
  const currentTopics = AI_TOPICS.slice(
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
          <p className="max-w-3xl text-gray-600 font-sans text-base leading-relaxed sm:text-lg">
            Building secure, scalable, and practical AI solutions for real enterprise challenges. Explore private LLM infrastructure, NLP with PyTorch, retrieval-augmented generation, QLoRA, LoRA fine-tuning, no-code automation, and AI agents designed for business workflows.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {currentTopics.map((topic, i) => (
            <Link href={topic.slug} key={i} className="group cursor-none interactive">
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[4/3] mb-4 sm:mb-6 bg-gray-50 relative p-4 sm:p-6">
                <OptimizedImage 
                  src={topic.image} 
                  alt={topic.title} 
                  priority={i < 3}
                  loading="eager"
                  wrapperClassName="w-full h-full"
                  imageClassName="object-contain object-center"
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
