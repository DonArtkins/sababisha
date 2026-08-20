"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { CyberText } from "./CyberText";
import { Reveal } from "./Reveal";
import { BentoTilt } from "./BentoTilt";
import { OptimizedImage } from "./OptimizedImage";
import { Pagination } from "./Pagination";

gsap.registerPlugin(ScrollTrigger, Flip);

const FILTERS = ["All", "Loan Management", "Legal Management", "Financial Analytics", "Government Projects"];

const ALL_PROJECTS = [
  { id: 3, title: "Maziwa", category: "Loan Management", subtitle: "Loan Management System", desc: "An overall system for managing different types of loans with better operational insights.", image: "/images/img5.jpg", link: "https://maziwa.sababisha.com" },
  { id: 2, title: "SheriaPro", category: "Legal Management", subtitle: "Legal Management System", desc: "The comprehensive legal tool for progressive law firms.", image: "/images/img6.jpg", link: "https://sheriapro.mcb.co.ke" },
  { id: 5, title: "Finsight", category: "Financial Analytics", subtitle: "Financial Analytics Tool", desc: "A financial management tool for M-Pesa statement analysis and smarter financial decision-making.", image: "/images/img1.jpg", link: "https://finsights.mcb.co.ke" },
  { id: 4, title: "KIAMIS", category: "Government Projects", subtitle: "Agri-Technology", desc: "A government system built to support farmers and agricultural processes countrywide.", image: "/images/img6.jpg", link: "https://kiamislive.kalro.org" },
  { id: 1, title: "POS System", category: "Financial Analytics", subtitle: "Point of Sale System", desc: "From managing inventory to quick transactions, our POS system is built to streamline your business operations and optimize your workflow.", image: "/images/img1.jpg", link: "https://njumu.pos.sababisha.com" },
  { id: 6, title: "Prudmat", category: "Loan Management", subtitle: "Banking Financial System", desc: "Banking solutions for SACCOs, microfinance institutions, and financial service providers.", image: "/images/img1.jpg", link: "https://prudmat.org" },
  { id: 7, title: "DataG", category: "Financial Analytics", subtitle: "General Trading System", desc: "Ensures information stored in the database remains accurate, accessible, and up to date.", image: "/images/img5.jpg", link: "https://datag.co.ke" },
  { id: 8, title: "Members Portal", category: "Government Projects", subtitle: "Insight for Radiologists", desc: "Precision and insight for radiologists worldwide.", image: "/images/img1.jpg", link: "https://membersportal.kar.co.ke" },
  { id: 9, title: "BIMA", category: "Financial Analytics", subtitle: "Insurance Agency Management System", desc: "A digital insurance management solution designed to simplify policy handling and service operations.", image: "/images/img6.jpg", link: "https://bima.sababisha.com" },
  { id: 10, title: "TIBA", category: "Financial Analytics", subtitle: "Hospital Management System", desc: "A hospital management system built to improve healthcare workflows, records, and service delivery.", image: "/images/img1.jpg", link: "https://tiba.sababisha.com" },
];

const ITEMS_PER_PAGE = 6;

