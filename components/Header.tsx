"use client";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ChevronDown } from "lucide-react";
import { CyberText } from "./CyberText";
import { AnimatedLink } from "./AnimatedLink";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE_LINKS = [
  { name: 'Projects', path: '/en/explore/projects', tag: 'Work' },
  { name: 'R&D Blogs', path: '/en/explore/rd-blogs', tag: 'Insights' },
  { name: 'AI Topics', path: '/en/explore/ai-topics', tag: 'Future' },
  { name: 'Careers', path: '/en/explore/careers', tag: 'Join Us' },
];

function ExploreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const isActive = (pathname || "").includes('/explore');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.fromTo(menuItemsRef.current, 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1, overwrite: true }
      );
    } else {
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button className={`flex items-center gap-1 transition-colors interactive cursor-none outline-none font-semibold ${isActive ? 'text-[#FF5A36]' : 'text-[#111111] hover:text-[#FF5A36]'}`}>
        <CyberText text="Explore" speed={40} />
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        {isActive && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF5A36] rounded-full"></span>
        )}
      </button>

      <div 
        ref={dropdownRef}
        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 invisible opacity-0 translate-y-2 z-[60]"
      >
        <div className="bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-2">
          <div className="flex flex-col gap-1">
            {EXPLORE_LINKS.map((link, idx) => {
              const isLinkActive = (pathname || "") === link.path;
              return (
                <Link 
                  key={link.path}
                  href={link.path}
                  ref={el => { menuItemsRef.current[idx] = el; }}
                  className={`group flex items-center justify-between px-4 py-3 text-sm rounded-xl interactive cursor-none outline-none transition-all ${isLinkActive ? 'bg-orange-50 text-[#FF5A36]' : 'text-gray-700 hover:text-[#FF5A36] hover:bg-gray-50'}`}
                  onClick={() => setIsOpen(false)}
                >
                   <span className="font-semibold"><CyberText text={link.name} speed={30} /></span>
                   <span className={`text-[10px] uppercase tracking-wider transition-colors ${isLinkActive ? 'text-[#FF5A36]' : 'text-gray-400 group-hover:text-[#FF5A36]'}`}>{link.tag}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const TopLevelLink = ({ href, children }: { href: string, children: string }) => {
  const pathname = usePathname();
  const isActive = (pathname || "").startsWith(href);
  
  return (
    <div className="relative">
      <AnimatedLink href={href} className={isActive ? 'text-[#FF5A36]' : 'text-[#111111] hover:text-[#FF5A36]'}>
        {children}
      </AnimatedLink>
      {isActive && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF5A36] rounded-full"></span>
      )}
    </div>
  );
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [(pathname || "")]);

  useEffect(() => {
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else if (self.direction === 1 && self.scroll() > 50) {
          showAnim.reverse();
        }
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.inOut"
      });
      gsap.fromTo(".menu-link", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut"
      });
    }
  }, [isOpen]);

  return (
    <>
      <Link href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 z-[100] bg-[#111111] text-white px-6 py-3 rounded-full font-sans font-bold text-sm shadow-xl outline-none ring-2 ring-[#FF5A36] ring-offset-2 ring-offset-[#EFEFEF]">
        Skip to content
      </Link>
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 p-4 md:px-12 md:py-4 flex justify-between items-center text-[#111111] bg-white/60 backdrop-blur-xl border-b border-gray-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all">
        <Link href="/en" className="flex items-center gap-3 font-display font-bold tracking-tight cursor-none interactive">
          <div className="relative w-14 h-14 bg-loader-logo-bg rounded-full shadow-md flex items-center justify-center ring-2 ring-foreground/10 shrink-0">
            <Image 
              src="/logo.png" 
              alt="Sababisha Solutions Logo" 
              fill
              unoptimized
              priority
              className="object-contain rounded-full p-1 relative z-10"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[#111111] text-xl md:text-2xl leading-none font-bold">Sababisha Solutions</span>
            <span className="text-[9px] md:text-[10px] font-sans font-semibold tracking-widest text-accent uppercase mt-1">We make it happen</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-sans text-sm font-semibold">
          <TopLevelLink href="/en/services">Services</TopLevelLink>
          <span className="w-1 h-1 bg-[#111111] dark:bg-foreground/40 rounded-full"></span>
          
          <TopLevelLink href="/en/products">Products</TopLevelLink>
          <span className="w-1 h-1 bg-[#111111] dark:bg-foreground/40 rounded-full"></span>
          <ExploreDropdown />
          
          <span className="w-1 h-1 bg-[#111111] dark:bg-foreground/40 rounded-full"></span>
          <TopLevelLink href="/en/team">Team</TopLevelLink>

          <span className="w-1 h-1 bg-[#111111] dark:bg-foreground/40 rounded-full"></span>
          <TopLevelLink href="/en/gallery">Gallery</TopLevelLink>
          
          <span className="w-1 h-1 bg-[#111111] dark:bg-foreground/40 rounded-full"></span>
          <TopLevelLink href="/en/faq">FAQ</TopLevelLink>
        </nav>
        
        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button variant="outline" size="sm" href="/en/contact">
              Contact Us
            </Button>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-[#111111] flex items-center gap-2 cursor-none interactive hover:opacity-70 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Portal */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#EFEFEF] dark:bg-background z-[100] transform -translate-y-full opacity-0 flex flex-col justify-center px-6 md:px-32 py-12"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 md:top-12 md:right-16 text-[#111111] dark:text-[#f0f0f0] flex items-center gap-2 uppercase text-xs tracking-widest font-sans font-semibold interactive cursor-none hover:opacity-70 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Scrollable Nav Container */}
        <div className="w-full max-h-[75vh] overflow-y-auto pr-2 flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-3 md:gap-5 font-display font-bold text-3xl md:text-6xl tracking-tighter">
            <div className="menu-link w-fit">
              <AnimatedLink href="/en" className="text-[#111111] dark:text-foreground hover:text-[#FF5A36]">Home</AnimatedLink>
            </div>
            <div className="menu-link w-fit">
              <AnimatedLink href="/en/services" className="text-[#111111] dark:text-foreground hover:text-[#FF5A36]">Services</AnimatedLink>
            </div>
            <div className="menu-link w-fit">
              <AnimatedLink href="/en/products" className="text-[#111111] dark:text-foreground hover:text-[#FF5A36]">Products</AnimatedLink>
            </div>
            
            {/* Explore Submenu */}
            <div className="menu-link flex flex-col gap-2 mt-1">
              <span className="text-[#111111] dark:text-foreground/60 text-xs uppercase tracking-[0.2em] font-sans font-semibold opacity-60">Explore</span>
              <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#FF5A36]">
                {EXPLORE_LINKS.map((link) => (
                  <Link 
                    key={link.path} 
                    href={link.path} 
                    className="font-sans text-lg text-[#111111] dark:text-foreground hover:text-[#FF5A36] font-semibold flex items-center gap-2 transition-colors interactive cursor-none"
                  >
                    <CyberText text={link.name} speed={30} />
                    <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FF5A36]/10 text-[#FF5A36] font-bold">{link.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="menu-link w-fit">
              <AnimatedLink href="/en/team" className="text-[#111111] dark:text-foreground hover:text-[#FF5A36]">Team</AnimatedLink>
            </div>
            <div className="menu-link w-fit">
              <AnimatedLink href="/en/gallery" className="text-[#111111] dark:text-foreground hover:text-[#FF5A36]">Gallery</AnimatedLink>
            </div>
            <div className="menu-link w-fit">
              <AnimatedLink href="/en/faq" className="text-[#111111] dark:text-foreground hover:text-[#FF5A36]">FAQ</AnimatedLink>
            </div>
          </nav>

          {/* Theme Toggler and Contact Us Button inside Mobile Menu */}
          <div className="menu-link pt-6 border-t border-[#111111]/10 dark:border-white/10 flex items-center gap-6">
            <ThemeToggle />
            <Button variant="outline" size="sm" href="/en/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
