"use client";
import { useEffect, useRef, useState, useLayoutEffect, type MouseEvent } from "react";
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
import { LiveSiteUnavailableModal } from "./LiveSiteUnavailableModal";

gsap.registerPlugin(ScrollTrigger, Flip);

const FILTERS = ["All", "Loan Management", "Legal Management", "Financial Analytics", "Government Projects"];

const ALL_PROJECTS: {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  desc: string;
  image: string;
  link?: string;
}[] = [
  { id: 3, title: "Maziwa", category: "Loan Management", subtitle: "Loan Management System", desc: "A digital loan management platform for microfinance teams that need stronger client tracking, repayment visibility, credit workflows, portfolio reporting, and operational control across multiple loan products.", image: "/images/projects/maziwa-bg.png", link: "https://maziwa.sababisha.com" },
  { id: 2, title: "SheriaPro", category: "Legal Management", subtitle: "Legal Management System", desc: "A legal practice management system built for progressive law firms, combining case management, client records, billing, document workflows, deadlines, and performance reporting in one dependable platform.", image: "/images/projects/sheria-pro-bg.png", link: "https://sheriapro.mcb.co.ke" },
  { id: 5, title: "Finsight", category: "Financial Analytics", subtitle: "Financial Analytics Tool", desc: "A financial intelligence tool that helps organizations analyze M-Pesa statements, understand cash flow patterns, reduce manual review, and make faster, evidence-based financial decisions.", image: "/images/projects/finsight-bg.png", link: "https://finsights.mcb.co.ke" },
  { id: 4, title: "KIAMIS", category: "Government Projects", subtitle: "Agri-Technology", desc: "A large-scale agriculture technology system designed to support farmer registration, program visibility, data collection, and coordinated service delivery for agricultural stakeholders.", image: "/images/projects/kiamis-bg.png", link: "https://kiamislive.kalro.org" },
  { id: 1, title: "POS System", category: "Financial Analytics", subtitle: "Point of Sale System", desc: "A point of sale solution for stock control, quick transactions, sales monitoring, receipts, inventory visibility, and day-to-day retail operations that need speed and accountability.", image: "/images/projects/njumu-pos-bg.png", link: "https://njumu.pos.sababisha.com" },
  { id: 6, title: "Prudmat", category: "Loan Management", subtitle: "Banking Financial System", desc: "A banking and financial operations platform for SACCOs, microfinance institutions, and financial service providers managing members, savings, loans, approvals, accounting, and compliance reporting.", image: "/images/projects/prudmat-bg.png", link: "https://www.prudmat.org" },
  { id: 7, title: "DataG", category: "Financial Analytics", subtitle: "General Trading System", desc: "A general trading system that keeps operational data accurate, accessible, and current, helping teams manage records, transactions, stock movement, and reporting from a single source of truth.", image: "/images/projects/data-g-bg.png", link: "https://datag.co.ke" },
  { id: 8, title: "Members Portal", category: "Government Projects", subtitle: "Insight for Radiologists", desc: "A member self-service and professional portal that improves access to information, communication, records, and digital services for radiology stakeholders and administrative teams.", image: "/images/projects/members-portal-bg.png", link: "https://membersportal.kar.co.ke" },
  { id: 9, title: "BIMA", category: "Financial Analytics", subtitle: "Insurance Agency Management System", desc: "An insurance agency management platform that simplifies policy handling, renewals, client records, underwriting support, reporting, and service operations for growing insurance teams.", image: "/images/projects/bima-bg.png", link: "https://bima.sababisha.com" },
  { id: 10, title: "TIBA", category: "Financial Analytics", subtitle: "Hospital Management System", desc: "A hospital management system built to improve patient registration, appointments, pharmacy, laboratory, billing, records, reporting, and healthcare service delivery across departments.", image: "/images/projects/tiba-bg.png", link: "https://tiba.sababisha.com" },
];

const ITEMS_PER_PAGE = 6;

function getProjectHost(link?: string) {
  if (!link) return "Private demo";
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "Private demo";
  }
}

function ProjectImagePills({ title, category }: { title: string; category: string }) {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2 max-w-[calc(100%-2rem)]">
      <span className="inline-flex max-w-full items-center truncate bg-white px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] text-[#111111] font-sans text-xs sm:text-sm font-semibold tracking-wide">
        {title}
      </span>
      <span className="inline-flex max-w-full items-center truncate bg-[#FF5A36] px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(255,90,54,0.45)] text-white font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
        {category}
      </span>
    </div>
  );
}

