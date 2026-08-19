"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Sababisha completely transformed how we handle our digital lending. The Maziwa platform is intuitive, secure, and incredibly fast.",
    author: "Jane Doe",
    role: "CEO, FinTech Africa"
  },
  {
    quote: "The enterprise systems developed by Sababisha have streamlined our internal operations, saving us hundreds of hours each month.",
    author: "John Smith",
    role: "Operations Director, LogiCorp"
  }
];

import { Reveal } from "./Reveal";

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
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
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Client<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Testimonials
          </h2>
          <p className="text-gray-600 font-sans text-lg">Our Client Testimonials Include</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card p-10 rounded-2xl bg-white border border-gray-200 relative interactive cursor-none hover:border-accent/30 transition-colors">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-[#111111]/5" />
              <p className="font-display text-xl md:text-2xl leading-relaxed text-gray-600 mb-8 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[#111111]">{t.author}</h4>
                  <p className="font-sans text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}