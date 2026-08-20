"use client";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Play, ChevronRight, Globe, Shield, Map, Loader2 } from "lucide-react";
const Facebook = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Twitter = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Instagram = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const Linkedin = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Tiktok = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v11a7 7 0 1 1-7-7v3a4 4 0 0 0 4 4z"/></svg>;
const Whatsapp = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;

import { AnimatedLink } from "./AnimatedLink";
import { FormStatusModal } from "./FormStatusModal";
import { EMAIL_PATTERN } from "@/lib/form-utils";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterWebsite, setNewsletterWebsite] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterModal, setNewsletterModal] = useState<{
    status: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(email)) {
      setNewsletterError("Enter a valid email address.");
      setNewsletterModal({
        status: "error",
        title: "Check the email",
        message: "Enter a valid email address before subscribing.",
      });
      return;
    }

    setNewsletterError("");
    setIsNewsletterSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          website: newsletterWebsite,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (result?.errors?.email) {
          setNewsletterError(result.errors.email);
        }
        setNewsletterModal({
          status: "error",
          title: "Subscription not sent",
          message:
            typeof result?.message === "string"
              ? result.message
              : "We could not complete the subscription. Please try again.",
        });
        return;
      }

      setNewsletterEmail("");
      setNewsletterWebsite("");
      setNewsletterModal({
        status: "success",
        title: "Subscription sent",
        message: "Your email has been sent to Sababisha Solutions for newsletter updates.",
      });
    } catch {
      setNewsletterModal({
        status: "error",
        title: "Connection failed",
        message: "We could not reach the email service. Please try again.",
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <footer ref={containerRef} className="bg-[#EFEFEF] text-[#111111] pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <div className="footer-col lg:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-loader-logo-bg rounded-full shadow-sm flex items-center justify-center ring-2 ring-foreground/10 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Sababisha Solutions Logo" 
                  fill
                  unoptimized
                  className="object-contain rounded-full p-1 relative z-10"
                />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-lg text-[#111111] leading-tight">Sababisha Solutions Limited</h3>
                <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-accent font-semibold">WE MAKE IT HAPPEN</p>
              </div>
            </div>
            <p className="text-gray-600 font-sans text-sm leading-relaxed mt-2">
              Building fintech platforms, custom software, enterprise systems, AI automation, analytics dashboards, and integrations for organizations that need dependable digital transformation.
            </p>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <Link href="https://www.linkedin.com/in/sababisha-solutions-8349043b7" target="_blank" className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center interactive cursor-none hover:bg-[#FF5A36] hover:border-[#FF5A36] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <Linkedin className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="https://x.com/sababisha_SSL" target="_blank" className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center interactive cursor-none hover:bg-[#FF5A36] hover:border-[#FF5A36] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <Twitter className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="https://www.facebook.com/share/1BcRUgRPV3/?mibextid=wwXIfr" target="_blank" className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center interactive cursor-none hover:bg-[#FF5A36] hover:border-[#FF5A36] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <Facebook className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="https://www.instagram.com/sababisha.solutions?igsh=MWQ1dHpwMjFzbTVpZA%3D%3D&utm_source=qr" target="_blank" className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center interactive cursor-none hover:bg-[#FF5A36] hover:border-[#FF5A36] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <Instagram className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="https://www.tiktok.com/@sababisha.solutio" target="_blank" className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center interactive cursor-none hover:bg-[#FF5A36] hover:border-[#FF5A36] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <Tiktok className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="https://wa.me/254751101532" target="_blank" className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center interactive cursor-none hover:bg-[#FF5A36] hover:border-[#FF5A36] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <Whatsapp className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col lg:col-span-1 lg:ml-8">
            <h4 className="font-sans font-bold text-xl mb-6 text-[#111111]">Company</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-gray-600">
              <li><AnimatedLink href="/en" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>Home</AnimatedLink></li>
              <li><AnimatedLink href="/en/services" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>Services</AnimatedLink></li>
              <li><AnimatedLink href="/en/products" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>Products</AnimatedLink></li>
              <li><AnimatedLink href="/en/explore/projects" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>Projects</AnimatedLink></li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="footer-col lg:col-span-1">
            <h4 className="font-sans font-bold text-xl mb-6 text-[#111111]">Explore</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-gray-600">
              <li><AnimatedLink href="/en/explore/rd-blogs" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>R&D Blogs</AnimatedLink></li>
              <li><AnimatedLink href="/en/explore/ai-topics" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>AI Topics</AnimatedLink></li>
              <li><AnimatedLink href="/en/explore/careers" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>Careers</AnimatedLink></li>
              <li><AnimatedLink href="/en/faq" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>FAQ</AnimatedLink></li>
              <li><AnimatedLink href="/en/contact" className="hover:text-[#FF5A36] transition-colors interactive cursor-none" leftIcon={<ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}>Contact Us</AnimatedLink></li>
            </ul>
          </div>

          {/* Column 4: Get in touch */}
          <div className="footer-col lg:col-span-1">
            <h4 className="font-sans font-bold text-xl mb-6 text-[#111111]">Get in touch</h4>
            <div className="flex flex-col gap-6 font-sans text-sm text-gray-600">
              <div>
                <p className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4 text-gray-400" /> Customer Care</p>
                <p className="text-[#111111] font-semibold flex items-center gap-2"><Phone className="w-4 h-4 text-[#111111]" /> +254 751101532</p>
              </div>
              <div>
                <p className="flex items-center gap-2 mb-2"><Mail className="w-4 h-4 text-gray-400" /> Need live support?</p>
                <AnimatedLink href="mailto:support@sababisha.com" className="text-[#111111] font-semibold hover:text-[#FF5A36] cursor-none interactive transition-colors" leftIcon={<Mail className="w-4 h-4 text-[#111111]" />}>support@sababisha.com</AnimatedLink>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div className="footer-col lg:col-span-1">
            <h4 className="font-sans font-bold text-xl mb-6 text-[#111111]">Newsletter</h4>
            <p className="font-sans text-sm text-gray-600 mb-4">Subscribe for product updates, AI insights, fintech ideas, engineering notes, and digital transformation resources from Sababisha Solutions.</p>
            <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2">
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={newsletterWebsite}
                    onChange={(event) => setNewsletterWebsite(event.target.value)}
                  />
                </label>
              </div>
              <div className="relative">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => {
                    setNewsletterEmail(event.target.value);
                    if (newsletterError) setNewsletterError("");
                  }}
                  placeholder="Email address"
                  autoComplete="email"
                  maxLength={120}
                  aria-invalid={Boolean(newsletterError)}
                  aria-describedby={newsletterError ? "newsletter-error" : undefined}
                  className={`w-full rounded-full border bg-white px-5 py-3 pr-12 text-sm text-[#111111] placeholder:text-gray-400 outline-none transition-colors focus:border-[#FF5A36] interactive cursor-none shadow-sm dark:bg-card dark:text-foreground dark:placeholder:text-muted ${newsletterError ? "border-[#FF5A36]" : "border-gray-300 dark:border-border"}`}
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#111111] transition-colors hover:bg-[#FF5A36]/10 hover:text-[#FF5A36] disabled:opacity-50 interactive cursor-none dark:text-foreground"
                >
                  {isNewsletterSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>
              </div>
              {newsletterError ? (
                <p id="newsletter-error" className="px-2 font-sans text-xs font-semibold text-[#FF5A36]">
                  {newsletterError}
                </p>
              ) : null}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 interactive cursor-none hover:text-[#111111]"><Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" /> English</span>
            <AnimatedLink href="/en/privacy-policy" className="hover:text-[#111111] transition-colors" leftIcon={<Shield className="w-3.5 h-3.5 text-gray-400 shrink-0" />}>Privacy Policy</AnimatedLink>
            <AnimatedLink href="/en/sitemap-page" className="hover:text-[#111111] transition-colors" leftIcon={<Map className="w-3.5 h-3.5 text-gray-400 shrink-0" />}>Sitemap</AnimatedLink>
          </div>
          <p>© 2026 Sababisha Solutions. All rights reserved</p>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#FF5A36] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,90,54,0.3)] interactive cursor-none hover:bg-[#E84E2D] hover:scale-110 transform transition-all z-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <FormStatusModal
        open={Boolean(newsletterModal)}
        status={newsletterModal?.status || "success"}
        title={newsletterModal?.title || ""}
        message={newsletterModal?.message || ""}
        actionLabel={newsletterModal?.status === "success" ? "Done" : "Review"}
        onClose={() => setNewsletterModal(null)}
      />
    </footer>
  );
}
