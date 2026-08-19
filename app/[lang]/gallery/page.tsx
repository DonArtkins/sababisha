"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { BentoTilt } from "@/components/BentoTilt";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { Pagination } from "@/components/Pagination";

gsap.registerPlugin(ScrollTrigger, Flip);

const GALLERY_DATA = [
  // Sababisha
  { id: 1, title: "Annual Strategy Meet", image: "/images/img1.jpg", category: "Sababisha Team" },
  { id: 2, title: "Office Expansion", image: "/images/img5.jpg", category: "Sababisha Team" },
  { id: 3, title: "Client Workshop", image: "/images/img6.jpg", category: "Sababisha Team" },
  // Development
  { id: 4, title: "Hackathon 2026", image: "/images/img5.jpg", category: "Development Team" },
  { id: 5, title: "Sprint Planning", image: "/images/img6.jpg", category: "Development Team" },
  { id: 6, title: "Launch Day", image: "/images/img1.jpg", category: "Development Team" },
  // Moments
  { id: 7, title: "Team Retreat", image: "/images/img6.jpg", category: "Teams Moments" },
  { id: 8, title: "Friday Social", image: "/images/img1.jpg", category: "Teams Moments" },
  { id: 9, title: "Award Ceremony", image: "/images/img5.jpg", category: "Teams Moments" },
  { id: 10, title: "Community Outreach", image: "/images/img6.jpg", category: "Teams Moments" },
  { id: 11, title: "Offsite Brainstorm", image: "/images/img1.jpg", category: "Teams Moments" },
];

const FILTERS = ["All", "Sababisha Team", "Development Team", "Teams Moments"];
const ITEMS_PER_PAGE = 6;

const GalleryCard = ({ item, className }: { item: any, className?: string }) => (
  <BentoTilt data-flip-id={item.id} className={`gallery-card group relative rounded-3xl overflow-hidden bg-gray-100 interactive cursor-none ${className}`}>
    <OptimizedImage 
      src={item.image} 
      alt={item.title}
      wrapperClassName="absolute inset-0 w-full h-full"
      imageClassName="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
      <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-1">
        {item.category}
      </span>
      <h3 className="text-white font-display text-xl font-bold">
        {item.title}
      </h3>
    </div>
  </BentoTilt>
);

const GalleryCardMobile = ({ item, className }: { item: any, className?: string }) => (
  <div className={`gallery-card interactive cursor-none ${className ?? ''}`}>
    <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-gray-100 relative">
      <OptimizedImage
        src={item.image}
        alt={item.title}
        wrapperClassName="absolute inset-0 w-full h-full"
        imageClassName="w-full h-full object-cover"
      />
    </div>
    <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold mb-1 block">
      {item.category}
    </span>
    <h3 className="font-display text-xl text-[#111111] leading-tight">{item.title}</h3>
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
            Our <span className="text-accent italic">Gallery</span>
          </h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            Glimpses into our culture, collaboration, and celebrations.
          </p>
        </div>

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

        {/* Mobile grid — always-visible card text, no hover required */}
        <div className="md:hidden grid grid-cols-1 gap-6 w-full relative">
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

        {/* Desktop grid — BentoTilt cards with GSAP Flip */}
        <div 
          ref={gridRef}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full min-h-[400px] relative"
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
                className={`aspect-[4/3] ${!isVisible ? "hidden" : ""}`} 
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
