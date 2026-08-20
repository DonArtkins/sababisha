"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, X, Mail, AlertCircle, Info } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { Pagination } from "@/components/Pagination";
import gsap from "gsap";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const JOBS = [
  { 
    id: 1,
    title: "Attachee", 
    status: "Active",
    type: "Internship / Attachment",
    department: "Talent Development",
    description: "If you are looking for a place to gain practical experience and strengthen your technology skills, apply for an attachment position at Sababisha Solutions. You will learn through real software projects, guided mentorship, teamwork, product discussions, client-focused problem solving, and exposure to fintech, enterprise systems, AI automation, analytics, and implementation workflows.",
    email: "talent@sababisha.com",
    requirements: "Include in your email: Cover letter, CV, and any relevant academic transcripts or certifications."
  },
  { 
    id: 2,
    title: "GTP (Graduate Trainee Programme)", 
    status: "Not Active",
    type: "Graduate Programme",
    department: "Talent Development",
    description: "Our Graduate Trainee Programme is designed for recent graduates ready to build practical skills through guided, real-world project work. As a graduate trainee at Sababisha Solutions, you will work closely with product, engineering, QA, DevOps, implementation, and support teams while developing a strong foundation in professional software delivery.",
    email: "careers@sababisha.com",
    requirements: "Include in your email: Cover letter, CV, and any relevant academic transcripts or certifications."
  }
];

const ITEMS_PER_PAGE = 3;

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(JOBS.length / ITEMS_PER_PAGE);
  const currentJobs = JOBS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle body scroll locking AND Lenis smooth scroll when modal is open
  useEffect(() => {
    if (!selectedJob) return;

    const lenis = (window as any).__lenis;
    const html = document.documentElement;
    const body = document.body;
    const savedScrollY = window.scrollY;
    const previousStyles = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    // Block wheel event from scrolling body when target is outside modal body
    const blockWheel = (e: WheelEvent) => {
      const target = e.target as Node | null;
      const modalBody = modalScrollRef.current;
      if (!modalBody || !target || !modalBody.contains(target)) {
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
      const target = e.target as Node | null;
      const modalBody = modalScrollRef.current;
      if (!modalBody || !target || !modalBody.contains(target)) {
        e.preventDefault();
      }
    };

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    // Stop Lenis and pin the document so the fixed portal stays viewport-based.
    if (lenis) lenis.stop();

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("wheel", blockWheel, { passive: false, capture: true });
    window.addEventListener("touchmove", blockTouchMove, { passive: false, capture: true });
    window.addEventListener("keydown", closeOnEscape);
    
    return () => {
      html.style.overflow = previousStyles.htmlOverflow;
      html.style.overscrollBehavior = previousStyles.htmlOverscrollBehavior;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.overscrollBehavior = previousStyles.bodyOverscrollBehavior;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;
      body.style.paddingRight = previousStyles.bodyPaddingRight;

      window.removeEventListener("wheel", blockWheel, { capture: true });
      window.removeEventListener("touchmove", blockTouchMove, { capture: true });
      window.removeEventListener("keydown", closeOnEscape);
      window.scrollTo(0, savedScrollY);

      if (lenis) {
        if (typeof lenis.scrollTo === "function") {
          lenis.scrollTo(savedScrollY, { immediate: true, force: true });
        }
        lenis.start();
      }
    };
  }, [selectedJob]);

  // Modal Animation Hook
  useEffect(() => {
    if (selectedJob) {
      gsap.fromTo(
        modalContentRef.current,
        { y: 24, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [selectedJob]);

  const closeModal = () => {
    gsap.to(modalContentRef.current, { y: 16, opacity: 0, scale: 0.98, duration: 0.25, ease: "power3.in" });
    gsap.to(modalBackdropRef.current, { opacity: 0, duration: 0.25, onComplete: () => setSelectedJob(null) });
  };

  const modal = selectedJob ? (
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] min-h-[100dvh] w-screen items-stretch justify-center overflow-hidden p-0 sm:items-center sm:p-6"
      style={{ isolation: "isolate" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
    >
      <div
        ref={modalBackdropRef}
        className="modal-backdrop absolute inset-0 bg-[#111111]/45 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      <div className="relative z-10 flex h-full min-h-0 w-full items-stretch justify-center sm:items-center">
        <div
          ref={modalContentRef}
          tabIndex={-1}
          className="modal-content relative flex h-full min-h-0 w-full max-w-2xl flex-col border border-gray-100 bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem] lg:rounded-[2.5rem]"
        >
          {/* Modal Header */}
          <div className="flex shrink-0 items-start justify-between border-b border-gray-100 px-5 pb-4 pt-5 sm:px-8 sm:pb-6 sm:pt-8">
            <div className="min-w-0 pr-4">
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${selectedJob.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {selectedJob.status}
                </span>
                <span className="font-sans text-xs text-gray-400 sm:text-sm">{selectedJob.type}</span>
              </div>
              <h2 id="career-modal-title" className="font-display text-2xl leading-tight text-[#111111] sm:text-3xl md:text-4xl">
                {selectedJob.title}
              </h2>
            </div>

            <button
              onClick={closeModal}
              aria-label="Close career details"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors hover:bg-gray-200 hover:text-[#111111] interactive cursor-none sm:h-10 sm:w-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Modal Body - scrollable */}
          <div
            ref={modalScrollRef}
            className="modal-scrollable min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 font-sans touch-pan-y sm:p-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="mx-auto mb-6 w-full max-w-[200px]">
              <Player
                autoplay
                keepLastFrame
                loop
                src="/lottie/careers-info.json"
                style={{ height: "160px", width: "100%" }}
              />
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-base font-bold text-[#111111] sm:text-lg">Program Description</h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {selectedJob.description}
              </p>
            </div>

            <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:rounded-2xl sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#111111]">
                <AlertCircle className="h-4 w-4 text-[#FF5A36]" /> Application Requirements
              </h3>
              <p className="text-sm text-gray-700 sm:text-base">
                {selectedJob.requirements}
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex shrink-0 flex-col items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50 p-5 pt-4 sm:flex-row sm:gap-4 sm:rounded-b-[2rem] sm:p-8 sm:pt-6 lg:rounded-b-[2.5rem]">
            <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <Mail className="h-4 w-4" /> <CyberText text="Apply via email" speed={40} />
            </div>

            {selectedJob.status === "Active" ? (
              <Link
                href={`mailto:${selectedJob.email}?subject=Application for ${selectedJob.title}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5A36] px-6 py-3 font-sans text-sm font-bold tracking-wide text-white transition-all hover:bg-[#E84E2D] hover:shadow-lg hover:shadow-[#FF5A36]/20 interactive cursor-none sm:w-auto sm:px-8 sm:py-4"
              >
                <CyberText text="Apply Now" speed={20} /> <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-gray-200 px-6 py-3 font-sans text-sm font-bold tracking-wide text-gray-400 sm:w-auto sm:px-8 sm:py-4"
              >
                Applications Closed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;

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
            Join Sababisha Solutions and help build fintech platforms, enterprise systems, AI automation tools, analytics dashboards, integrations, and digital products that solve real operational problems. We welcome curious, disciplined, and collaborative people who want practical experience, mentorship, and meaningful technology work.
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
              At Sababisha Solutions, you work close to real clients, real systems, and real delivery challenges. Our environment supports mentorship, continuous learning, product thinking, clean engineering habits, implementation discipline, and professional growth for people who want to shape the future of technology in Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {isMounted && modal ? createPortal(modal, document.body) : null}
    </main>
  );
}

export default Careers;
