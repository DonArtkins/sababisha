"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "@/components/OptimizedImage";
import { TEAM } from "@/lib/db";
import type { TeamMember } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="group interactive cursor-none">
    <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
      <OptimizedImage
        src={member.image}
        alt={member.name}
        wrapperClassName="absolute inset-0 w-full h-full"
        imageClassName="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
      />
    </div>
    <h3 className="font-display text-3xl text-[#111111] leading-tight mb-2">{member.name}</h3>
    <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold">{member.role}</span>
  </div>
);

const TeamMemberCardMobile = ({ member }: { member: TeamMember }) => (
  <div className="group interactive cursor-none">
    <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
      <OptimizedImage
        src={member.image}
        alt={member.name}
        wrapperClassName="absolute inset-0 w-full h-full"
        imageClassName="w-full h-full object-cover grayscale opacity-80"
      />
    </div>
    <h3 className="font-display text-2xl text-[#111111] leading-tight mb-2">{member.name}</h3>
    <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold">{member.role}</span>
  </div>
);

export function Team() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
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
    <main className="bg-transparent pt-32 pb-24 min-h-screen">
      <section ref={containerRef} className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="font-display text-5xl md:text-7xl text-[#111111] leading-tight mb-6">
            Meet Our <span className="text-accent relative inline-block">
              Leadership
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the leadership, product, engineering, QA, DevOps, support, and operations professionals behind Sababisha Solutions. Our team combines fintech experience, software engineering discipline, implementation support, and client-focused thinking to deliver practical digital solutions.
          </p>
        </div>

        {/* Management */}
        <div className="team-section mb-24">
          <div className="mb-10">
            <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3 flex items-center gap-4">
              <span className="w-8 h-px bg-gray-300"></span>
              Executive Management
            </h2>
            <p className="font-sans text-base text-gray-600 leading-relaxed max-w-3xl">
              Our executive management team sets the strategic direction for fintech innovation, enterprise software delivery, partnerships, operational quality, and long-term client success.
            </p>
          </div>
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-1 gap-10 w-full">
            {TEAM.management.map(member => (
              <TeamMemberCardMobile key={member.id} member={member} />
            ))}
          </div>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-x-8 gap-y-12 w-full">
            {TEAM.management.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Leads */}
        <div className="team-section mb-24">
          <div className="mb-10">
            <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3 flex items-center gap-4">
              <span className="w-8 h-px bg-gray-300"></span>
              Team Leads
            </h2>
            <p className="font-sans text-base text-gray-600 leading-relaxed max-w-3xl">
              Our team leads translate business requirements into product plans, design decisions, engineering priorities, user workflows, and quality standards that keep every project moving clearly.
            </p>
          </div>
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-8 w-full">
            {TEAM.leads.map(member => (
              <TeamMemberCardMobile key={member.id} member={member} />
            ))}
          </div>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-x-8 gap-y-12 w-full">
            {TEAM.leads.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Supervisors */}
        <div className="team-section">
          <div className="mb-10">
            <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3 flex items-center gap-4">
              <span className="w-8 h-px bg-gray-300"></span>
              Supervisors
            </h2>
            <p className="font-sans text-base text-gray-600 leading-relaxed max-w-3xl">
              Supervisors support daily execution across backend, frontend, QA, DevOps, implementation, and support, ensuring systems are tested, documented, deployed, and improved responsibly.
            </p>
          </div>
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-8 w-full">
            {TEAM.supervisors.map(member => (
              <TeamMemberCardMobile key={member.id} member={member} />
            ))}
          </div>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-x-8 gap-y-12 w-full">
            {TEAM.supervisors.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Team;
