"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";

gsap.registerPlugin(ScrollTrigger);

export function FooterCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
    <section ref={containerRef} className="pt-32 pb-16 px-6 md:px-12 bg-[#EFEFEF] text-[#111111] border-t border-gray-200">
      <div className="max-w-7xl mx-auto cta-content flex flex-col md:flex-row items-start md:items-center justify-between gap-12 relative z-10 border-b border-gray-200 pb-16">
        <div className="text-left flex-1 relative">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF5A36]/10 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 text-[#111111] relative z-10">
            Looking for a collaboration?<br/>
            Get Started Today!
          </h2>
          <p className="text-gray-600 font-sans text-xl max-w-lg relative z-10">
            We offer tailored solutions to help you achieve your goals. Contact us now to start your journey!
          </p>
        </div>
        
        <div className="relative z-10 shrink-0">
          <Button variant="secondary" size="lg" href="/en/contact">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