export function Work({ variant = "home" }: { variant?: "home" | "page" }) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [unavailableItem, setUnavailableItem] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<any>(null);

  const filteredProjects = ALL_PROJECTS.filter(p => activeFilter === "All" || p.category === activeFilter);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const handleUnavailableClick = (event: MouseEvent, title: string) => {
    event.preventDefault();
    setUnavailableItem(title);
  };

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
          <p className="max-w-3xl text-gray-600 font-sans text-base leading-relaxed sm:text-lg">
            {variant === "home"
              ? "A focused look at the fintech, healthcare, legal, agriculture, analytics, and enterprise systems we have built to solve real operational problems for organizations across Kenya and beyond through workflow automation, integrations, reporting, and user-centered software."
              : "Explore our portfolio of production-ready platforms, from loan management and payment workflows to hospital systems, legal operations, member portals, financial analytics, point-of-sale tools, and government technology projects built for reliable day-to-day use."}
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
              return project.link ? (
                <Link
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card block interactive cursor-none"
                >
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      wrapperClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover"
                    />
                    <ProjectImagePills title={project.title} category={project.category} />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    <span className="text-accent">{project.subtitle}</span>
                    <span>•</span>
                    <span>{getProjectHost(project.link)}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{project.title}</h3>
                  <p className="text-gray-500 font-sans text-sm mb-5 line-clamp-2">{project.desc}</p>
                  <span className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold">
                    Visit Website <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ) : (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setUnavailableItem(project.title)}
                  className="project-card block w-full text-left interactive cursor-none"
                >
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      wrapperClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover"
                    />
                    <ProjectImagePills title={project.title} category={project.category} />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    <span className="text-accent">{project.subtitle}</span>
                    <span>•</span>
                    <span>{getProjectHost(project.link)}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{project.title}</h3>
                  <p className="text-gray-500 font-sans text-sm mb-5 line-clamp-2">{project.desc}</p>
                  <span className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold">
                    Visit Website <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              );
            }

            // Page variant — RD-blogs style card
            return project.link ? (
              <Link
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card block interactive cursor-none"
              >
                <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    wrapperClassName="absolute inset-0 w-full h-full"
                    imageClassName="w-full h-full object-cover"
                  />
                  <ProjectImagePills title={project.title} category={project.category} />
                </div>
                <div className="flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  <span className="text-accent">{project.subtitle}</span>
                  <span>•</span>
                  <span>{getProjectHost(project.link)}</span>
                </div>
                <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{project.title}</h3>
                <p className="text-gray-500 font-sans text-sm mb-5 line-clamp-2">{project.desc}</p>
                <span className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold">
                  Visit Website <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ) : (
              <button
                key={project.id}
                type="button"
                onClick={() => setUnavailableItem(project.title)}
                className="project-card block w-full text-left interactive cursor-none"
              >
                <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    wrapperClassName="absolute inset-0 w-full h-full"
                    imageClassName="w-full h-full object-cover"
                  />
                  <ProjectImagePills title={project.title} category={project.category} />
                </div>
                <div className="flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  <span className="text-accent">{project.subtitle}</span>
                  <span>•</span>
                  <span>{getProjectHost(project.link)}</span>
                </div>
                <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{project.title}</h3>
                <p className="text-gray-500 font-sans text-sm mb-5 line-clamp-2">{project.desc}</p>
                <span className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold">
                  Visit Website <ArrowRight className="w-4 h-4" />
                </span>
              </button>
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
              const cardInner = (
                    <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-lg relative">
                      <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={project.image}
                          alt={project.title}
                          wrapperClassName="absolute inset-0 w-full h-full"
                          imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#111111]/80" />
                        <ProjectImagePills title={project.title} category={project.category} />
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-2 drop-shadow-md">
                            {project.subtitle}
                          </span>
                          <h3 className="text-white font-display text-3xl font-bold drop-shadow-md">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl bg-card [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center border border-border">
                        <h3 className="text-foreground font-display text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-muted font-sans text-sm mb-6 line-clamp-3">{project.desc}</p>
                        <Button variant="secondary" size="sm">Visit Website</Button>
                      </div>
                    </div>
              );

              return (
                <BentoTilt key={project.id} data-flip-id={project.id} className={`project-card ${isLarge ? "md:col-span-2 h-80" : "col-span-1 h-72"} ${!isVisible ? "hidden" : ""}`}>
                  {project.link ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block w-full h-full interactive cursor-none [perspective:1000px]"
                    >
                      {cardInner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={(event) => handleUnavailableClick(event, project.title)}
                      className="group relative block w-full h-full text-left interactive cursor-none [perspective:1000px]"
                    >
                      {cardInner}
                    </button>
                  )}
                </BentoTilt>
              );
            }

            const pageCardInner = (
                <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-lg relative">
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden bg-gray-100">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      wrapperClassName="absolute inset-0 w-full h-full"
                      imageClassName="w-full h-full object-cover"
                    />
                    <ProjectImagePills title={project.title} category={project.category} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-2">
                        {project.subtitle}
                      </span>
                      <h3 className="text-white font-display text-2xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-card [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center border border-border">
                    <h3 className="text-foreground font-display text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted font-sans text-sm mb-6 line-clamp-3">{project.desc}</p>
                    <Button variant="secondary" size="sm">Visit Website</Button>
                  </div>
                </div>
            );

            return project.link ? (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.id}
                data-flip-id={project.id}
                className={`project-card group relative aspect-[4/3] interactive cursor-none [perspective:1000px] ${!isVisible ? "hidden" : ""}`}
              >
                {pageCardInner}
              </Link>
            ) : (
              <button
                type="button"
                key={project.id}
                data-flip-id={project.id}
                onClick={(event) => handleUnavailableClick(event, project.title)}
                className={`project-card group relative aspect-[4/3] w-full text-left interactive cursor-none [perspective:1000px] ${!isVisible ? "hidden" : ""}`}
              >
                {pageCardInner}
              </button>
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
            <Button variant="primary" href="/explore/projects">Explore All Projects</Button>
          </div>
        )}
      </div>

      <LiveSiteUnavailableModal
        open={Boolean(unavailableItem)}
        itemName={unavailableItem || undefined}
        onClose={() => setUnavailableItem(null)}
      />
    </section>
  );
}
