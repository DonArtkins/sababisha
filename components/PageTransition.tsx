"use client";
import { useEffect, useRef } from "react";

import { usePathname } from 'next/navigation';
import gsap from "gsap";

let capturedOldPage: { html: string; scrollY: number } | null = null;
let isFirstLoad = true;

const captureCurrentPage = () => {
  const mainContent = document.getElementById("main-content-inner");
  if (mainContent) {
    capturedOldPage = {
      html: mainContent.innerHTML,
      scrollY: window.scrollY,
    };
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("click", (e) => {
    const link = (e.target as Element).closest("a");
    // Ensure it's a relative link that will trigger a React Router navigation
    if (link && link.getAttribute("href")?.startsWith("/")) {
      captureCurrentPage();
    }
  }, true);
  
  window.addEventListener("popstate", () => {
    captureCurrentPage();
  });
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const ghostContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip animation on the very first render, let the PreLoader handle initial entry
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }

    if (!ghostContainerRef.current || !capturedOldPage || !contentRef.current || !overlayRef.current) {
      return;
    }

    const oldData = capturedOldPage;
    capturedOldPage = null; 

    const ctx = gsap.context(() => {
      // Setup the old page DOM so it stays visually frozen on screen
      const oldWrapperStyle = `position: absolute; top: 0; left: 0; width: 100vw; height: max-content; transform: translateY(-${oldData.scrollY}px); background-color: #EFEFEF; pointer-events: none; z-index: 10;`;
      if (ghostContainerRef.current) {
        ghostContainerRef.current.innerHTML = `<div style="${oldWrapperStyle}">${oldData.html}</div>`;
      }

      // We have the new content rendered underneath, let's prep it for an entrance animation
      gsap.set(contentRef.current, { opacity: 0, scale: 0.98, y: 20 });
      
      // Set the overlay to be ready below the screen
      gsap.set(overlayRef.current, { yPercent: 100, display: "block" });

      const tl = gsap.timeline({
        onComplete: () => {
          // Clear everything after transition finishes
          if (ghostContainerRef.current) ghostContainerRef.current.innerHTML = "";
          gsap.set(overlayRef.current, { display: "none" });
        }
      });

      // 1. Overlay sweeps UP to cover the screen
      tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "expo.inOut",
      })
      // 2. Hide the old page instantly now that it's covered
      .set(ghostContainerRef.current, { innerHTML: "" })
      // 3. Overlay sweeps UP to reveal the new page
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      })
      // 4. New page scales up and fades in smoothly underneath the revealing overlay
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6"); // Start slightly before the overlay finishes leaving

    });

    return () => ctx.revert();
  }, [(pathname || "")]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* The Real New Page */}
      <div id="main-content-inner" ref={contentRef} className="w-full min-h-screen">
        {children}
      </div>

      {/* Ghost Container (Holds the frozen old page) */}
      <div ref={ghostContainerRef} className="fixed inset-0 z-40 pointer-events-none" />

      {/* The Sweep Overlay (The "Curtain") */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-[#111111] hidden pointer-events-none"
      >
        {/* Optional: Add a sleek brand text or logo in the middle of the sweep */}
        <div className="absolute inset-0 flex items-center justify-center text-[#EFEFEF]">
          <span className="font-serif text-3xl italic opacity-50 tracking-wider">Sababisha Solutions Limited</span>
        </div>
      </div>
    </div>
  );
}
