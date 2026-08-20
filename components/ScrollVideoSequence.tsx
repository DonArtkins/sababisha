"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollVideoSequence() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let tl: gsap.core.Timeline;

    const setupScroll = () => {
      if (isNaN(video.duration)) return;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%", // Slightly shorter distance
          scrub: 1, // Faster scrub, less delay for better performance
          pin: true,
        }
      });

      // Scrub video time from 0 to duration
      tl.fromTo(video, 
        { currentTime: 0 }, 
        { currentTime: video.duration, duration: 1, ease: "none" },
        0
      );

      // Frame 1: Coding / Designing
      tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.3);

      // Frame 2: Building / Integration
      tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.4)
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.6);

      // Frame 3: Deployment / Success
      tl.fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7)
        .to(text3Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.9);
    };

    if (video.readyState >= 2) {
      setupScroll();
    } else {
      video.addEventListener("loadedmetadata", setupScroll);
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupScroll);
      if (tl) tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#111111] overflow-hidden" style={{ willChange: 'transform' }}>
      {/* We use a video depicting a DNA strand / software architecture lifecycle as requested */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="https://cdn.coverr.co/videos/coverr-typing-on-a-macbook-pro-5452/1080p.mp4"
        muted
        playsInline
        preload="auto"
        style={{ willChange: 'transform' }} // Optimization
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#EFEFEF] via-transparent to-[#EFEFEF] opacity-90 pointer-events-none"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        <div ref={text1Ref} className="absolute text-center opacity-0 text-[#111111] flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-8 border border-gray-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF5A36]">
               <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tight">Architect & Build</h2>
          <p className="font-sans text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">We design secure software architecture, data models, user workflows, and scalable engineering foundations that turn complex business requirements into dependable digital products.</p>
        </div>

        <div ref={text2Ref} className="absolute text-center opacity-0 text-[#111111] flex flex-col items-center">
           <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-8 border border-gray-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF5A36]">
               <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tight">Seamless Integration</h2>
          <p className="font-sans text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">We connect APIs, payment channels, ERPs, CRMs, reporting tools, and business logic so information moves accurately across the systems your teams already use.</p>
        </div>

        <div ref={text3Ref} className="absolute text-center opacity-0 text-[#111111] flex flex-col items-center">
           <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-8 border border-gray-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF5A36]">
               <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tight">Deploy to Scale</h2>
          <p className="font-sans text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">We launch tested, monitored, and support-ready platforms that can serve customers, staff, partners, and decision-makers with speed, stability, and confidence.</p>
        </div>

      </div>
    </section>
  );
}
