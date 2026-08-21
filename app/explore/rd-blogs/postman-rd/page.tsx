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

  const blog = getRDBlogBySlug("/en/explore/rd-blogs/postman-rd");

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
            POSTMAN <br />
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
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Postman?</h2>
<p>In today's fast-paced digital landscape, APIs (Application Programming Interfaces) serve as the backbone of modern software development. However, managing APIs efficiently can be a daunting task, often leading to bottlenecks in development cycles and hindering innovation.</p>
<p>This is where Postman steps in. Postman is not just a tool; it's a comprehensive API development environment that empowers developers to streamline every stage of the API lifecycle. From designing and testing to monitoring and collaboration, Postman offers a unified platform to simplify complex workflows and accelerate development processes.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Why Postman Matters</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>Design APIs with ease using its intuitive interface and powerful schema support.</li>
  <li>Test APIs thoroughly with automated testing suites, saving time and ensuring reliability.</li>
  <li>Collaborate seamlessly with team members, fostering productivity and innovation.</li>
  <li>Monitor API performance in real-time to identify and address issues proactively.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">API Design and Documentation</h3>
<p>Postman provides a user-friendly interface for designing APIs using industry-standard schemas like OpenAPI (formerly Swagger) and RAML. Generate comprehensive API documentation automatically from your designs, ensuring clarity and consistency for developers consuming your APIs.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Automated Testing</h3>
<p>Create and run automated tests for your APIs, allowing you to catch bugs early in the development process. Utilize a wide range of testing tools, including assertions, scripts, and dynamic variables, to ensure the reliability and stability of your APIs.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Mock Servers & Monitoring</h3>
<p>Generate mock servers based on your API designs, enabling front-end and back-end developers to work independently and in parallel. Monitor API performance in real-time with Postman Monitors, enabling you to detect and address issues before they impact users.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Conclusion</h2>
<p>Postman is more than just an API client; it's a comprehensive platform designed to empower developers and teams to build, test, and collaborate on APIs efficiently. By leveraging its powerful features and functionalities, you can streamline your API development process, accelerate time-to-market, and deliver high-quality software products that delight users.</p>
        </div>

        <ArticleCommentForm source="rd-blog" article={blog} />
      </article>
    </main>
  );
}
