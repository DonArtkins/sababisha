"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
}

export function Reveal({ children, className = "", delay = 0, stagger = 0.1, y = 40 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(containerRef.current!.children, { y: y, opacity: 0 });

      // Create scroll trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        animation: gsap.to(containerRef.current!.children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: stagger,
          delay: delay,
          ease: "power3.out",
        }),
      });
    }, containerRef);
    return () => ctx.revert();
  }, [delay, stagger, y]);

  return (
    <div ref={containerRef} className={`reveal-container ${className}`}>
      {children}
    </div>
  );
}
