"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Player } from "@lottiefiles/react-lottie-player";

export function PreLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we've already loaded in this session to prevent annoyance
    // But since user requested "on refresh we see it", we will run it on every mount/refresh.
    
    // Lock scroll
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }
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
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#111111] text-[#EFEFEF]"
    >
      <div ref={wrapperRef} className="flex flex-col items-center w-full max-w-sm px-6">
        
        {/* Branding & Logo */}
        <div className="flex flex-col items-center mb-12">
          {/* We reuse the gradient sphere concept from the main logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-700 via-purple-600 to-orange-500 mb-6 animate-pulse" />
          
          <h1 className="font-serif text-3xl tracking-tight mb-2 text-white">
            Sababisha Solutions
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-[#EFEFEF]/50">
            We make it happen
          </p>
        </div>

        {/* Loading Text / Counter */}
        <div className="flex justify-between w-full mb-4 text-xs tracking-widest uppercase text-[#EFEFEF]/70">
          <span>Initializing</span>
          <span ref={counterRef} className="font-mono text-white">0%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[1px] bg-white/10 overflow-hidden">
          <div 
            ref={progressRef}
            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
