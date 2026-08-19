"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, Mail, CheckCircle, AlertCircle, Info } from "lucide-react";
import { CyberText } from "@/components/CyberText";
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

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
    <main className="bg-[#EFEFEF] pt-32 pb-24 min-h-screen text-[#111111] relative">
      <div className="px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36]"></span>
            <span className="uppercase font-sans tracking-widest text-[10px] text-gray-600 font-bold">JOIN OUR TEAM</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl mb-6">Build the <span className="text-accent italic">Future</span></h1>
          <p className="text-gray-600 font-sans text-lg max-w-3xl mx-auto leading-relaxed">
            Join our team at Sababisha Solutions and contribute to innovative solutions in the tech industry. We are always on the lookout for talented individuals passionate about technology and innovation. Explore our current opportunities below and apply today.
          </p>
        </div>
        
        <div className="flex flex-col gap-5 mb-24">
          {JOBS.map((job) => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJob(job)}
              className="group bg-white border border-gray-200 rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between hover:border-[#FF5A36]/50 hover:bg-[#FF5A36]/5 transition-all interactive cursor-none shadow-sm hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gray-100 text-[#111111] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full group-hover:bg-white group-hover:border group-hover:border-gray-200">{job.department}</span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {job.status}
                  </span>
                </div>
                <h3 className="font-display text-3xl text-[#111111] group-hover:text-accent transition-colors">{job.title}</h3>
                <p className="text-gray-500 font-sans mt-2 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Click to view details
                </p>
              </div>
              <div className="mt-6 md:mt-0 w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-[#FF5A36] group-hover:text-white transition-all group-hover:rotate-45 shadow-sm">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Why Join Us Section */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6 text-[#111111]">Why Join Us?</h2>
            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              At Sababisha Solutions, we believe in fostering a collaborative and inclusive work environment. We offer competitive salaries, comprehensive benefits, and opportunities for professional growth and development. Join us and be a part of a team that is shaping the future of technology.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="modal-backdrop absolute inset-0 bg-[#111111]/40 backdrop-blur-sm" 
            onClick={closeModal}
          ></div>
          
          <div className="modal-content relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${selectedJob.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {selectedJob.status}
                  </span>
                  <span className="text-gray-400 text-sm font-sans">{selectedJob.type}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-[#111111] leading-tight pr-8">
                  {selectedJob.title}
                </h2>
              </div>
              
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-[#111111] transition-colors interactive cursor-none shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto font-sans">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#111111] mb-3">Program Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-8">
                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#FF5A36]" /> Application Requirements
                </h3>
                <p className="text-gray-700">
                  {selectedJob.requirements}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" /> Apply via email
              </div>
              
              {selectedJob.status === "Active" ? (
                <a 
                  href={`mailto:${selectedJob.email}?subject=Application for ${selectedJob.title}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF5A36] text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide hover:bg-[#E84E2D] hover:shadow-lg hover:shadow-[#FF5A36]/20 transition-all interactive cursor-none"
                >
                  Apply Now <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <button 
                  disabled
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-400 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide cursor-not-allowed"
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
