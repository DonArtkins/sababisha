"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { CyberText } from "./CyberText";

gsap.registerPlugin(ScrollTrigger);

import { OptimizedImage } from "./OptimizedImage";

const TABS = [
  {
    id: "About Us",
    title: "About Us",
    heading: (
      <>
        Transforming <span className="italic text-[#FF5A36] relative inline-block">
          Ideas<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span> <br />
        into digital solutions.
      </>
    ),
    description: (
      <div className="space-y-4">
        <p>We are a premier innovative technology firm based in Nairobi, Kenya. We specialize in fintech solutions, expert consultancy, and custom Enterprise level software development.</p>
        <p>Our team is dedicated to transforming innovative ideas into powerful digital solutions tailored to your business needs.</p>
        <p>Partner with us to drive growth and achieve your digital transformation goals.</p>
      </div>
    ),
    image: "/images/img5.jpg",
  },
  {
    id: "Our Mission",
    title: "Our Mission",
    heading: (
      <>
        Empowering <span className="italic text-[#FF5A36] relative inline-block">
          Businesses<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span> <br />
        Through Innovation.
      </>
    ),
    description: (
      <div className="space-y-4">
        <p>Innovation is the cornerstone of our approach. We strive to revolutionize the way businesses operate by harnessing cutting-edge technologies and creative solutions. Our goal is to empower businesses to thrive in a dynamic and competitive landscape.</p>
        <p>We are dedicated to being your trusted partner, delivering top-notch services and expertise tailored to meet the unique needs of each client.</p>
        <p>Our commitment to excellence and passion for technology fuels our efforts to help you navigate the ever-evolving digital landscape with confidence. We believe in the power of innovation to drive progress and transform industries. By staying ahead of the curve and embracing change, we enable businesses to seize new opportunities and achieve sustainable growth.</p>
      </div>
    ),
    image: "/images/img1.jpg",
  },
  {
    id: "Our Vision",
    title: "Our Vision",
    heading: (
      <>
        Driving <span className="italic text-[#FF5A36] relative inline-block">
          Digital<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span> <br />
        Evolution.
      </>
    ),
    description: (
      <div className="space-y-4">
        <p>To innovation, reliability, and client success. We strive to create a future where businesses of all sizes can harness the power of technology to achieve their goals and realize their full potential.</p>
        <p>By continuously pushing the boundaries of what's possible, we aim to set new standards in the IT industry and be the go-to ally for companies seeking to thrive in the digital age.</p>
      </div>
    ),
    image: "/images/img3.jpg",
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left col content
      gsap.fromTo(
        leftColRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );

      // Image Parallax & Reveal (Removed blur filter for performance lag fix)
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "+=50%",
            scrub: 1,
          },
        }
      );

      // Floating cards
      gsap.fromTo(
        ".about-float",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-transparent min-h-screen flex items-center" style={{ willChange: "transform" }}>
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column */}
        <div ref={leftColRef} className="flex flex-col items-start text-left">
          
          <div className="flex items-center gap-2 mb-8 bg-white rounded-full p-1.5 shadow-sm border border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full font-sans text-sm font-semibold transition-all interactive cursor-none group ${
                  activeTab === tab.id
                    ? "bg-[#111111] text-white shadow-md"
                    : "text-gray-500 hover:text-[#111111] hover:bg-gray-100"
                }`}
              >
                <CyberText text={tab.title} speed={30} />
              </button>
            ))}
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#111111] leading-[1.05] tracking-tight mb-8 min-h-[160px]">
            {currentTab.heading}
          </h2>
          <div className="text-gray-600 font-sans text-base md:text-lg leading-relaxed mb-10 max-w-lg min-h-[100px]">
            {currentTab.description}
          </div>
          
          <div className="flex items-center gap-8 border-t border-gray-200 pt-8 w-full">
            <div>
              <p className="font-display text-4xl text-[#111111] mb-1">50x</p>
              <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-widest">Faster Integration</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <p className="font-display text-4xl text-[#111111] mb-1">99.9%</p>
              <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-widest">System Uptime</p>
            </div>
          </div>
        </div>

        {/* Right Column - Image Portal */}
        <div ref={rightColRef} className="relative h-[600px] md:h-[750px] w-full rounded-[3rem] overflow-hidden bg-[#111111] shadow-2xl interactive cursor-none group">
          <OptimizedImage
            key={currentTab.id} // Re-render image to re-trigger internal browser transition if needed, though state update does it
            ref={imageRef}
            src={currentTab.image} 
            alt="Sababisha Team" 
            wrapperClassName="absolute inset-0 w-full h-full"
            imageClassName="w-full h-full object-cover origin-center opacity-80 mix-blend-luminosity"
            style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row gap-4 justify-between items-end">
            <h3 className="font-display text-4xl text-white about-float">We innovate <br/> you grow.</h3>
            <div className="about-float">
              <Button variant="secondary" size="md" href="/en/team">
                Meet the Team
              </Button>
            </div>
          </div>

          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center about-float">
             <div className="text-center">
               <p className="font-display text-2xl text-white">#1</p>
               <p className="font-sans text-[10px] text-gray-300 uppercase tracking-wider">in Fintech</p>
             </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
