"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    value: "faq-1",
    question: "What industries do you serve?",
    answer: "We primarily serve the Fintech, Healthcare, Logistics, and E-commerce sectors, but our custom software solutions are adaptable to any industry requiring scalable enterprise systems."
  },
  {
    value: "faq-2",
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A standard web application might take 2-3 months, while complex enterprise systems or ERP implementations can take 6 months to a year."
  },
  {
    value: "faq-3",
    question: "Do you provide ongoing support after launch?",
    answer: "Yes, we offer comprehensive SLA-based support and maintenance packages to ensure your systems remain secure, updated, and performant."
  },
  {
    value: "faq-4",
    question: "What is your technology stack?",
    answer: "We use modern, scalable technologies including React, Node.js, Python, PostgreSQL, and cloud infrastructure like AWS and Google Cloud Platform."
  }
];

import { Reveal } from "./Reveal";

export function FaqSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-item",
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
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        
        <Reveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Frequent<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Questions
          </h2>
          <p className="text-gray-600 font-sans text-lg">Our Frequent Questions Include</p>
        </Reveal>

        <Accordion.Root type="single" collapsible className="w-full flex flex-col gap-4">
          {FAQS.map((faq) => (
            <Accordion.Item 
              key={faq.value} 
              value={faq.value}
              className="faq-item bg-white border border-gray-200 rounded-2xl overflow-hidden interactive cursor-none hover:border-gray-300 transition-colors shadow-sm"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 items-center justify-between px-6 py-6 font-sans font-semibold text-lg text-[#111111] outline-none">
                  {faq.question}
                  <ChevronDown className="text-gray-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-gray-500 font-sans text-base leading-relaxed data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="px-6 pb-6 pt-0">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

      </div>
    </section>
  );
}