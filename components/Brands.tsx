"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { BRANDS } from "@/lib/db";
import type { Brand } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

function BrandCard({ brand }: { brand: Brand }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-[160px] md:w-[200px] h-[120px] md:h-[140px] bg-card border border-border rounded-2xl shadow-sm mx-3 flex-shrink-0 transition-transform hover:scale-105 interactive cursor-none group">
      {!imgError ? (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={64}
          height={64}
          loading="eager"
          className="w-12 h-12 md:w-16 md:h-16 object-contain mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-12 h-12 md:w-16 md:h-16 bg-foreground/5 rounded-full flex items-center justify-center text-foreground font-bold text-xl md:text-2xl mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
          {brand.name.charAt(0)}
        </div>
      )}
      <span className="text-muted font-sans text-[10px] md:text-xs font-semibold text-center px-2 group-hover:text-foreground transition-colors duration-300">
        {brand.name}
      </span>
    </div>
  );
}

export function Brands() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".brands-marquee",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
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
    <section ref={containerRef} className="py-16 md:py-24 bg-transparent border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center px-6 md:px-12">
        <Reveal className="text-center mb-12 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Trusted<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Brands
          </h2>
          <p className="max-w-3xl text-muted font-sans text-base leading-relaxed sm:text-lg">
            Trusted by public institutions, finance teams, micro-credit providers, trading businesses, and growth-focused organizations that rely on Sababisha Solutions for dependable software delivery, digital transformation, integrations, and ongoing technology support.
          </p>
        </Reveal>
      </div>

      <div className="brands-marquee w-full relative flex items-center overflow-hidden">
        {/* Left/Right fading masks for smooth infinite look */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Duplicate list for seamless scrolling */}
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <BrandCard key={`${brand.domain}-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
