"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { Pagination } from "./Pagination";
import { BentoTilt } from "./BentoTilt";
import { OptimizedImage } from "./OptimizedImage";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { AnimatedLink } from "./AnimatedLink";
import { LiveSiteUnavailableModal } from "./LiveSiteUnavailableModal";
import { PRODUCTS } from "@/lib/db";

gsap.registerPlugin(ScrollTrigger);

export function Products({ variant = "home" }: { variant?: "home" | "page" }) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [unavailableItem, setUnavailableItem] = useState<string | null>(null);

  const ITEMS_PER_PAGE = variant === "home" ? 4 : 6;
  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = PRODUCTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentPage, variant]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-4">
            {variant === "home" ? (
              <>
                Our <span className="text-accent relative inline-block">
                  Core<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span> Products
              </>
            ) : (
              <>
                <span className="text-accent relative inline-block">
                  All<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span> Products
              </>
            )}
          </h2>
          <p className="max-w-3xl text-muted font-sans text-base leading-relaxed sm:text-lg">
            {variant === "home"
              ? "Explore Sababisha Solutions products built for Kenyan and African organizations that need reliable loan management, insurance operations, healthcare systems, ERP workflows, payment integrations, member portals, customer engagement, and data-driven financial tools."
              : "Browse our full suite of fintech, enterprise, healthcare, education, property, HR, logistics, accounting, and customer engagement platforms. Each product is designed to simplify operations, strengthen reporting, improve compliance, reduce manual work, and help teams scale with confidence."}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative min-h-[400px]">
          {currentProducts.map((product) => (
            <BentoTilt key={product.id} className="product-item h-full">
              <div className="group relative h-full min-h-[360px] md:min-h-[400px] rounded-3xl bg-card border border-border overflow-hidden interactive cursor-none hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-3 md:p-4">
                {/* Background Image Area */}
                <div className="absolute inset-0 z-0 bg-background">
                  <OptimizedImage
                    src={product.image}
                    alt={product.title}
                    wrapperClassName="absolute inset-0 w-full h-full"
                    imageClassName="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Base subtle gradient to ensure the image isn't totally flat when not hovered */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none transition-opacity duration-700" />
                </div>
                
                {/* Space above glass panel to ensure image visibility */}
                <div className="flex-grow min-h-[80px] md:min-h-[120px]"></div>
                
                {/* Content in a Glass Panel */}
                <div className="relative z-10 flex flex-col bg-card/90 dark:bg-card/85 backdrop-blur-xl border border-border/50 rounded-2xl p-5 md:p-6 shadow-lg transform transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="text-accent font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold mb-2 block">
                    {product.category}
                  </span>
                  <h3 className="text-foreground font-display text-2xl md:text-3xl mb-2 leading-tight">{product.title}</h3>
                  <p className="text-muted font-sans text-xs md:text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                    {product.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-5">
                    {product.features.map((feature, i) => (
                      <span key={i} className="px-2.5 py-1 bg-foreground/5 border border-foreground/10 rounded-full text-[10px] md:text-xs font-sans text-foreground font-medium shadow-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div>
                    {product.link ? (
                      <AnimatedLink
                        href={product.link}
                        className="inline-flex items-center gap-1.5 font-sans text-xs md:text-sm font-semibold text-foreground hover:text-accent transition-colors interactive cursor-none"
                        icon={<ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      >
                        Explore Product
                      </AnimatedLink>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUnavailableItem(product.title)}
                        className="inline-flex items-center gap-1.5 font-sans text-xs md:text-sm font-semibold text-foreground hover:text-accent transition-colors interactive cursor-none"
                      >
                        Explore Product
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>

        {variant === "page" && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}

        {variant === "home" && (
          <div className="mt-16 text-center">
            <Button variant="primary" href="/en/products">View All Products</Button>
          </div>
        )}
      </div>

      <LiveSiteUnavailableModal
        open={Boolean(unavailableItem)}
        itemName={unavailableItem || undefined}
        onClose={() => setUnavailableItem(null)}
      />
    </section>
  );
}
