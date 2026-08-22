"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    project: "SSL",
    quote: "Working with SSL has been a game-changer for our business. Their innovative solutions and dedicated team have truly exceeded our expectations. We've seen a significant increase in efficiency and growth since partnering with them.",
    author: "Danny Mutinda",
    role: "CEO @Jambofin.co.ke"
  },
  {
    project: "SSL",
    quote: "Since partnering with SSL, our business has experienced remarkable growth and success. Their expertise and dedication have propelled us to new heights, and we couldn't be happier with the results.",
    author: "Erick Wadindwe",
    role: "CEO @Velocity"
  },
  {
    project: "TIBA",
    quote: "Before TIBA, managing patient flow and internal reporting was a considerable challenge for our team. The system has brought structure, accuracy, and efficiency to our entire operation from the front desk to the pharmacy and laboratory. We have seen measurable improvements in service delivery and patient satisfaction since implementation. We are confident in recommending TIBA to any healthcare institution seeking a dependable management solution.",
    author: "Esther Nzilani",
    role: "Healthcare Professional"
  },
  {
    project: "BIMA",
    quote: "As a firm managing multiple client portfolios, we required a system that was both robust and adaptable and BIMA delivered on all fronts. The platform handles underwriting, renewals, and reporting with a level of precision that has strengthened our internal controls and client confidence. Our team onboarded quickly, and the results have been evident across every department. BIMA is an investment that has consistently justified itself.",
    author: "Benson Kimani",
    role: "Insurance Manager"
  }
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 interactive cursor-none flex flex-col h-full min-h-[280px] md:min-h-[340px]">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-accent/20 mb-4 shrink-0" />

      {/* Project Badge */}
      <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-4 self-start shadow-sm">
        Project: {t.project}
      </span>

      {/* Quote Text — clamped to 4 lines with ellipses */}
      <p className="font-sans text-base leading-relaxed text-foreground/80 mb-6 flex-1 line-clamp-4">
        {t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/60 shrink-0">
        <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-sm shrink-0">
          {t.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-sans font-semibold text-foreground text-sm">{t.author}</h4>
          <p className="font-sans text-xs text-muted">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Responsive items per page — 1 on mobile, 2 on md+
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setItemsPerPage(mq.matches ? 2 : 1);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Total number of pages — recalculated when itemsPerPage changes
  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  // Get the items for a given page index (wraps around)
  const getPageItems = useCallback((pageIndex: number, count: number) => {
    const startIdx = (pageIndex * count) % TESTIMONIALS.length;
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(TESTIMONIALS[(startIdx + i) % TESTIMONIALS.length]);
    }
    return items;
  }, []);

  const animateTransition = useCallback((direction: "left" | "right", newPage: number) => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    const track = trackRef.current;
    const xFrom = direction === "left" ? "100%" : "-100%";

    // Animate out current, then swap content and animate in
    gsap.to(track, {
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setCurrentPage(newPage);
        gsap.set(track, { x: xFrom, opacity: 0 });
        gsap.to(track, {
          x: "0%",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    const nextPage = (currentPage + 1) % totalPages;
    animateTransition("left", nextPage);
  }, [currentPage, animateTransition, totalPages]);

  const handlePrev = useCallback(() => {
    const prevPage = (currentPage - 1 + totalPages) % totalPages;
    animateTransition("right", prevPage);
  }, [currentPage, animateTransition, totalPages]);

  const handlePageChange = useCallback((page: number) => {
    if (page === currentPage || isAnimating) return;
    const direction = page > currentPage ? "left" : "right";
    animateTransition(direction, page);
  }, [currentPage, isAnimating, animateTransition]);

  // Autoplay — advances page every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && trackRef.current) {
        const nextPage = (currentPage + 1) % totalPages;
        animateTransition("left", nextPage);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentPage, isAnimating, animateTransition, totalPages]);

  // Initial entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-wrapper",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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

  const currentItems = getPageItems(currentPage, itemsPerPage);

  return (
    <section id="testimonials" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col items-center testimonial-wrapper">

        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Client<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Testimonials
          </h2>
          <p className="max-w-3xl text-muted font-sans text-base leading-relaxed sm:text-lg">
            Discover what clients say after partnering with Sababisha Solutions to improve operational efficiency, strengthen digital workflows, reduce manual processes, and launch dependable systems across finance, healthcare, insurance, analytics, and enterprise service delivery.
          </p>
        </Reveal>

        {/* Slideshow Track — single column on mobile, 2 columns on md+ */}
        <div className="w-full overflow-hidden mb-12">
          <div
            ref={trackRef}
            className="grid gap-6 w-full grid-cols-1 md:grid-cols-2"
          >
            {currentItems.map((t, i) => (
              <TestimonialCard key={`${currentPage}-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Navigation — Matching site pagination theme */}
        <div className="flex justify-center items-center space-x-2 md:space-x-4 w-full">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrev}
          >
            Previous
          </Button>

          <div className="flex space-x-1.5 md:space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-sans text-xs md:text-sm transition-colors interactive cursor-none ${currentPage === i ? "bg-foreground text-background font-semibold shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-muted dark:hover:bg-white/10"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>

      </div>
    </section>
  );
}
