"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly move the dot
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
    };

    // Smoothly follow the cursor
    const followCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });
      requestAnimationFrame(followCursor);
    };

    followCursor();

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
        gsap.to(cursor, { 
          scale: 3, 
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.5)",
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else if (target.tagName.toLowerCase() === "p" || target.tagName.toLowerCase().match(/^h[1-6]$/)) {
         gsap.to(cursor, { 
            scale: 1.5,
            borderColor: "rgba(90, 103, 216, 0.8)", // Accent color
            duration: 0.3,
            ease: "power2.out"
         });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.tagName.toLowerCase() === "p" || 
        target.tagName.toLowerCase().match(/^h[1-6]$/)
      ) {
        setIsHovering(false);
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.3)", 
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9999] -ml-4 -mt-4 hidden md:flex items-center justify-center transition-colors mix-blend-difference"
      >
        {isHovering && hoverText && (
          <span className="text-[6px] font-sans font-bold text-[#111111] uppercase tracking-widest">{hoverText}</span>
        )}
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -ml-[3px] -mt-[3px] hidden md:block mix-blend-difference"
      />
    </>
  );
}
