"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, User, Calendar, Tag, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { getRDBlogBySlug } from "@/lib/db";

export default function ArticlePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const blog = getRDBlogBySlug("/en/explore/rd-blogs/flutter-introduction");

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
            Introduction to Flutter <br />
            <span className="italic text-[#FF5A36] relative inline-block mt-2">
              Cross-Platform Framework
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
            wrapperClassName="w-full h-full"
            imageClassName="w-full h-full object-contain object-center"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700 space-y-6">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Flutter?</h2>
<p>Flutter is an open-source UI software development kit (SDK) created by Google. It is used for building natively compiled applications for mobile, web, and desktop from a single codebase. Flutter allows developers to use a single codebase to create beautiful and high-performance applications across multiple platforms.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">How Does it Compare to React?</h2>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Similarities</h3>
<ul className="list-disc pl-6 mb-6 space-y-2">
  <li><strong>UI Components:</strong> Both follow a component-based architecture, promoting code reusability and modularity.</li>
  <li><strong>Cross-Platform:</strong> Both support building applications across multiple platforms.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Differences</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2 text-blue-500">Flutter</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Employs immediate mode rendering directly onto the canvas.</li>
      <li>Integrates with native features through platform channels.</li>
      <li>Used by Alibaba, Google Ads, and Tencent.</li>
    </ul>
  </div>
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2 text-cyan-500">React</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Utilizes virtual DOM rendering.</li>
      <li>Relies on libraries and APIs for native feature integration.</li>
      <li>Favored by Facebook, Instagram, and WhatsApp.</li>
    </ul>
  </div>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Stateful vs Stateless Widgets</h2>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Stateful Widgets</h3>
<p>Stateful widgets are a crucial concept in Flutter, allowing you to manage mutable state within your user interface. They can change their state over time in response to user interactions, network requests, animations, or other factors via the <code>setState()</code> method.</p>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Stateless Widgets</h3>
<p>Stateless widgets do not have any mutable state. Once built, they remain unchanged and cannot be directly updated. Ideal for displaying static content such as text, images, icons, and simple UI components.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">BLOC (Business Logic Component)</h2>
<p>BLoC is a design pattern introduced by Google, which helps in managing state and handling events in Flutter applications. It promotes separation of concerns by separating the business logic from the UI layer.</p>
<p>BLoCs typically use streams or sinks to communicate changes in state to the UI layer. Streams represent a sequence of asynchronous events, while sinks are used to send events to a stream.</p>
<div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 my-8 text-center text-lg italic text-gray-700">
  "Unlock the power of Flutter and BLoC: where stateful widgets become state-of-the-art experiences!" <br/> — ArcNigri
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
