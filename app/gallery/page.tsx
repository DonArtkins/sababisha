"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { Pagination } from "@/components/Pagination";
import { GALLERY_DATA, GALLERY_FILTERS } from "@/lib/db";

gsap.registerPlugin(ScrollTrigger, Flip);

const ITEMS_PER_PAGE = 6;

const GalleryCard = ({ item, className }: { item: any, className?: string }) => (
  <div
    data-flip-id={item.id}
    className={`gallery-card group interactive cursor-none ${className ?? ""}`}
  >
    <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
      <OptimizedImage
        src={item.image}
        alt={item.title}
        wrapperClassName="absolute inset-0 w-full h-full"
        imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-2 block">
      {item.category}
    </span>
    <h3 className="font-display text-3xl text-[#111111] leading-tight mb-3">{item.title}</h3>
    {item.desc && (
      <p className="text-gray-500 font-sans text-sm leading-relaxed line-clamp-3">
        {item.desc}
      </p>
    )}
  </div>
);

const GalleryCardMobile = ({ item, className }: { item: any, className?: string }) => (
  <div className={`gallery-card interactive cursor-none ${className ?? ''}`}>
    <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
      <OptimizedImage
        src={item.image}
        alt={item.title}
        wrapperClassName="absolute inset-0 w-full h-full"
        imageClassName="w-full h-full object-cover"
      />
    </div>
    <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-2 block">
      {item.category}
    </span>
    <h3 className="font-display text-2xl text-[#111111] leading-tight mb-3">{item.title}</h3>
    {item.desc && (
      <p className="text-gray-500 font-sans text-sm leading-relaxed">
        {item.desc}
      </p>
    )}
  </div>
);

export function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const flipStateRef = useRef<any>(null);

  const filteredItems = GALLERY_DATA.filter(item => activeFilter === "All" || item.category === activeFilter);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    flipStateRef.current = Flip.getState(".gallery-card");
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    flipStateRef.current = Flip.getState(".gallery-card");
    setCurrentPage(page);
  };

  useLayoutEffect(() => {
    if (!gridRef.current || !flipStateRef.current) return;
    
    Flip.from(flipStateRef.current, {
      targets: ".gallery-card",
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 })
    });
    flipStateRef.current = null;
  }, [activeFilter, currentPage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-card:not(.hidden)",
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
    <main className="bg-transparent pt-32 pb-24 min-h-screen">
      <section ref={containerRef} className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-7xl text-[#111111] leading-tight mb-6">
            Our <span className="text-accent relative inline-block">
              Gallery
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the people, workshops, product planning sessions, launches, and team moments behind Sababisha Solutions. Our gallery highlights the collaboration, engineering culture, client engagement, and delivery discipline that support every digital transformation project.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {GALLERY_FILTERS.map((filter) => (
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

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-1 gap-10 w-full relative">
          {GALLERY_DATA.map((item) => {
            const matchesFilter = activeFilter === "All" || item.category === activeFilter;
            const isVisible = matchesFilter &&
              filteredItems.findIndex(p => p.id === item.id) >= (currentPage - 1) * ITEMS_PER_PAGE &&
              filteredItems.findIndex(p => p.id === item.id) < currentPage * ITEMS_PER_PAGE;

            return (
              <GalleryCardMobile
                key={item.id}
                item={item}
                className={!isVisible ? "hidden" : ""}
              />
            );
          })}
        </div>

        {/* Desktop grid */}
        <div 
          ref={gridRef}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 w-full min-h-[400px] relative"
        >
          {GALLERY_DATA.map((item) => {
            const matchesFilter = activeFilter === "All" || item.category === activeFilter;
            const isVisible = matchesFilter && 
              filteredItems.findIndex(p => p.id === item.id) >= (currentPage - 1) * ITEMS_PER_PAGE && 
              filteredItems.findIndex(p => p.id === item.id) < currentPage * ITEMS_PER_PAGE;

            return (
              <GalleryCard 
                key={item.id} 
                item={item} 
                className={!isVisible ? "hidden" : ""}
              />
            );
          })}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </section>
    </main>
  );
}

export default Gallery;
