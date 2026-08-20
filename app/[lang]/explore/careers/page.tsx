"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, Mail, CheckCircle, AlertCircle, Info } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { Pagination } from "@/components/Pagination";
import gsap from "gsap";

const JOBS = [
  { 
    id: 1,
    title: "Attachee", 
    status: "Active",
    type: "Internship / Attachment",
    department: "Talent Development",
    description: "If you are looking for a place to gain practical experience and enhance your skills, apply for an attachment position at Sababisha Solutions. We offer hands-on experience and mentorship to help you grow in your career.",
    email: "talent@sababisha.com",
    requirements: "Include in your email: Cover letter, CV, and any relevant academic transcripts or certifications."
  },
  { 
    id: 2,
    title: "GTP (Graduate Trainee Programme)", 
    status: "Not Active",
    type: "Graduate Programme",
    department: "Talent Development",
    description: "Our Graduate Trainee Programme is designed for recent graduates who are ready to build practical skills through guided, real-world project work. As a graduate trainee at Sababisha Solutions, you will work closely with our team, receive mentorship, and develop a strong foundation for a career in technology.",
    email: "careers@sababisha.com",
    requirements: "Include in your email: Cover letter, CV, and any relevant academic transcripts or certifications."
  }
];

const ITEMS_PER_PAGE = 3;

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(JOBS.length / ITEMS_PER_PAGE);
  const currentJobs = JOBS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle body scroll locking AND Lenis smooth scroll when modal is open
  useEffect(() => {
    const lenis = (window as any).__lenis;
    let savedScrollY = 0;
    
    const html = document.documentElement;
    
    // Block wheel event from scrolling body when target is outside modal body
    const blockWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const modalBody = document.querySelector(".modal-scrollable") as HTMLElement | null;
      if (modalBody && !modalBody.contains(target)) {
        e.preventDefault();
      } else if (modalBody) {
        // Inside modal: check if at boundary and block accordingly
        const { scrollTop, scrollHeight, clientHeight } = modalBody;
        const delta = e.deltaY;
        if (delta > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
          e.preventDefault();
        } else if (delta < 0 && scrollTop <= 0) {
          e.preventDefault();
        }
      }
    };
    
    // Block touchmove on body outside modal (mobile)
    const blockTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const modalBody = document.querySelector(".modal-scrollable") as HTMLElement | null;
      if (modalBody && !modalBody.contains(target)) {
        e.preventDefault();
      }
    };
    
    // Block key-based scroll (space, pgdn, pgup, arrows)
    const blockKeyScroll = (e: KeyboardEvent) => {
      const blockKeys = [" ", "PageUp", "PageDown", "End", "Home", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (selectedJob && blockKeys.includes(e.key)) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
        }
      }
    };

    if (selectedJob) {
      savedScrollY = window.scrollY;
      
      // 1. Stop Lenis smooth scroll so it doesn't override native scroll lock
      if (lenis) lenis.stop();
      
      // 2. Lock body with fixed position + saved scroll
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      
      // 3. Lock html element for additional safety
      html.style.overflow = "hidden";
      html.style.touchAction = "none";
      
      // 4. Add global event capture blockers
      window.addEventListener("wheel", blockWheel, { passive: false, capture: true });
      window.addEventListener("touchmove", blockTouchMove, { passive: false, capture: true });
      window.addEventListener("keydown", blockKeyScroll, { capture: true });
      
    } else {
      // Restore
      const scrollY = document.body.style.top;
      
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      
      html.style.overflow = "";
      html.style.touchAction = "";
      
      // Restore scroll position
      const restoreY = scrollY ? parseInt(scrollY || "0") * -1 : savedScrollY;
      window.scrollTo(0, restoreY);
      
      // Resume Lenis smooth scroll
      if (lenis) lenis.start();
      
      // Remove event listeners
      window.removeEventListener("wheel", blockWheel, { capture: true });
      window.removeEventListener("touchmove", blockTouchMove, { capture: true });
      window.removeEventListener("keydown", blockKeyScroll, { capture: true });
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      html.style.overflow = "";
      html.style.touchAction = "";
      
      window.removeEventListener("wheel", blockWheel, { capture: true });
      window.removeEventListener("touchmove", blockTouchMove, { capture: true });
      window.removeEventListener("keydown", blockKeyScroll, { capture: true });
      
      if (lenis) lenis.start();
    };
  }, [selectedJob]);

  // Modal Animation Hook
  useEffect(() => {
    if (selectedJob) {
      gsap.fromTo(".modal-content", 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(".modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [selectedJob]);

  const closeModal = () => {
    gsap.to(".modal-content", { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: "power3.in" });
    gsap.to(".modal-backdrop", { opacity: 0, duration: 0.3, onComplete: () => setSelectedJob(null) });
  };

  return (
    <main className="bg-[#EFEFEF] pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen text-[#111111] relative">
      <div className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36]"></span>
            <span className="uppercase font-sans tracking-widest text-[10px] text-gray-600 font-bold">JOIN OUR TEAM</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-5 sm:mb-6">Build the <span className="text-accent italic">Future</span></h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Join our team at Sababisha Solutions and contribute to innovative solutions in the tech industry. We are always on the lookout for talented individuals passionate about technology and innovation. Explore our current opportunities below and apply today.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:gap-5 mb-10 sm:mb-12">
          {currentJobs.map((job) => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJob(job)}
              className="group bg-white border border-gray-200 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:border-[#FF5A36]/50 hover:bg-[#FF5A36]/5 transition-all interactive cursor-none shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className="bg-gray-100 text-[#111111] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full group-hover:bg-white group-hover:border group-hover:border-gray-200">{job.department}</span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {job.status}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-[#111111] group-hover:text-accent transition-colors break-words">{job.title}</h3>
                <p className="text-gray-500 font-sans mt-2 flex items-center gap-2 text-sm sm:text-base">
                  <Info className="w-4 h-4 shrink-0" /> <CyberText text="Click to view details" speed={40} />
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-[#FF5A36] group-hover:text-white transition-all group-hover:rotate-45 shadow-sm shrink-0">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16 sm:mb-24">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Why Join Us Section */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 shadow-sm border border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 sm:mb-6 text-[#111111]">Why Join Us?</h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              At Sababisha Solutions, we believe in fostering a collaborative and inclusive work environment. We offer competitive salaries, comprehensive benefits, and opportunities for professional growth and development. Join us and be a part of a team that is shaping the future of technology.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pt-24 sm:pt-32 pb-6 sm:pb-10 px-3 sm:px-6" style={{ isolation: "isolate" }}>
          <div 
            className="modal-backdrop absolute inset-0 bg-[#111111]/40 backdrop-blur-sm" 
            onClick={closeModal}
          ></div>
          
          <div className="modal-content relative bg-white w-full max-w-2xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col max-h-full">
            
            {/* Modal Header */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div className="pr-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${selectedJob.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {selectedJob.status}
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm font-sans">{selectedJob.type}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-tight">
                  {selectedJob.title}
                </h2>
              </div>
              
              <button 
                onClick={closeModal}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-[#111111] transition-colors interactive cursor-none shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Body - scrollable */}
            <div 
              className="modal-scrollable p-5 sm:p-8 overflow-y-auto font-sans overscroll-contain touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-3">Program Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {selectedJob.description}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 mb-8">
                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#FF5A36]" /> Application Requirements
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {selectedJob.requirements}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-8 pt-4 sm:pt-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0 rounded-b-[1.5rem] sm:rounded-b-[2.5rem]">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Mail className="w-4 h-4" /> <CyberText text="Apply via email" speed={40} />
              </div>
              
              {selectedJob.status === "Active" ? (
                <a 
                  href={`mailto:${selectedJob.email}?subject=Application for ${selectedJob.title}`}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF5A36] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-sans font-bold text-sm tracking-wide hover:bg-[#E84E2D] hover:shadow-lg hover:shadow-[#FF5A36]/20 transition-all interactive cursor-none"
                >
                  <CyberText text="Apply Now" speed={20} /> <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              ) : (
                <button 
                  disabled
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-sans font-bold text-sm tracking-wide cursor-not-allowed"
                >
                  Applications Closed
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </main>
  );
}

export default Careers;
