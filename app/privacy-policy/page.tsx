"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, User, Database, Scale, Mail, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".policy-section",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
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
    <main className="bg-[#EFEFEF] min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36]"></span>
            <span className="uppercase font-sans tracking-widest text-[10px] text-gray-600 font-bold">
              Legal
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-[#111111] leading-[1.05] tracking-tight mb-6">
            Privacy{" "}
            <span className="italic text-[#FF5A36] relative inline-block">
              Policy
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
            {" "}&amp; Data Protection
          </h1>

          <p className="text-gray-600 font-sans text-lg md:text-xl leading-relaxed max-w-2xl">
            Your privacy matters to us. This policy explains how Sababisha
            Solutions collects, uses, stores, protects, and manages personal
            data when you use our website, contact our team, request support,
            or engage us for fintech, enterprise software, AI automation,
            integration, and digital transformation services.
          </p>

          <p className="mt-6 text-sm font-sans text-gray-400">
            Last Updated: March 25, 2026
          </p>
        </Reveal>
      </section>

      {/* Policy Sections */}
      <section ref={containerRef} className="pb-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-8">
        {/* Section 1: Data Protection Overview */}
        <div className="policy-section bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FF5A36]/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#FF5A36]" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#111111] leading-tight">
                1. Data Protection Overview
              </h2>
            </div>
          </div>
          <p className="text-gray-600 font-sans text-base md:text-lg leading-relaxed pl-0 md:pl-16">
            Sababisha Solutions is committed to protecting your personal data in
            accordance with the{" "}
            <strong className="text-[#111111]">
              Kenya Data Protection Act, 2019
            </strong>
            . We serve as the &quot;Data Controller&quot; for the information
            collected on this website. This means we determine the purposes and
            means of processing your personal data, and we are responsible for
            ensuring it is handled lawfully, fairly, and transparently.
          </p>
        </div>

        {/* Section 2: Information We Collect */}
        <div className="policy-section bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FF5A36]/10 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-[#FF5A36]" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#111111] leading-tight">
                2. Information We Collect
              </h2>
            </div>
          </div>
          <p className="text-gray-600 font-sans text-base md:text-lg leading-relaxed pl-0 md:pl-16 mb-6">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-0 md:pl-16">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#FF5A36]" />
                <h3 className="font-sans font-bold text-[#111111] text-sm uppercase tracking-wider">
                  Identity Data
                </h3>
              </div>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Includes names, organization details, role information, and
                account identifiers required to respond to inquiries, provide
                services, manage access, and support business relationships.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-[#FF5A36]" />
                <h3 className="font-sans font-bold text-[#111111] text-sm uppercase tracking-wider">
                  Contact Data
                </h3>
              </div>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Includes email addresses, telephone numbers, and communication
                preferences used for consultation scheduling, project updates,
                support conversations, onboarding, and service notifications.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-[#FF5A36]" />
                <h3 className="font-sans font-bold text-[#111111] text-sm uppercase tracking-wider">
                  Technical Data
                </h3>
              </div>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Includes internet protocol addresses, browser details, device
                information, usage patterns, and time zone settings that help us
                improve website performance, security, diagnostics, and user
                experience.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Your Legal Rights */}
        <div className="policy-section bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FF5A36]/10 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-[#FF5A36]" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#111111] leading-tight">
                3. Your Legal Rights
              </h2>
            </div>
          </div>
          <p className="text-gray-600 font-sans text-base md:text-lg leading-relaxed pl-0 md:pl-16 mb-6">
            Under the Kenya Data Protection Act, you have the following rights
            regarding your personal data:
          </p>
          <ul className="pl-0 md:pl-16 flex flex-col gap-3">
            {[
              "Request access to your personal data",
              "Request correction of inaccurate or incomplete data",
              "Request erasure of your personal data",
              "Request restriction of processing your data",
              "Right to data portability",
              "Object to processing of your personal data",
            ].map((right, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#FF5A36] shrink-0 mt-0.5" />
                <span className="text-gray-600 font-sans text-base leading-relaxed">
                  {right}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Contact Us */}
        <div className="policy-section bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FF5A36]/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#FF5A36]" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#111111] leading-tight">
                4. Contact Us
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-16">
            <p className="text-gray-600 font-sans text-base md:text-lg leading-relaxed mb-6">
              If you have questions about this Privacy Policy, want to exercise
              your data rights, or need clarification on how Sababisha Solutions
              handles information during project discovery, support, or service
              delivery, please contact our Data Protection Officer at:
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 inline-flex flex-col gap-2">
              <p className="font-sans text-sm text-gray-500 uppercase tracking-wider font-bold">
                Data Protection Officer
              </p>
              <Link
                href="mailto:privacy@sababishasolutions.com"
                className="text-[#111111] font-sans font-semibold text-lg hover:text-[#FF5A36] transition-colors interactive cursor-none flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                privacy@sababishasolutions.com
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="policy-section flex justify-center mt-4">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-gray-500 font-sans text-sm hover:text-[#FF5A36] transition-colors interactive cursor-none"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
