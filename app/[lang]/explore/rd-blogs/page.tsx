"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Pagination } from "@/components/Pagination";

const BLOGS = [
  {
    title: "Prometheus, Grafana & Alertmanager",
    excerpt: "An Integrated Monitoring and Alerting System.",
    author: "John Korio",
    date: "4 Oct, 2024",
    category: "Monitoring",
    image: "/images/img1.jpg",
    slug: "/en/explore/rd-blogs/prometheus-grafana"
  },
  {
    title: "Caching Strategies",
    excerpt: "Optimize performance with effective caching techniques.",
    author: "Bethwel Kitoo",
    date: "15 July, 2024",
    category: "Performance",
    image: "/images/img5.jpg",
    slug: "/en/explore/rd-blogs/caching-strategies"
  },
  {
    title: "Next.js (v14)",
    excerpt: "Latest features in Next.js version 14 framework.",
    author: "Heman Alany",
    date: "07 June, 2024",
    category: "Frontend",
    image: "/images/img5.jpg",
    slug: "/en/explore/rd-blogs/nextjs-v14"
  },
  {
    title: "Postman R&D",
    excerpt: "API testing and development with Postman tool.",
    author: "John Korio",
    date: "3 May, 2024",
    category: "API",
    image: "/images/img1.jpg",
    slug: "/en/explore/rd-blogs/postman-rd"
  },
  {
    title: "Flutter Introduction",
    excerpt: "Introduction to Flutter for cross-platform app development.",
    author: "Civious Rumaita",
    date: "3 May, 2024",
    category: "Mobile",
    image: "/images/img5.jpg",
    slug: "/en/explore/rd-blogs/flutter-introduction"
  }
];

const ITEMS_PER_PAGE = 3;

export function RDBlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(BLOGS.length / ITEMS_PER_PAGE);
  const currentBlogs = BLOGS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="bg-transparent pt-32 min-h-screen text-[#111111]">
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              R&D<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Blogs
          </h1>
          <p className="text-gray-600 font-sans text-lg">Our R&D Blogs Include</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBlogs.map((blog, i) => (
            <Link href={blog.slug} key={i} className="group cursor-none interactive">
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] mb-6 bg-gray-100 relative">
                <OptimizedImage 
                  src={blog.image} 
                  alt={blog.title} 
                  wrapperClassName="absolute inset-0 w-full h-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                <span className="text-accent">{blog.category}</span>
                <span>•</span>
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.author}</span>
              </div>
              <h3 className="font-display text-2xl text-[#111111] leading-tight mb-3 group-hover:text-accent transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-500 font-sans text-sm mb-6 line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold group-hover:gap-3 transition-all">
                <CyberText text="Read Article" speed={40} />
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
export default RDBlogs;
