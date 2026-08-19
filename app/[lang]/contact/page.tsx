"use client";
import Link from 'next/link';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      
      gsap.fromTo(
        rightColRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#EFEFEF] min-h-screen">
      <section ref={containerRef} className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Info */}
        <div ref={leftColRef} className="w-full lg:w-[40%] flex flex-col">
          <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36]"></span>
            <span className="uppercase font-sans tracking-widest text-[10px] text-gray-600 font-bold">
              Get In Touch
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl text-[#111111] leading-[1.05] tracking-tight mb-6">
            Let's build <br />
            something <span className="italic text-[#FF5A36] relative inline-block">
              great.<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-600 font-sans text-lg md:text-xl leading-relaxed mb-12 max-w-md">
            Have a project in mind, need expert consultancy, or want to explore our solutions? Reach out to our team today.
          </p>
          
          <div className="flex flex-col gap-10 mt-auto">
            <div className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#FF5A36] group-hover:text-[#FF5A36] transition-colors shadow-sm">
                <Mail className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
              </div>
              <div>
                <h3 className="text-[#111111] font-display text-xl mb-1">Email Us</h3>
                <p className="text-gray-600 font-sans text-sm mb-1">For general inquiries & support</p>
                <Link href="mailto:support@sababisha.com" className="text-[#111111] font-sans font-semibold text-sm hover:text-[#FF5A36] transition-colors interactive cursor-none">
                  support@sababisha.com
                </Link>
              </div>
            </div>
            
            <div className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#FF5A36] transition-colors shadow-sm">
                <Phone className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
              </div>
              <div>
                <h3 className="text-[#111111] font-display text-xl mb-1">Call Us</h3>
                <p className="text-gray-600 font-sans text-sm mb-1">We usually respond immediately</p>
                <Link href="tel:+254751101532" className="text-[#111111] font-sans font-semibold text-sm hover:text-[#FF5A36] transition-colors interactive cursor-none">
                  0751101532 / 0715088150
                </Link>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#FF5A36] transition-colors shadow-sm">
                <MapPin className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
              </div>
              <div>
                <h3 className="text-[#111111] font-display text-xl mb-1">Physical Presence</h3>
                <p className="text-gray-600 font-sans text-sm mb-1">Visit our headquarters</p>
                <p className="text-[#111111] font-sans font-semibold text-sm">
                  Ngong, Nairobi,<br/>Zambia Road,<br/>Along Wakaba Close,<br/>Mega-Hill Court, Suite B3.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Form */}
        <div ref={rightColRef} className="w-full lg:w-[60%] mt-12 lg:mt-0">
          <form className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@company.com"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+254 712 345 678"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Company / Organization</label>
                <input 
                  type="text" 
                  placeholder="Your organization"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-sans font-bold text-[#111111] ml-2">Subject</label>
              <div className="relative">
                <select 
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] appearance-none focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none font-sans"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service or solution</option>
                  <option value="fintech">Fintech Solutions</option>
                  <option value="custom-software">Custom Software Development</option>
                  <option value="web-mobile">Web & Mobile App Development</option>
                  <option value="enterprise">Enterprise Integrations</option>
                  <option value="data-reporting">Data & Reporting Dashboards</option>
                  <option value="ai-automation">AI & Automation Solutions</option>
                  <option value="consultancy">Consultancy & Digital Transformation</option>
                  <option value="support">Support & Maintenance</option>
                  <option value="others">Others</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-sans font-bold text-[#111111] ml-2">Message</label>
              <textarea 
                rows={5} 
                placeholder="Tell us about your project, goals, and timeline."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all resize-none interactive cursor-none" 
              />
            </div>
            
            <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
              <Button type="button" variant="primary" size="lg">
                Submit Inquiry
              </Button>
              <p className="font-sans text-xs text-gray-500 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                We usually respond within one business day.
              </p>
            </div>

          </form>
        </div>
      </section>
      
      
    </main>
  );
}

export default Contact;
