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

  const blog = getRDBlogBySlug("/explore/rd-blogs/nextjs-v14");

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

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <main className="bg-[#EFEFEF] min-h-screen pt-32 pb-24 text-[#111111]">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header ref={headerRef} className="mb-12">
          <Link href="/explore/rd-blogs" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="Back to R&D Blogs" speed={30} />
          </Link>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            Next.js (v14) <br />
            <span className="text-accent relative inline-block mt-2">
              {blog.category}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-sans mb-8">
            {blog.content?.subtitle || blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
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
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Next.js?</h2>
<p>In today&apos;s rapidly evolving web development landscape, building performant, scalable, and SEO-friendly applications can be challenging. Next.js is a React-based framework that provides all the tools needed to build server-rendered and statically-generated web applications with ease. It simplifies the complexities of React and adds powerful features out-of-the-box.</p>

<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">History of Next.js</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Initial Release (2016):</strong> Next.js launched as a React framework</li>
  <li><strong>Version 9:</strong> Dynamic Routing, API Routes</li>
  <li><strong>Version 10:</strong> Image Optimization, ISR</li>
  <li><strong>Version 11:</strong> Automatic Image Optimization</li>
  <li><strong>Version 12:</strong> Middleware, Webpack 5</li>
  <li><strong>Version 13:</strong> Rust Compiler, React Server Components</li>
  <li><strong>Latest Version (14):</strong> Enhanced React Server Components, Improved Developer Tools, Performance and Scalability Enhancements</li>
</ul>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Metadata</h2>
<p>Metadata is crucial for SEO and sharing previews on social media. Next.js provides a built-in way to add metadata to your pages using the Head component from next/head.</p>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Client Components vs Server Components</h2>
<p>Next.js 14 introduces the ability to use React Server Components alongside traditional Client Components. Server Components allow for improved performance by offloading rendering to the server.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2">Client Components</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Rendered on the client side.</li>
      <li>Suitable for highly interactive UI.</li>
    </ul>
  </div>
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2">Server Components</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Rendered on the server side.</li>
      <li>Reduce JavaScript sent to the client.</li>
      <li>Enhance performance and reduce Time to Interactive (TTI).</li>
    </ul>
  </div>
</div>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`// pages/index.js
import ClientComponent from '../components/ClientComponent';
import ServerComponent from '../components/ServerComponent';

export default function Home() {
  return (
    <>
      <ClientComponent />
      <ServerComponent />
    </>
  );
}`}</code></pre>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Data Fetching Methods</h2>

<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Partial Prerendering</h3>
<p>Partial Prerendering allows you to define parts of the page that should be rendered statically and parts that should be dynamically rendered on the server.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: { data },
  };
}`}</code></pre>

<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Server Side Rendering (SSR)</h3>
<p>SSR allows you to render your React components on the server, generating HTML that is sent to the client. This improves SEO and performance for the initial load.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}`}</code></pre>

<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Static Site Generation (SSG)</h3>
<p>SSG allows you to pre-render pages at build time, generating static HTML. This is useful for pages with content that doesn&apos;t change frequently.</p>

<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Incremental Static Regeneration (ISR)</h3>
<p>ISR enables you to use static generation on a per-page basis, allowing you to update static content without rebuilding the entire site.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return {
    props: { data },
    revalidate: 10, // ISR: Revalidate every 10 seconds
  };
}`}</code></pre>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Server Actions (Post, Put, Delete)</h2>
<p>Next.js allows you to create API routes to handle server-side actions like POST, PUT, and DELETE requests.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`// pages/api/create.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    // Process data...
    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}`}</code></pre>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Suspense and Streaming</h2>
<p>Suspense and streaming allow you to render parts of your application as they load, improving the user experience by displaying content progressively.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`import { Suspense } from 'react';

function Loading() {
  return <p>Loading...</p>;
}

export default function Page() {
  return (
    <>
      <h1>Suspense and Streaming</h1>
      <Suspense fallback={<Loading />}>
        <PageContent />
      </Suspense>
    </>
  );
}`}</code></pre>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Static and Dynamic Rendering</h2>
<p>Next.js supports both static and dynamic rendering. Static rendering generates HTML at build time, while dynamic rendering generates HTML on each request.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2">Static Rendering</h4>
    <p className="text-sm text-gray-600">Uses <code>getStaticProps</code> to pre-render pages at build time for maximum performance.</p>
  </div>
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2">Dynamic Rendering</h4>
    <p className="text-sm text-gray-600">Uses <code>getServerSideProps</code> to render pages on each request for real-time data.</p>
  </div>
</div>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Caching</h2>
<p>Caching in Next.js helps improve performance by storing frequently accessed data. You can leverage caching mechanisms at different levels, such as CDN, server, or client-side.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Page() {
  const { data, error } = useSWR(
    'https://api.example.com/data',
    fetcher,
    { refreshInterval: 3000 }
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h1>Caching with SWR</h1>
      <p>{data}</p>
    </>
  );
}`}</code></pre>

<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Conclusion</h2>
<p>Next.js 14 brings numerous enhancements and new features, making it an excellent choice for building modern web applications. Whether you&apos;re looking to improve SEO, performance, or development experience, Next.js provides the tools and flexibility to achieve your goals.</p>
        </div>

        <ArticleCommentForm source="rd-blog" article={blog} />
      </article>
    </main>
  );
}
