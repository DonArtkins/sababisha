"use client";
import Image from "next/image";

export function Loading() {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-loader-glow blur-[100px] pointer-events-none" />
      
      {/* Logo Container */}
      <div className="relative w-loader-logo-size-small h-loader-logo-size-small mb-loader-logo-mb-large bg-loader-logo-bg rounded-full shadow-md flex items-center justify-center ring-2 ring-foreground/10 shrink-0">
        <Image 
          src="/logo.png" 
          alt="Sababisha Solutions Logo" 
          fill
          unoptimized
          priority
          className="object-contain rounded-full p-loader-logo-padding-small relative z-10"
        />
      </div>

      {/* Spinner */}
      <div className="relative w-loader-spinner-size h-loader-spinner-size mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-loader-track-bg" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
      </div>
      
      {/* Brand text */}
      <p className="text-[10px] uppercase tracking-[0.3em] text-loader-text-accent font-sans font-medium">
        Loading
      </p>
    </div>
  );
}
