"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { Reveal } from "./Reveal";

export function Brands() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".brand-logo",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-6 md:px-12 bg-transparent border-y border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Trusted<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Brands
          </h2>
          <p className="text-gray-600 font-sans text-lg">Our Trusted Brands Include</p>
        </Reveal>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
          {/* Mock Logos */}
          <div className="brand-logo font-display text-2xl font-bold">Acme Corp</div>
          <div className="brand-logo font-display text-2xl font-bold">GlobalBank</div>
          <div className="brand-logo font-display text-2xl font-bold">HealthPlus</div>
          <div className="brand-logo font-display text-2xl font-bold">LogisticsIO</div>
          <div className="brand-logo font-display text-2xl font-bold">TechSolutions</div>
        </div>
      </div>
    </section>
  );
}