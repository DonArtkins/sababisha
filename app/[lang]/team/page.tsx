"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const TeamMemberCard = ({ member }: { member: any }) => (
  <div className="group interactive cursor-none">
    <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 bg-gray-100 relative">
      <OptimizedImage
        src={member.image}
        alt={member.name}
        wrapperClassName="absolute inset-0 w-full h-full"
        imageClassName="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
      />
    </div>
    <h3 className="font-display text-2xl md:text-3xl text-[#111111] leading-tight mb-2">{member.name}</h3>
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
          <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-10 flex items-center gap-4">
            <span className="w-8 h-px bg-gray-300"></span>
            Executive Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 w-full">
            {TEAM.management.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Leads */}
        <div className="team-section mb-24">
          <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-10 flex items-center gap-4">
            <span className="w-8 h-px bg-gray-300"></span>
            Team Leads
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 w-full">
            {TEAM.leads.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Supervisors */}
        <div className="team-section">
          <h2 className="font-sans text-sm font-semibold tracking-widest uppercase text-gray-500 mb-10 flex items-center gap-4">
            <span className="w-8 h-px bg-gray-300"></span>
            Supervisors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 w-full">
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
