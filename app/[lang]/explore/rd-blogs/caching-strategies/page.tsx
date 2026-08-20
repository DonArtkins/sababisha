"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { ArticleCommentForm } from "@/components/ArticleCommentForm";
import { getRDBlogBySlug } from "@/lib/db";

export default function ArticlePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const blog = getRDBlogBySlug("/en/explore/rd-blogs/caching-strategies");

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

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <main className="bg-[#EFEFEF] min-h-screen pt-32 pb-24 text-[#111111]">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header ref={headerRef} className="mb-12">
          <Link href="/en/explore/rd-blogs" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="Back to R&D Blogs" speed={30} />
          </Link>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            Caching Strategies <br />
            <span className="italic text-[#FF5A36] relative inline-block mt-2">
              {blog.category}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-sans mb-8">
            {blog.content?.subtitle || blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-semibold text-[#111111]">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5A36]" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span className="uppercase tracking-wider text-xs font-bold">{blog.category}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden aspect-video mb-16 bg-gray-200 relative p-6 sm:p-8">
          <OptimizedImage
            src={blog.image}
            alt={blog.title}
            priority
            loading="eager"
            wrapperClassName="w-full h-full"
            imageClassName="w-full h-full object-contain object-center"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700 space-y-6">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Caching Strategy</h2>
<p>A cache is hardware or software that is used to store something, usually data, temporarily in a computing environment. Cache management strategies are used to determine which data to keep in the cache and which data to remove when the cache is full and needs to make room for new data.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">How does a cache Work?</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Cache-hit:</strong> if the clients attempts to access the data and the address is found in the address location.</li>
  <li><strong>Cache-miss:</strong> the data is not found in the cache and the information pulled from the main memory and stored in the cache.</li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">1. Least Recently Used (LRU)</h2>
<p>Least Recently Used (LRU) is a caching algorithm in which the least recently used cache block is removed whenever the cache is overflowed.</p>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How LRU Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Cache-size(memory storage) → Request (get/put) → Frequency → Recently accessed</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">2. Least Frequently Used (LFU)</h2>
<p>Least Frequently Used (LFU) is a caching algorithm in which the least frequently used cache block is removed whenever the cache is overflowed.</p>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How LFU Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Put get → Frequency → Cache-size → Recently accessed</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">3. FIFO</h2>
<p>FIFO (First-In, First-Out) cache is a cache management policy where the first item added to the cache is the first one to be removed when the cache reaches its maximum capacity. It operates on the principle of queue data structure.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">How FIFO works</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Queue:</strong> A simple queue (or list) is used to maintain the order of insertion. The oldest items are at the front, and the newest items are at the back.</li>
  <li><strong>Hash Map (Optional):</strong> Often used alongside a queue to map keys to values for efficient access.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Operation of FIFO</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Insert (key, value):</strong> Add the new item to the back of the queue. If the cache is full, remove the item at the front. <em>Time Complexity: O(1)</em></li>
  <li><strong>Access (key):</strong> If the item is in the cache, it can be accessed directly. <em>Time Complexity: O(1)</em></li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">4. LIFO</h2>
<p>LIFO (Last-In, First-Out) cache is a cache management policy where the most recently added item is the first one to be removed when the cache reaches its maximum capacity. It operates on the principle of stack data structure.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Operation</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Insert (key, value):</strong> Add the new item to the back of the queue. If full, remove the recent item. <em>Time Complexity: O(1)</em></li>
  <li><strong>Access (key):</strong> Accessed directly via hash map. <em>Time Complexity: O(1)</em></li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">5. Random Replacement</h2>
<p>A cache management policy where items are removed randomly when the cache reaches its maximum capacity.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Applications</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Web Browsers:</strong> Store frequently accessed resources (like images, CSS files).</li>
  <li><strong>Content Delivery Networks (CDNs):</strong> Cache web content closer to the user's location.</li>
  <li><strong>Database Query Caching:</strong> Serve frequently requested data without re-executing the queries.</li>
  <li><strong>API Gateways:</strong> Cache API responses to reduce backend load.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Advantages and Disadvantages</h3>
<p><strong>Advantages:</strong> Improved Performance and Reduced Latency, Reduced Load on Primary Data Sources, Scalability.</p>
<p><strong>Disadvantages:</strong> Cache Miss Penalty, Memory and Storage Overhead.</p>
        </div>

        <ArticleCommentForm source="rd-blog" article={blog} />
      </article>
    </main>
  );
}
