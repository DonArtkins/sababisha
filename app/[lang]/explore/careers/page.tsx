import { ArrowUpRight } from "lucide-react";
import { CyberText } from "@/components/CyberText";

const JOBS = [
  { title: "Senior Frontend Engineer", location: "Remote", type: "Full-Time", department: "Engineering" },
  { title: "Product Designer", location: "Nairobi, Kenya", type: "Full-Time", department: "Design" },
  { title: "Machine Learning Engineer", location: "Remote", type: "Full-Time", department: "AI & Data" },
  { title: "Enterprise Sales Executive", location: "London, UK", type: "Full-Time", department: "Sales" },
];

export function Careers() {
  return (
    <main className="bg-transparent pt-32 min-h-screen text-[#111111]">
      <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="uppercase font-sans tracking-widest text-xs text-accent font-semibold block mb-4">JOIN US</span>
          <h1 className="font-display text-5xl md:text-7xl mb-6">Build the <span className="text-accent italic">Future</span></h1>
          <p className="text-gray-500 font-sans text-lg max-w-2xl mx-auto">We are always looking for passionate engineers, designers, and thinkers to join our mission of digital transformation.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {JOBS.map((job, i) => (
            <div key={i} className="group bg-white border border-gray-200 rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between hover:border-accent/50 transition-colors interactive cursor-none shadow-sm hover:shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gray-100 text-[#111111] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">{job.department}</span>
                  <span className="text-gray-400 text-sm font-sans">{job.type}</span>
                </div>
                <h3 className="font-display text-2xl text-[#111111] group-hover:text-accent transition-colors">{job.title}</h3>
                <p className="text-gray-500 font-sans mt-2">{job.location}</p>
              </div>
              <button className="mt-6 md:mt-0 w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors group-hover:-rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  );
}

export default Careers;
