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
      "Sababisha Solutions is a Nairobi-based technology and fintech company that designs, builds, and supports secure digital systems for businesses, institutions, and growing enterprises. Our work covers custom software development, financial technology platforms, enterprise integrations, data dashboards, automation, and practical digital transformation for teams that want better visibility, faster operations, and stronger customer experiences."
  },
  {
    value: "faq-2",
    question: "What types of businesses do you work with?",
    answer:
      "We work with startups, SMEs, SACCOs, microfinance institutions, healthcare providers, insurance agencies, law firms, schools, government programs, and established enterprises. Our ideal clients are organizations that want to replace manual work, connect scattered systems, improve reporting, launch customer-facing portals, or build reliable software around their exact operating model."
  },
  {
    value: "faq-3",
    question: "What solutions do you offer?",
    answer: (
      <div>
        <p>We provide end-to-end digital and fintech solutions that help organizations move from fragmented manual processes to secure, measurable, and scalable platforms, including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Fintech solutions for lending, payments, member self-service, check-off workflows, and financial reporting</li>
          <li>Technology consultancy for digital transformation, system architecture, and product planning</li>
          <li>Advanced analytics dashboards for performance tracking, forecasting, and executive reporting</li>
          <li>Ongoing support, maintenance, monitoring, and optimization after launch</li>
          <li>Custom software development for internal teams, customers, partners, and field operations</li>
          <li>Enterprise systems development with secure APIs, integrations, role-based access, and scalable infrastructure</li>
        </ul>
      </div>
    )
  },
  {
    value: "faq-4",
    question: "Can you build a system tailored to my business needs?",
    answer:
      "Yes. We specialize in customized software that reflects how your business actually works. We document your processes, identify the bottlenecks, design the right workflows, and build a platform that supports your users, reporting needs, approvals, integrations, security requirements, and long-term growth."
  },
  {
    value: "faq-5",
    question: "How long does it take to develop a system?",
    answer:
      "Timelines depend on the scope, integrations, data migration needs, approval workflows, and number of user roles. A focused portal or dashboard may take a few weeks, while a full enterprise system can take several months. After discovery, we provide a clear delivery roadmap with milestones, review points, testing phases, and launch preparation."
  },
  {
    value: "faq-6",
    question: "Do you offer support after the system is delivered?",
    answer:
      "Yes. We provide post-launch support, maintenance, performance monitoring, updates, user guidance, and improvement planning. Our goal is to keep your platform secure, stable, fast, and aligned with new business requirements as your operations evolve."
  },
  {
    value: "faq-7",
    question: "How do I get started with Sababisha Solutions?",
    answer:
      "You can get started by contacting us through the website or calling +254 751101532. We will schedule a consultation to understand your business goals, current systems, pain points, budget, and expected timeline, then recommend the best path whether that is a ready product, a custom build, an integration project, or strategic technology advisory."
  },
  {
    value: "faq-8",
    question: "Do you help businesses that are not tech-savvy?",
    answer:
      "Absolutely. Many successful digital transformation projects begin with teams that are not technical. We design clean, intuitive systems, provide onboarding support, document key workflows, and guide users through adoption so your staff can move confidently from paper, spreadsheets, or disconnected tools into structured digital operations."
  },
  {
    value: "faq-9",
    question: "Can you integrate with existing systems?",
    answer: (
      <div>
        <p>Yes. Integration is one of our core strengths. We connect new platforms with the systems your organization already depends on so data can move securely, accurately, and without duplicate manual entry. Common integrations include:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Mobile money platforms such as M-Pesa and other digital payment channels</li>
          <li>Banking systems, loan management tools, and payment reconciliation workflows</li>
          <li>Credit Reference Bureaus (CRBs)</li>
          <li>Payment gateways</li>
          <li>CRM, ERP, accounting, HR, and reporting systems</li>
        </ul>
        <p className="mt-2">This improves data flow, reduces operational delays, and gives decision-makers a clearer view of the business.</p>
      </div>
    )
  },
  {
    value: "faq-10",
    question: "Do you offer fintech-specific solutions?",
    answer:
      "Yes. As a fintech-focused company, we develop lending platforms, check-off systems, payment hubs, digital wallets, insurance management tools, SACCO and microfinance systems, transaction dashboards, credit scoring workflows, and financial reporting platforms designed for security, auditability, and operational scale."
  },
  {
    value: "faq-11",
    question: "How secure is our data?",
    answer: (
      <div>
        <p>
          We take data security very seriously. Sababisha Solutions is a certified Data Controller, and we apply strict data protection practices including secure system architecture, access control, encryption, audit-aware workflows, and responsible handling of personal and business information. Learn more about how we handle your data in our{" "}
          <Link href="/privacy-policy" className="text-accent underline">
            Privacy Policy &amp; Data Protection
          </Link>
          {" "}page.
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
          <p className="max-w-3xl text-gray-600 font-sans text-base leading-relaxed sm:text-lg">
            Everything you need to know about Sababisha Solutions, from fintech products and custom software development to integrations, data security, project timelines, support, maintenance, and how we help businesses thrive in the digital age with practical technology.
          </p>
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
