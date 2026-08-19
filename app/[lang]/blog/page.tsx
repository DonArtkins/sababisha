import { OptimizedImage } from "@/components/OptimizedImage";

export function Blog() {
  const posts = [
    { 
      title: "How AI Voice Agents Are Tripling Sales Pipelines", 
      date: "Oct 24, 2024", 
      category: "AI & Sales",
      img: "/images/img6.jpg"
    },
    { 
      title: "The Ultimate Guide to CRM Synchronization", 
      date: "Sep 12, 2024", 
      category: "Engineering",
      img: "/images/img5.jpg"
    },
    { 
      title: "Sababisha Selected for Best AI Innovation", 
      date: "Aug 05, 2024", 
      category: "Company News",
      img: "/images/img6.jpg"
    }
  ];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto mt-16">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-4">
            Our <span className="text-accent relative inline-block">
              Blog<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Insights
          </h1>
          <p className="text-gray-600 font-sans text-lg">Our Blog Insights Include</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-none interactive">
              <div className="aspect-video rounded-3xl mb-6 overflow-hidden relative shadow-sm border border-gray-100">
                <OptimizedImage src={post.img} alt={post.title} wrapperClassName="absolute inset-0 w-full h-full" imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="flex items-center gap-4 text-xs font-sans font-semibold tracking-wide text-accent mb-3 uppercase">
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-2xl font-display font-semibold text-[#111111] group-hover:text-accent transition-colors">
                {post.title}
              </h2>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Blog;
