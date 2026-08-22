"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export function PreLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }
      });

      // Subtle glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Simulate loading progress
      const counter = { value: 0 };
      
      tl.to(counter, {
        value: 100,
        duration: 2.5,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = `${Math.round(counter.value)}%`;
          }
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: counter.value / 100 });
          }
        }
      })
      .to(wrapperRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: "power3.in"
      }, "+=0.2")
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
      }, "-=0.2");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
    >
      {/* Ambient background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-loader-glow blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-loader-glow blur-[100px]" />
      </div>

      <div ref={wrapperRef} className="flex flex-col items-center w-full max-w-sm px-container-x relative z-10">
        
        {/* Branding & Logo */}
        <div className="flex flex-col items-center mb-loader-logo-mb-large relative">
          {/* Glow ring behind logo */}
          <div 
            ref={glowRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-36 h-36 rounded-full bg-loader-glow-inner blur-xl" />
          </div>
          
          {/* Logo Container */}
          <div className="relative w-loader-logo-size h-loader-logo-size mb-loader-logo-mb bg-loader-logo-bg rounded-full shadow-md flex items-center justify-center ring-2 ring-foreground/10 shrink-0">
            <Image 
              src="/logo.png" 
              alt="Sababisha Solutions Logo" 
              fill
              unoptimized
              priority
              loading="eager"
              className="object-contain rounded-full p-loader-logo-padding relative z-10"
            />
          </div>
          
          <h1 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mb-2 font-medium">
            Sababisha Solutions
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-sans font-semibold mt-1">
            We Make It Happen
          </p>
        </div>

        {/* Decorative Line */}
        <div className="w-loader-divider-width h-loader-divider-height bg-loader-divider-bg mb-loader-divider-mb rounded-full" />

        {/* Loading Text / Counter */}
        <div className="flex justify-between w-full mb-3 text-[10px] tracking-[0.2em] uppercase font-sans font-medium">
          <span className="text-loader-text-accent">Initializing</span>
          <span ref={counterRef} className="font-mono text-foreground/80 tabular-nums">0%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-loader-track-height bg-loader-track-bg rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-full h-full bg-gradient-to-r from-accent/80 via-accent to-accent/80 origin-left rounded-full"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
