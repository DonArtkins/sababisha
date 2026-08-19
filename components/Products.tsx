"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { Pagination } from "./Pagination";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { id: 1, title: "Buni ERP", category: "Enterprise Resource Planning", color: "from-blue-500/20 to-transparent" },
  { id: 2, title: "Maziwa", category: "Digital Loans Gateway", color: "from-purple-500/20 to-transparent" },
  { id: 3, title: "Soko", category: "E-Commerce Suite", color: "from-green-500/20 to-transparent" },
  { id: 4, title: "Afya", category: "Health Management System", color: "from-red-500/20 to-transparent" },
  { id: 5, title: "Elimu", category: "Education Management System", color: "from-yellow-500/20 to-transparent" },
  { id: 6, title: "Kilimo", category: "Agriculture Supply Chain", color: "from-emerald-500/20 to-transparent" },
]; // Added a few more for pagination test

const ITEMS_PER_PAGE = 4;

export function Products() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = PRODUCTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-item",
        { y: 30, opacity: 0 },
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
  }, [currentPage]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Core<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Products
          </h2>
          <p className="text-gray-600 font-sans text-lg">Our Core Products Include</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative min-h-[400px]">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-item group relative h-64 md:h-80 rounded-[2rem] bg-white border border-gray-100 overflow-hidden interactive cursor-none hover:shadow-xl transition-all duration-500 p-8 flex flex-col justify-end">
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <span className="text-gray-500 font-sans text-sm mb-2 block">{product.category}</span>
                <h3 className="text-[#111111] font-display text-3xl md:text-4xl">{product.title}</h3>
              </div>
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
