"use client";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Wallet, Lightbulb, Server, LineChart, Code, LifeBuoy } from "lucide-react";
import { SERVICES } from "@/lib/db";
import { AnimatedLink } from "./AnimatedLink";
import { Pagination } from "./Pagination";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, ReactNode> = {
  "FINTECH": <Wallet className="w-5 h-5 text-accent" />,
  "ADVISORY": <Lightbulb className="w-5 h-5 text-accent" />,
  "SYSTEMS": <Server className="w-5 h-5 text-accent" />,
  "ANALYTICS": <LineChart className="w-5 h-5 text-accent" />,
  "ENGINEERING": <Code className="w-5 h-5 text-accent" />,
  "LIFECYCLE": <LifeBuoy className="w-5 h-5 text-accent" />
};

const services = SERVICES.map(service => ({
  ...service,
  icon: serviceIcons[service.iconKey] || <Server className="w-5 h-5 text-accent" />
}));

const serviceStats = [
  {
    value: String(SERVICES.length),
    label: "CORE SERVICE AREAS",
  },
  {
    value: String(new Set(SERVICES.map((service) => service.category)).size),
    label: "PRACTICE CATEGORIES",
  },
  {
    value: String(SERVICES.reduce((total, service) => total + service.points.length, 0)),
    label: "SERVICE CAPABILITIES",
  },
];

const ITEMS_PER_PAGE = 6;

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentServices = services.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
      
      gsap.fromTo(
        ".stat-box",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentPage]);

  return (
    <section ref={containerRef} className="py-16 px-4 text-[#111111] sm:px-6 md:px-12 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <Reveal className="text-center mb-12 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Core<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Services
          </h2>
          <p className="max-w-3xl text-gray-600 font-sans text-base leading-relaxed sm:text-lg">
            From fintech platform engineering to enterprise systems, analytics, consultancy, custom software, and long-term support, Sababisha Solutions helps organizations modernize operations with secure, scalable technology built around real users, real data, integrations, compliance needs, and measurable business outcomes.
          </p>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
          {serviceStats.map((stat) => (
            <div key={stat.label} className="stat-box rounded-2xl border border-gray-100 bg-white/90 p-5 text-center shadow-[0_16px_40px_rgba(17,17,17,0.06)] dark:border-border dark:bg-card">
              <h3 className="mb-1 font-display text-3xl text-accent tabular-nums sm:text-4xl">{stat.value}</h3>
              <p className="text-xs text-gray-500 font-sans tracking-widest uppercase font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentServices.map((service, idx) => (
            <div key={service.slug} className="service-card group relative flex min-h-[380px] flex-col overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white/90 p-5 shadow-[0_18px_48px_rgba(17,17,17,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_26px_64px_rgba(255,90,54,0.13)] interactive cursor-none dark:border-border dark:bg-card sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-[#ff8a6e] to-transparent opacity-70"></div>

              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-accent shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-accent/20 group-hover:bg-accent/10 dark:border-border dark:bg-background">
                  {service.icon}
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-sans font-bold tabular-nums">
                    {String(startIndex + idx + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-gray-200 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:border-border">
                    {service.category}
                  </span>
                </div>
              </div>
              
              <h3 className="mb-3 min-h-[3.2rem] font-display text-[1.35rem] leading-tight text-[#111111] sm:text-2xl">
                {service.title}
              </h3>
              <p className="min-h-[4.4rem] text-sm leading-relaxed text-gray-600 font-sans line-clamp-3">
                {service.desc}
              </p>
              
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-gray-100 pt-5 dark:border-border">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-sans font-medium">
                    <Check className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              <AnimatedLink
                href={`/en/contact?service=${encodeURIComponent(service.slug)}`}
                className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm text-accent font-sans font-bold group-hover:text-[#FF5A36] transition-colors"
                icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              >
                Discuss Service
              </AnimatedLink>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>
    </section>
  );
}
