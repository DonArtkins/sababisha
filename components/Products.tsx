"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { Pagination } from "./Pagination";
import { BentoTilt } from "./BentoTilt";
import { OptimizedImage } from "./OptimizedImage";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { AnimatedLink } from "./AnimatedLink";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { id: 1, title: "Maziwa", category: "Loan Management System", desc: "Gateway to Accessible Microfinance Services.", features: ["Loan Management", "Client Tracking", "Financial Reporting"], image: "/images/img5.jpg", link: "https://maziwa.sababisha.com" },
  { id: 2, title: "Sheria Pro", category: "Law Firm Management System", desc: "The Ultimate Solution for Efficient Law Firm Management.", features: ["Case and Client Management", "Billing and Invoicing", "Graphical Analysis"], image: "/images/img6.jpg", link: "https://sheriapro.mcb.co.ke" },
  { id: 3, title: "BIMA", category: "Insurance Agency Management System", desc: "Efficient Insurance Agency Operations. Seamless Client Management, Policy Tracking, and Growth.", features: ["Policy Management", "Client Management", "Reporting Tools"], image: "/images/img1.jpg", link: "https://bima.sababisha.com" },
  { id: 4, title: "Microsoft Business Central", category: "ERP", desc: "An ERP that Empowers Your Business Evolution.", features: ["Financial Management", "Supply Chain Management", "Project Management"], image: "/images/img2.jpg", link: "https://sababisha.com" },
  { id: 5, title: "Members Self Service Portal (MSS)", category: "Portal", desc: "Empower Your Members. For Seamless Member Management.", features: ["Member Registration", "Self-Service Tools", "Communication Hub"], image: "/images/img3.jpg", link: "https://sababisha.com" },
  { id: 6, title: "TIBA", category: "Hospital Management System", desc: "Streamlined Hospital Operations. Manage Patients, Appointments, and Staff Efficiently.", features: ["Patient Management", "Appointment Scheduling", "Staff Management"], image: "/images/img4.jpg", link: "https://tiba.sababisha.com" },
  { id: 7, title: "Call Centre System", category: "Support", desc: "Enhance Customer Support Operations. Track Calls, Agents, and Performance Metrics.", features: ["Call Tracking", "Agent Management", "Performance Reporting"], image: "/images/img5.jpg", link: "https://sababisha.com" },
  { id: 8, title: "School ERP", category: "Education", desc: "Effortless School Management. Complete Educational Institution Solution.", features: ["Student Information System", "Timetable Management", "Parent Communication"], image: "/images/img6.jpg", link: "https://sababisha.com" },
  { id: 9, title: "Loyalty Portal", category: "Customer Engagement", desc: "Elevate Customer Engagement. Gateway to Rewarding Relationships.", features: ["Points System", "Customer Analytics", "Promotions Management"], image: "/images/img1.jpg", link: "https://sababisha.com" },
  { id: 10, title: "Check off System", category: "Finance", desc: "Efficiency Redefined. Ensures timely payment and reduces the risk of missed payments.", features: ["Payroll Integration", "Payment Scheduling", "Compliance Tracking"], image: "/images/img2.jpg", link: "https://sababisha.com" },
  { id: 11, title: "HR System", category: "Human Resources", desc: "HR Made Simple. Comprehensive Solution for Efficient Human Resource Management.", features: ["Employee Management", "Payroll Processing", "Recruitment Tools"], image: "/images/img3.jpg", link: "https://sababisha.com" },
  { id: 12, title: "Fleet Management", category: "Logistics", desc: "Optimize Your Fleet. Complete Solution for Efficient Vehicle Tracking and Maintenance.", features: ["Real-Time Tracking", "Maintenance Scheduling", "Fuel Management"], image: "/images/img4.jpg", link: "https://sababisha.com" },
  { id: 13, title: "M-Kodi", category: "Property Management System", desc: "All-in-One Solution for Streamlined Property Management.", features: ["Tenant Management", "Maintenance Requests", "Financial Reporting"], image: "/images/img5.jpg", link: "https://sababisha.com" },
  { id: 14, title: "Chama Management System (E-Ledger)", category: "Finance", desc: "Digital Solution for Effortless Chama Administration and Financial Tracking.", features: ["Contribution Tracking", "Loan Management", "Financial Reporting"], image: "/images/img6.jpg", link: "https://sababisha.com" },
  { id: 15, title: "Accounting Software", category: "Accounting", desc: "Efficient Petty Cash Management. Streamline Your Accounting with our Comprehensive Solution.", features: ["Expense Tracking", "Financial Reporting", "Budget Management"], image: "/images/img1.jpg", link: "https://sababisha.com" },
  { id: 16, title: "Credit Scoring Tool (Pesa Score)", category: "Finance", desc: "Trustworthy Credit Scoring Tool for Informed Lending.", features: ["Risk Assessment", "Automated Scoring", "Reporting Tools"], image: "/images/img2.jpg", link: "https://sababisha.com" },
  { id: 17, title: "Architectural Firm Management Solution", category: "Management", desc: "Comprehensive Firm Management Solution for Seamless Operations and Project Success.", features: ["Project Management", "Resource Allocation", "Client Management"], image: "/images/img3.jpg", link: "https://sababisha.com" },
  { id: 18, title: "MCB Payment Hub", category: "Enterprise Service Bus", desc: "Enterprise Service Bus for Seamless Integration of Payment Channels, from MPesa to Banks, Visas/MasterCard, and Beyond.", features: ["Payment Gateway Integration", "Transaction Monitoring", "Security Features"], image: "/images/img4.jpg", link: "https://sababisha.com" },
];

export function Products({ variant = "home" }: { variant?: "home" | "page" }) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
          <p className="text-muted font-sans text-lg">
            {variant === "home" ? "Our Core Products Include" : "Explore our full suite of products"}
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
                    <AnimatedLink
                      href={product.link}
                      className="inline-flex items-center gap-1.5 font-sans text-xs md:text-sm font-semibold text-foreground hover:text-accent transition-colors interactive cursor-none"
                      icon={<ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                    >
                      Explore Product
                    </AnimatedLink>
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
    </section>
  );
}
