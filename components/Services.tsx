"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Wallet, Lightbulb, Server, LineChart, Code, LifeBuoy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Innovative Fintech Solutions",
    category: "FINTECH",
    icon: <Wallet className="w-5 h-5 text-accent" />,
    desc: "Secure and scalable finance platforms that accelerate transactions, compliance, and trust.",
    points: ["Digital onboarding and payment workflows", "Security-first transaction architecture", "Regulatory-ready reporting integration"]
  },
  {
    title: "Expert Consultancy",
    category: "ADVISORY",
    icon: <Lightbulb className="w-5 h-5 text-accent" />,
    desc: "Technology advisory that aligns digital investments with measurable business outcomes.",
    points: ["Roadmap and architecture planning", "Digital transformation strategy", "Risk, compliance, and governance guidance"]
  },
  {
    title: "Enterprise Systems Development",
    category: "SYSTEMS",
    icon: <Server className="w-5 h-5 text-accent" />,
    desc: "Mission-critical systems engineered for reliability, integration, and growth at scale.",
    points: ["Cross-department process automation", "API-ready architecture for integrations", "Performance-focused platform engineering"]
  },
  {
    title: "Advanced Analytics",
    category: "ANALYTICS",
    icon: <LineChart className="w-5 h-5 text-accent" />,
    desc: "Actionable intelligence from your data to improve decisions, forecasting, and execution.",
    points: ["Executive dashboards and KPI tracking", "Predictive and trend analysis modules", "Data quality and governance support"]
  },
  {
    title: "Custom Software Development",
    category: "ENGINEERING",
    icon: <Code className="w-5 h-5 text-accent" />,
    desc: "Tailored applications built around your operations, users, and long-term growth objectives.",
    points: ["Domain-specific workflow design", "Scalable backend and frontend systems", "Deployment-ready and maintainable codebase"]
  },
  {
    title: "Ongoing Support & Maintenance",
    category: "LIFECYCLE",
    icon: <LifeBuoy className="w-5 h-5 text-accent" />,
    desc: "Reliable post-launch support to keep your platforms secure, stable, and evolving with your needs.",
    points: ["Proactive monitoring and incident response", "Routine updates and performance tuning", "Dedicated technical support and optimization"]
  }
];

import { Reveal } from "./Reveal";

export function Services() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 40, opacity: 0 },
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
      
      gsap.fromTo(
        ".stat-box",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Core<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Services
          </h2>
          <p className="text-gray-600 font-sans text-lg">Our Core Services Include</p>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          <div className="stat-box bg-white border border-gray-100 rounded-xl p-6 text-center shadow-md">
            <h3 className="text-accent font-display text-4xl mb-2">6</h3>
            <p className="text-xs text-gray-500 font-sans tracking-widest uppercase font-semibold">CORE SERVICE AREAS</p>
          </div>
          <div className="stat-box bg-white border border-gray-100 rounded-xl p-6 text-center shadow-md">
            <h3 className="text-accent font-display text-4xl mb-2">24/7</h3>
            <p className="text-xs text-gray-500 font-sans tracking-widest uppercase font-semibold">SUPPORT AVAILABILITY</p>
          </div>
          <div className="stat-box bg-white border border-gray-100 rounded-xl p-6 text-center shadow-md">
            <h3 className="text-accent font-display text-4xl mb-2">Enterprise</h3>
            <p className="text-xs text-gray-500 font-sans tracking-widest uppercase font-semibold">DELIVERY STANDARD</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service, idx) => (
            <div key={idx} className="service-card bg-white border border-gray-100 rounded-2xl p-8 hover:border-accent/50 transition-colors duration-300 flex flex-col interactive cursor-none group shadow-md hover:shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300 shadow-sm border border-gray-100">
                  {service.icon}
                </div>
                <span className="text-[10px] text-gray-500 font-sans font-bold tracking-widest uppercase border border-gray-200 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              
              <h3 className="text-xl font-display text-[#111111] mb-3">{service.title}</h3>
              <p className="text-sm text-gray-600 font-sans mb-6 line-clamp-3">
                {service.desc}
              </p>
              
              <ul className="flex flex-col gap-3 mt-auto mb-6">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-sans font-medium">
                    <Check className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              <button className="flex items-center gap-2 text-sm text-accent font-sans font-bold mt-auto group-hover:text-[#FF5A36] transition-colors">
                Discuss Service <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
