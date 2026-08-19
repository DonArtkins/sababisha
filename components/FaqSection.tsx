"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  value: string;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    value: "faq-1",
    question: "What does Sababisha Solutions do?",
    answer:
      "Sababisha Solutions is a fintech company that builds simple, scalable digital systems and provides technology solutions to help businesses streamline operations, improve efficiency, and grow."
  },
  {
    value: "faq-2",
    question: "What types of businesses do you work with?",
    answer:
      "We work with startups, SMEs, and established enterprises across various industries looking to digitize their processes, improve financial systems, or build custom software solutions."
  },
  {
    value: "faq-3",
    question: "What solutions do you offer?",
    answer: (
      <div>
        <p>We provide a range of tailored digital and fintech solutions, including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Innovative fintech solutions</li>
          <li>Expert consultancy</li>
          <li>Advanced analytics</li>
          <li>Ongoing support and maintenance</li>
          <li>Custom software development</li>
          <li>Enterprise systems development</li>
        </ul>
      </div>
    )
  },
  {
    value: "faq-4",
    question: "Can you build a system tailored to my business needs?",
    answer:
      "Yes. We specialize in developing customized solutions designed specifically around your business requirements to ensure scalability, efficiency, and ease of use."
  },
  {
    value: "faq-5",
    question: "How long does it take to develop a system?",
    answer:
      "Project timelines vary depending on complexity and scope. Simple solutions may take a few weeks, while more advanced systems can take several months. We provide clear timelines after an initial consultation."
  },
  {
    value: "faq-6",
    question: "Do you offer support after the system is delivered?",
    answer:
      "Yes. We provide continuous support, system maintenance, updates, and performance monitoring to ensure your solution remains reliable and up to date."
  },
  {
    value: "faq-7",
    question: "How do I get started with Sababisha Solutions?",
    answer:
      "You can get started by contacting us through our website or reaching out directly via phone at +254 751101532. Our team will schedule a consultation to understand your needs and recommend the best solution."
  },
  {
    value: "faq-8",
    question: "Do you help businesses that are not tech-savvy?",
    answer:
      "Absolutely. We design intuitive, user-friendly systems and guide you through every step, ensuring a smooth transition into digital operations."
  },
  {
    value: "faq-9",
    question: "Can you integrate with existing systems?",
    answer: (
      <div>
        <p>Yes. We can integrate our solutions with a wide range of existing platforms and services, including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Mobile money platforms such as M-Pesa</li>
          <li>Banking systems</li>
          <li>Credit Reference Bureaus (CRBs)</li>
          <li>Payment gateways</li>
          <li>CRM and ERP systems</li>
        </ul>
        <p className="mt-2">This ensures seamless data flow and efficient business operations.</p>
      </div>
    )
  },
  {
    value: "faq-10",
    question: "Do you offer fintech-specific solutions?",
    answer:
      "Yes. As a fintech-focused company, we develop solutions such as payment systems, digital wallets, financial dashboards, lending platforms, and transaction management systems."
  },
  {
    value: "faq-11",
    question: "How secure is our data?",
    answer: (
      <div>
        <p>
          We take data security very seriously. Sababisha Solutions is a certified Data Controller, and we adhere to strict data protection standards, including encryption and secure system architecture. You can view our certification details here:{" "}
          <Link href="#" className="text-accent underline">
            Data Controller Certificate
          </Link>
        </p>
      </div>
    )
  }
];

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