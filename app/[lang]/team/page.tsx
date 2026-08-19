"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BentoTilt } from "@/components/BentoTilt";
import { OptimizedImage } from "@/components/OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

const TEAM = {
  management: [
    { id: 1, name: "David Opiyo", role: "Chief Executive Officer", image: "/images/img5.jpg" },
    { id: 2, name: "Sarah M.", role: "Chief Operating Officer", image: "/images/img6.jpg" },
  ],
  leads: [
    { id: 3, name: "John K.", role: "Lead Engineer", image: "/images/img1.jpg" },
    { id: 4, name: "Mercy N.", role: "Product Manager", image: "/images/img5.jpg" },
    { id: 5, name: "Peter W.", role: "Design Lead", image: "/images/img6.jpg" },
  ],
  supervisors: [
    { id: 6, name: "Grace O.", role: "QA Supervisor", image: "/images/img1.jpg" },
    { id: 7, name: "Daniel K.", role: "Backend Supervisor", image: "/images/img5.jpg" },
    { id: 8, name: "Lucy M.", role: "Frontend Supervisor", image: "/images/img6.jpg" },
    { id: 9, name: "Kevin M.", role: "DevOps Supervisor", image: "/images/img1.jpg" },
  ]
};

const TeamMemberCard = ({ member, className }: { member: any, className?: string }) => (
  <BentoTilt className={`group relative rounded-3xl overflow-hidden bg-gray-100 interactive cursor-none ${className}`}>
    <OptimizedImage 
      src={member.image} 
      alt={member.name}
      wrapperClassName="absolute inset-0 w-full h-full"
      imageClassName="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111]/90" />
    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
      <h3 className="text-white font-display text-2xl md:text-3xl font-bold drop-shadow-md">
        {member.name}
      </h3>
      <span className="text-accent text-sm font-sans uppercase tracking-widest font-semibold mt-1 drop-shadow-md">
        {member.role}
      </span>
    </div>
  </BentoTilt>
);

const TeamMemberCardMobile = ({ member }: { member: any }) => (
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
            Meet Our <span className="text-accent italic">Leadership</span>
          </h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            The visionary minds driving Sababisha Solutions forward.
          </p>
        </div>

        {/* Management */}
        <div className="team-section mb-24">
          <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-gray-300"></span>
            Executive Management
          </h2>
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-1 gap-10 w-full">
            {TEAM.management.map(member => (
              <TeamMemberCardMobile key={member.id} member={member} />
            ))}
          </div>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 w-full">
            {TEAM.management.map(member => (
              <TeamMemberCard key={member.id} member={member} className="aspect-[16/9]" />
            ))}
          </div>
        </div>

        {/* Leads */}
        <div className="team-section mb-24">
          <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-gray-300"></span>
            Team Leads
          </h2>
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-8 w-full">
            {TEAM.leads.map(member => (
              <TeamMemberCardMobile key={member.id} member={member} />
            ))}
          </div>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
            {TEAM.leads.map(member => (
              <TeamMemberCard key={member.id} member={member} className="aspect-[4/5]" />
            ))}
          </div>
        </div>

        {/* Supervisors */}
        <div className="team-section">
          <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-gray-300"></span>
            Supervisors
          </h2>
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-8 w-full">
            {TEAM.supervisors.map(member => (
              <TeamMemberCardMobile key={member.id} member={member} />
            ))}
          </div>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 w-full">
            {TEAM.supervisors.map(member => (
              <TeamMemberCard key={member.id} member={member} className="aspect-square" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Team;