export function Work({ variant = "home" }: { variant?: "home" | "page" }) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<any>(null);

  const filteredProjects = ALL_PROJECTS.filter(p => activeFilter === "All" || p.category === activeFilter);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    if (variant === "page") {
      flipStateRef.current = Flip.getState(".project-card");
    }
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    if (variant === "page") {
      flipStateRef.current = Flip.getState(".project-card");
    }
    setCurrentPage(page);
  };

  useLayoutEffect(() => {
    if (!gridRef.current || variant === 'home' || !flipStateRef.current) return;
    
    Flip.from(flipStateRef.current, {
      targets: ".project-card",
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 })
    });
    flipStateRef.current = null;
  }, [activeFilter, currentPage, variant]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card:not(.hidden)",
        { y: 50, opacity: 0 },
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
    }, containerRef);
    return () => ctx.revert();
  }, [activeFilter, currentPage]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            {variant === "home" ? (
              <>
                Our <span className="text-accent relative inline-block">
                  Recent<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span> Projects
              </>
            ) : (
              <>
                <span className="text-accent relative inline-block">
                  All<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span> Projects
              </>
            )}
          </h2>
          <p className="text-gray-600 font-sans text-lg">
            {variant === "home" ? "A selection of our latest work" : "Explore our comprehensive portfolio"}
          </p>
        </Reveal>

        {variant === "page" && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-all interactive cursor-none ${
                  activeFilter === filter
                    ? "bg-[#111111] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <CyberText text={filter} speed={30} />
              </button>
            ))}
          </div>
        )}

        {/* ── Mobile grid (touch devices, no flip) ── */}
        <div
          className={
            variant === "home"
              ? "md:hidden grid grid-cols-1 gap-10 w-full"
              : "md:hidden grid grid-cols-1 gap-10 w-full"
          }
        >
          {ALL_PROJECTS.map((project, index) => {
            const matchesFilter = activeFilter === "All" || project.category === activeFilter;
            const isVisible = variant === "home"
              ? index < 4
              : matchesFilter &&
                filteredProjects.findIndex(p => p.id === project.id) >= (currentPage - 1) * ITEMS_PER_PAGE &&
                filteredProjects.findIndex(p => p.id === project.id) < currentPage * ITEMS_PER_PAGE;

            if (!isVisible) return null;

            if (variant === "home") {
              return (
                <Link
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card block interactive cursor-none"
                >
                  {/* Image */}
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      wrapperClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover"
                    />
                  </div>
                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    <span className="text-accent">{project.subtitle}</span>
                    <span>•</span>
                    <span>{new URL(project.link).hostname}</span>
                  </div>
                  {/* Title */}
                  <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{project.title}</h3>
                  <p className="text-gray-500 font-sans text-sm mb-5 line-clamp-2">{project.desc}</p>
                  {/* CTA */}
                  <span className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold">
                    Visit Website <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            }

            // Page variant — RD-blogs style card
            return (
              <Link
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card block interactive cursor-none"
              >
                {/* Image */}
                <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    wrapperClassName="absolute inset-0 w-full h-full"
                    imageClassName="w-full h-full object-cover"
                  />
                </div>
                {/* Meta row */}
                <div className="flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  <span className="text-accent">{project.subtitle}</span>
                  <span>•</span>
                  <span>{new URL(project.link).hostname}</span>
                </div>
                {/* Title */}
                <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{project.title}</h3>
                <p className="text-gray-500 font-sans text-sm mb-5 line-clamp-2">{project.desc}</p>
                {/* CTA */}
                <span className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold">
                  Visit Website <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* ── Desktop grid (hover / flip cards) ── */}
        <div
          ref={gridRef}
          className={
            variant === "home"
              ? "hidden md:grid md:grid-cols-2 gap-4 lg:gap-6 w-full relative"
              : "hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-h-[400px] relative"
          }
        >
          {ALL_PROJECTS.map((project, index) => {
            const matchesFilter = activeFilter === "All" || project.category === activeFilter;
            const isVisible = variant === "home"
              ? index < 4
              : matchesFilter &&
                filteredProjects.findIndex(p => p.id === project.id) >= (currentPage - 1) * ITEMS_PER_PAGE &&
                filteredProjects.findIndex(p => p.id === project.id) < currentPage * ITEMS_PER_PAGE;

            if (variant === "home") {
              const isLarge = index === 0 || index === 3;
              return (
                <BentoTilt key={project.id} data-flip-id={project.id} className={`project-card ${isLarge ? "md:col-span-2 h-80" : "col-span-1 h-72"} ${!isVisible ? "hidden" : ""}`}>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full h-full interactive cursor-none [perspective:1000px]"
                  >
                    <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-lg relative">
                      {/* Front Side */}
                      <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={project.image}
                          alt={project.title}
                          wrapperClassName="absolute inset-0 w-full h-full"
                          imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Glassy shine overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#111111]/80" />
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-2 drop-shadow-md">
                            {project.subtitle}
                          </span>
                          <h3 className="text-white font-display text-3xl font-bold drop-shadow-md">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl bg-card [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center border border-border">
                        <h3 className="text-foreground font-display text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-muted font-sans text-sm mb-6 line-clamp-3">{project.desc}</p>
                        <Button variant="secondary" size="sm">Visit Website</Button>
                      </div>
                    </div>
                  </Link>
                </BentoTilt>
              );
            }

            return (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.id}
                data-flip-id={project.id}
                className={`project-card group relative aspect-[4/3] interactive cursor-none [perspective:1000px] ${!isVisible ? "hidden" : ""}`}
              >
                <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-lg relative">
                  {/* Front Side */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden bg-gray-100">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      wrapperClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-2">
                        {project.subtitle}
                      </span>
                      <h3 className="text-white font-display text-2xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-card [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center border border-border">
                    <h3 className="text-foreground font-display text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted font-sans text-sm mb-6 line-clamp-3">{project.desc}</p>
                    <Button variant="secondary" size="sm">Visit Website</Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {variant === "page" && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}

        {variant === "home" && (
          <div className="mt-16 text-center">
            <Button variant="primary" href="/en/explore/projects">Explore All Projects</Button>
          </div>
        )}
      </div>
    </section>
  );
}
