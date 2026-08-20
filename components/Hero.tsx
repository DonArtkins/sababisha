"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Pause, Star, Check } from "lucide-react";
import { CyberText } from "./CyberText";
import { Button } from "./Button";
import { AnimatedLink } from "./AnimatedLink";

import { OptimizedImage } from "./OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

function WritingText({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === word) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const delay = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setCurrentText(prev => 
          isDeleting 
            ? word.substring(0, prev.length - 1)
            : word.substring(0, prev.length + 1)
        );
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b);

  return (
    <span className="relative inline-block text-accent">
      <span className="invisible whitespace-pre">{longestWord}</span>
      <span className="absolute left-0 top-0 whitespace-pre">
        {currentText}
        <span className="w-[2px] h-[1em] bg-accent inline-block align-middle ml-[1px] animate-[pulse_1s_infinite]"></span>
      </span>
    </span>
  );
}

const SLIDES = [
  {
    image: "/images/hero-banner/maziwa.png",
    title: "Maziwa Platform",
  },
  {
    image: "/images/hero-banner/sheria-pro.png",
    title: "Sheria Pro",
  },
  {
    image: "/images/hero-banner/tiba.png",
    title: "TIBA Health",
  },
  {
    image: "/images/hero-banner/core-services.png",
    title: "Core Services",
  },
  {
    image: "/images/hero-banner/product-view.png",
    title: "Product View",
  },
  {
    image: "/images/hero-banner/contact-us.png",
    title: "Contact Us",
  },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftContentRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // Right content animation
      gsap.fromTo(
        rightContentRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
      );

      // Floating elements animation
      gsap.to(".floating-card", {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 max-w-[1400px] mx-auto overflow-hidden bg-transparent">
      
      {/* Left Content */}
      <div ref={leftContentRef} className="w-full lg:w-[45%] flex flex-col items-start z-10 pt-10 md:pt-20">
        
        {/* Top Badge */}
        <div className="flex items-center gap-4 mb-8 interactive cursor-none">
          <div className="flex -space-x-3 shrink-0">
            <OptimizedImage src="/images/img4.jpg" alt="Client 1" wrapperClassName="w-10 h-10 rounded-full border-2 border-white shadow-sm z-30" imageClassName="w-full h-full object-cover rounded-full" />
            <OptimizedImage src="/images/img2.jpg" alt="Client 2" wrapperClassName="w-10 h-10 rounded-full border-2 border-white shadow-sm z-20" imageClassName="w-full h-full object-cover rounded-full" />
            <OptimizedImage src="/images/img4.jpg" alt="Client 3" wrapperClassName="w-10 h-10 rounded-full border-2 border-white shadow-sm z-10" imageClassName="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <p className="font-sans font-bold text-sm text-[#111111]">100+ Enterprise Clients</p>
            <p className="font-sans text-xs text-gray-500">Read Our <AnimatedLink href="#testimonials" className="font-semibold text-[#111111] underline underline-offset-2 hover:text-accent transition-colors interactive cursor-none">Success Stories</AnimatedLink></p>
          </div>
        </div>

        {/* Huge Title (Serif) */}
        <h1 className="font-display text-[5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.9] text-accent mb-8 tracking-tighter">
          Sababisha<span className="font-sans text-[3rem] md:text-[4rem] font-light align-top ml-1 -mt-4 inline-block">+</span>
        </h1>

        {/* Description */}
        <p className="font-sans text-lg md:text-xl text-gray-600 font-medium max-w-[420px] mb-10 leading-relaxed border-b border-gray-200 pb-8">
          Build secure fintech platforms, enterprise software, AI-ready workflows, and integrations for your <WritingText words={["BUSINESS", "AGENCY", "STARTUP", "SAAS"]} /> - designed for faster launches, cleaner data, and measurable growth.
        </p>

        {/* Small Review Block */}
        <div className="flex items-center gap-4 mb-10">
          <OptimizedImage src="/images/img2.jpg" alt="User" wrapperClassName="w-12 h-12 rounded-full shrink-0 shadow-sm border-2 border-white" imageClassName="w-full h-full object-cover rounded-full" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-sans text-sm font-medium text-[#111111]">Loved the performance</p>
              <span className="text-gray-600">/</span>
              <div className="flex items-center text-[#111111]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-sans text-sm font-bold ml-1">4.9</span>
              </div>
            </div>
            <p className="font-sans text-xs text-gray-500 font-medium mt-0.5">100% Satisfied</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-8">
          <Button variant="primary" size="md" href="/en/services">
            Start Project — It's Free
          </Button>
          <AnimatedLink href="/en/products" className="font-sans text-sm font-semibold text-[#111111] hover:text-[#FF5A36]" icon={<ArrowRight className="w-4 h-4" />}>
            Our Products
          </AnimatedLink>
        </div>

      </div>

      {/* Right Content - Visuals */}
      <div ref={rightContentRef} className="w-full lg:w-[55%] relative h-[600px] md:h-[700px] flex items-center justify-center mt-12 lg:mt-0">
        
        {/* Large Rounded Orange Container */}
        <div className="absolute right-0 w-[85%] md:w-[65%] h-[90%] bg-[#FF5A36] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
          {SLIDES.map((slide, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <OptimizedImage 
                src={slide.image} 
                alt={slide.title} 
                wrapperClassName="w-full h-full"
                imageClassName="w-full h-full object-cover object-center mix-blend-luminosity opacity-80"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A36]/60 to-transparent mix-blend-multiply"></div>
              <div className="absolute top-8 left-8 z-20">
                <div className="bg-white/95 backdrop-blur-md border border-white px-5 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                  <p className="text-[#111111] font-sans text-sm font-semibold uppercase tracking-wider">{slide.title}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Play Button — centered in banner */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl interactive cursor-none hover:scale-110 transition-transform z-30"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-[#111111]" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-[#111111] ml-1" fill="currentColor" />
            )}
          </button>
        </div>

        {/* Floating Chat Bubbles */}
        <div className="absolute top-[35%] left-[-20px] md:left-0 z-30 flex flex-col gap-3 floating-card">
          <div className="bg-white px-5 py-3 rounded-full rounded-tl-md shadow-lg flex items-center gap-3 w-max">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-blue-600">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans text-sm font-bold text-[#111111]">Simplify</span>
          </div>
          <div className="bg-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3 ml-6 w-max">
            <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center text-emerald-600">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans text-sm font-bold text-[#111111]">Secure</span>
          </div>
          <div className="bg-white px-5 py-3 rounded-full rounded-bl-md shadow-lg flex items-center gap-3 ml-12 w-max">
            <div className="w-5 h-5 bg-[#FF5A36]/20 rounded flex items-center justify-center text-[#FF5A36]">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans text-sm font-bold text-[#111111]">Succeed</span>
          </div>
        </div>

        {/* Top Right Glass Card */}
        <div className="absolute top-12 right-[-20px] bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] w-48 z-20 floating-card" style={{ animationDelay: '1s' }}>
          <p className="font-sans text-[10px] font-bold tracking-wider text-gray-700 uppercase mb-2">— UP TO</p>
          <p className="font-display text-6xl text-[#111111] leading-none mb-3">50x</p>
          <p className="font-sans text-xs text-gray-800 font-medium leading-relaxed">Faster integrations</p>
        </div>

        {/* Bottom Right Glass Card */}
        <div className="absolute bottom-16 right-4 md:right-10 bg-white/30 backdrop-blur-xl border border-white/50 p-5 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] w-[280px] flex items-center gap-4 z-20 floating-card" style={{ animationDelay: '0.5s' }}>
          <div className="w-24 h-24 bg-white rounded-2xl p-2 shrink-0 overflow-hidden shadow-sm">
            <OptimizedImage src="/images/projects/maziwa-bg.png" alt="Maziwa Platform" wrapperClassName="w-full h-full rounded-xl" imageClassName="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-sm font-medium text-[#111111] leading-tight mb-2">Maziwa Platform</p>
            <div className="flex items-center gap-1 bg-white rounded-full px-2.5 py-1 w-fit shadow-sm">
              <Star className="w-3 h-3 text-[#111111] fill-current" />
              <span className="font-sans text-[10px] font-bold text-[#111111]">4.6</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
