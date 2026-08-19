"use client";

import { useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { PreLoader } from "@/components/PreLoader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll to top immediately on route change
    window.scrollTo(0, 0);

    // Focus management on route change
    if (mainRef.current) {
      mainRef.current.focus();
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [pathname]);

  return (
    <div className="bg-[#EFEFEF] min-h-screen text-[#111111] font-sans flex flex-col">
      <PreLoader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-grow outline-none">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
