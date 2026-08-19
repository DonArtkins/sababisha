
"use client";
import dynamic from 'next/dynamic';
import { AnimatedLink } from "@/components/AnimatedLink";
import { ArrowRight } from "lucide-react";

// Dynamically import Lottie Player to prevent SSR issues (document is not defined)
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

export function NotFound() {
  return (
    <main className="min-h-screen bg-[#EFEFEF] flex flex-col items-center justify-center pt-20 px-6">
      <div className="w-full max-w-md mx-auto mb-8">
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/packages/lf20_kcsr6fcp.json"
          style={{ height: '300px', width: '100%' }}
        />
      </div>
      
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-5xl text-[#111111] leading-tight mb-4 tracking-tight">
          Oops! Page Not Found.
        </h1>
        <p className="font-sans text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <AnimatedLink href="/en" className="font-sans text-sm font-semibold text-[#111111] hover:text-[#FF5A36] inline-flex items-center justify-center gap-2" icon={<ArrowRight className="w-4 h-4" />}>
          Back to Home
        </AnimatedLink>
      </div>
    </main>
  );
}

export default NotFound;
