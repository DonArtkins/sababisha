"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map, ChevronRight, Home, Briefcase, Box, FolderOpen, Users, MessageSquare, Star, Image, HelpCircle, Shield, Newspaper, Cpu, Lightbulb, UserCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

interface SitemapLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

interface SitemapGroup {
  title: string;
  links: SitemapLink[];
}

const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/en", icon: <Home className="w-5 h-5" />, description: "Start here for Sababisha Solutions' fintech platforms, enterprise software, AI automation, analytics, integrations, and digital transformation services." },
      { label: "Services", href: "/en/services", icon: <Briefcase className="w-5 h-5" />, description: "Explore consultancy, custom software development, fintech engineering, enterprise systems, analytics, support, and long-term maintenance services." },
      { label: "Products", href: "/en/products", icon: <Box className="w-5 h-5" />, description: "Browse ready and customizable platforms for lending, insurance, healthcare, ERP, HR, schools, property, payments, loyalty, and accounting." },
      { label: "Team", href: "/en/team", icon: <Users className="w-5 h-5" />, description: "Meet the leadership, engineering, product, QA, DevOps, implementation, and support people behind our client delivery work." },
      { label: "Contact", href: "/en/contact", icon: <MessageSquare className="w-5 h-5" />, description: "Talk to Sababisha Solutions about project discovery, product demos, integrations, support needs, and technology consultancy." },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/en/blog", icon: <Newspaper className="w-5 h-5" />, description: "Read insights on AI, CRM synchronization, software engineering, fintech innovation, and digital transformation strategy." },
      { label: "Gallery", href: "/en/gallery", icon: <Image className="w-5 h-5" />, description: "View team moments, workshops, planning sessions, product launches, culture highlights, and collaboration behind our software delivery." },
      { label: "Testimonials", href: "/en/testimonials", icon: <Star className="w-5 h-5" />, description: "See client feedback on our systems, service quality, implementation support, operational impact, and long-term technology partnership." },
      { label: "FAQ", href: "/en/faq", icon: <HelpCircle className="w-5 h-5" />, description: "Find answers about custom software, fintech platforms, integrations, security, timelines, support, and digital transformation." },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/en/explore/projects", icon: <FolderOpen className="w-5 h-5" />, description: "Explore production platforms for loan management, legal operations, analytics, healthcare, government programs, and business workflows." },
      { label: "R&D Blogs", href: "/en/explore/rd-blogs", icon: <Lightbulb className="w-5 h-5" />, description: "Learn from our research notes on monitoring, caching, API testing, frontend architecture, mobile development, and reliable systems." },
      { label: "AI Topics", href: "/en/explore/ai-topics", icon: <Cpu className="w-5 h-5" />, description: "Study practical AI topics including local LLMs, NLP, RAG, QLoRA, LoRA, PEFT, automation, and AI agents." },
      { label: "Careers", href: "/en/explore/careers", icon: <UserCheck className="w-5 h-5" />, description: "Discover attachment, graduate trainee, and technology career opportunities for people who want hands-on software experience." },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy & Data Protection", href: "/en/privacy-policy", icon: <Shield className="w-5 h-5" />, description: "Understand how Sababisha Solutions collects, uses, protects, and manages personal data in line with Kenyan data protection expectations." },
    ],
  },
];

export default function SitemapPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sitemap-group",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#EFEFEF] min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36]"></span>
            <span className="uppercase font-sans tracking-widest text-[10px] text-gray-600 font-bold">
              Navigation
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-[#111111] leading-[1.05] tracking-tight mb-6">
            Site{" "}
            <span className="italic text-[#FF5A36] relative inline-block">
              Map
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-gray-600 font-sans text-lg md:text-xl leading-relaxed max-w-2xl">
            A complete directory of Sababisha Solutions pages, including our fintech products, custom software services, enterprise projects, AI topics, research blogs, careers, testimonials, FAQs, and data protection information.
          </p>
        </Reveal>
      </section>

      {/* Sitemap Groups */}
      <section ref={containerRef} className="pb-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-8">
        {SITEMAP_GROUPS.map((group) => (
          <div
            key={group.title}
            className="sitemap-group bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FF5A36]/10 flex items-center justify-center shrink-0">
                <Map className="w-4 h-4 text-[#FF5A36]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-[#111111]">
                {group.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 md:pl-[52px]">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#FF5A36]/30 hover:bg-[#FF5A36]/5 transition-all interactive cursor-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-[#FF5A36] group-hover:border-[#FF5A36]/30 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-semibold text-[#111111] text-sm group-hover:text-[#FF5A36] transition-colors">
                        {link.label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF5A36] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-gray-500 font-sans text-xs mt-1 leading-relaxed line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Back to Home */}
        <div className="sitemap-group flex justify-center mt-4">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-gray-500 font-sans text-sm hover:text-[#FF5A36] transition-colors interactive cursor-none"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
