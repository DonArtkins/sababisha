import { ArrowRight } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { OptimizedImage } from "@/components/OptimizedImage";

const TOPICS = [
  {
    title: "Generative AI in Corporate Finance",
    excerpt: "How large language models are transforming financial forecasting, reporting, and fraud detection in real-time.",
    date: "August 02, 2026",
    category: "AI & Finance",
    image: "/images/img6.jpg"
  },
  {
    title: "Predictive Analytics for Logistics",
    excerpt: "Using machine learning to optimize supply chain routes, predict demand, and reduce operational costs.",
    date: "July 15, 2026",
    category: "AI & Logistics",
    image: "/images/img6.jpg"
  },
  {
    title: "AI-Powered Patient Triage",
    excerpt: "Exploring the ethical and technical challenges of implementing AI decision support in critical healthcare systems.",
    date: "June 28, 2026",
    category: "AI & Healthcare",
    image: "/images/img1.jpg"
  }
];

export function AITopics() {
  return (
    <main className="bg-transparent pt-32 min-h-screen text-[#111111]">
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              AI<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Topics
          </h1>
          <p className="text-gray-600 font-sans text-lg">Our AI Topics Include</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOPICS.map((topic, i) => (
            <div key={i} className="group cursor-none interactive">
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] mb-6 bg-gray-100 relative">
                <OptimizedImage 
                  src={topic.image} 
                  alt={topic.title} 
                  wrapperClassName="absolute inset-0 w-full h-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-sans font-semibold uppercase tracking-wider text-gray-500 mb-3">
                <span className="text-accent">{topic.category}</span>
                <span>•</span>
                <span>{topic.date}</span>
              </div>
              <h3 className="font-display text-2xl text-[#111111] leading-tight mb-3 group-hover:text-accent transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-500 font-sans text-sm mb-6 line-clamp-2">
                {topic.excerpt}
              </p>
              <button className="flex items-center gap-2 text-sm text-[#111111] font-sans font-semibold group-hover:gap-3 transition-all">
                <CyberText text="Explore Topic" speed={40} />
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  );
}

export default AITopics;
