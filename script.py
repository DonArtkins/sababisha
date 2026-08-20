import os

def create_page(filepath, title, subtitle, author, date, category, image, back_link, back_text, content_html):
    template = f'''"use client";
import {{ useEffect, useRef }} from "react";
import gsap from "gsap";
import {{ ArrowLeft, User, Calendar, Tag, MessageSquare, Send }} from "lucide-react";
import Link from "next/link";
import {{ OptimizedImage }} from "@/components/OptimizedImage";
import {{ CyberText }} from "@/components/CyberText";

export default function ArticlePage() {{
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {{
    const ctx = gsap.context(() => {{
      gsap.fromTo(
        headerRef.current,
        {{ y: 30, opacity: 0 }},
        {{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }}
      );
      gsap.fromTo(
        contentRef.current,
        {{ y: 40, opacity: 0 }},
        {{ y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }}
      );
    }});
    return () => ctx.revert();
  }}, []);

  return (
    <main className="bg-[#EFEFEF] min-h-screen pt-32 pb-24 text-[#111111]">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {{/* Header */}}
        <header ref={{headerRef}} className="mb-12">
          <Link href="{back_link}" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="{back_text}" speed={{30}} />
          </Link>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            {title} <br />
            <span className="italic text-[#FF5A36] relative inline-block mt-2">
              {subtitle}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF5A36]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-semibold text-[#111111]">{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5A36]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span className="uppercase tracking-wider text-xs font-bold">{category}</span>
            </div>
          </div>
        </header>

        {{/* Featured Image */}}
        <div className="rounded-[2rem] overflow-hidden aspect-video mb-16 bg-gray-200 relative">
          <OptimizedImage 
            src="{image}" 
            alt="{title}" 
            wrapperClassName="absolute inset-0 w-full h-full"
            imageClassName="w-full h-full object-cover"
          />
        </div>

        {{/* Content */}}
        <div ref={{contentRef}} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700 space-y-6">
          {content_html}
        </div>

        {{/* Comments Section */}}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-6 h-6 text-[#FF5A36]" />
            <h3 className="font-display text-3xl text-[#111111]">Leave a comment</h3>
          </div>
          
          <form className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your name"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans font-bold text-[#111111] ml-2">Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all interactive cursor-none" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-sans font-bold text-[#111111] ml-2">Message</label>
              <textarea 
                rows={{5}} 
                placeholder="Type your message here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-[#111111] placeholder:text-gray-400 focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] outline-none transition-all resize-none interactive cursor-none" 
              />
            </div>
            
            <div className="pt-2">
              <button type="button" className="group inline-flex items-center justify-center gap-2 bg-[#FF5A36] text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide uppercase hover:bg-[#E84E2D] hover:shadow-lg hover:shadow-[#FF5A36]/20 transition-all interactive cursor-none">
                <CyberText text="Submit Comment" speed={{20}} />
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </article>
    </main>
  );
}}
'''
    with open(filepath, 'w') as f:
        f.write(template)

caching_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Caching Strategy</h2>
<p>A cache is hardware or software that is used to store something, usually data, temporarily in a computing environment. Cache management strategies are used to determine which data to keep in the cache and which data to remove when the cache is full and needs to make room for new data.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">How does a cache Work?</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Cache-hit:</strong> if the clients attempts to access the data and the address is found in the address location.</li>
  <li><strong>Cache-miss:</strong> the data is not found in the cache and the information pulled from the main memory and stored in the cache.</li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">1. Least Recently Used (LRU)</h2>
<p>Least Recently Used (LRU) is a caching algorithm in which the least recently used cache block is removed whenever the cache is overflowed.</p>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How LRU Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Cache-size(memory storage) → Request (get/put) → Frequency → Recently accessed</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">2. Least Frequently Used (LFU)</h2>
<p>Least Frequently Used (LFU) is a caching algorithm in which the least frequently used cache block is removed whenever the cache is overflowed.</p>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How LFU Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Put get → Frequency → Cache-size → Recently accessed</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">3. FIFO</h2>
<p>FIFO (First-In, First-Out) cache is a cache management policy where the first item added to the cache is the first one to be removed when the cache reaches its maximum capacity. It operates on the principle of queue data structure.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">How FIFO works</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Queue:</strong> A simple queue (or list) is used to maintain the order of insertion. The oldest items are at the front, and the newest items are at the back.</li>
  <li><strong>Hash Map (Optional):</strong> Often used alongside a queue to map keys to values for efficient access.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Operation of FIFO</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Insert (key, value):</strong> Add the new item to the back of the queue. If the cache is full, remove the item at the front. <em>Time Complexity: O(1)</em></li>
  <li><strong>Access (key):</strong> If the item is in the cache, it can be accessed directly. <em>Time Complexity: O(1)</em></li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">4. LIFO</h2>
<p>LIFO (Last-In, First-Out) cache is a cache management policy where the most recently added item is the first one to be removed when the cache reaches its maximum capacity. It operates on the principle of stack data structure.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Operation</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Insert (key, value):</strong> Add the new item to the back of the queue. If full, remove the recent item. <em>Time Complexity: O(1)</em></li>
  <li><strong>Access (key):</strong> Accessed directly via hash map. <em>Time Complexity: O(1)</em></li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">5. Random Replacement</h2>
<p>A cache management policy where items are removed randomly when the cache reaches its maximum capacity.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Applications</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Web Browsers:</strong> Store frequently accessed resources (like images, CSS files).</li>
  <li><strong>Content Delivery Networks (CDNs):</strong> Cache web content closer to the user's location.</li>
  <li><strong>Database Query Caching:</strong> Serve frequently requested data without re-executing the queries.</li>
  <li><strong>API Gateways:</strong> Cache API responses to reduce backend load.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Advantages and Disadvantages</h3>
<p><strong>Advantages:</strong> Improved Performance and Reduced Latency, Reduced Load on Primary Data Sources, Scalability.</p>
<p><strong>Disadvantages:</strong> Cache Miss Penalty, Memory and Storage Overhead.</p>"""

nextjs_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Next.js?</h2>
<p>In today's rapidly evolving web development landscape, building performant, scalable, and SEO-friendly applications can be challenging. Next.js is a React-based framework that provides all the tools needed to build server-rendered and statically-generated web applications with ease.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">History of Next.js</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Version 9:</strong> Dynamic Routing, API Routes</li>
  <li><strong>Version 10:</strong> Image Optimization, ISR</li>
  <li><strong>Version 11:</strong> Automatic Image Optimization</li>
  <li><strong>Version 12:</strong> Middleware, Webpack 5</li>
  <li><strong>Version 13:</strong> Rust Compiler, React Server Components</li>
  <li><strong>Latest Version (14):</strong> Enhanced React Server Components, Improved Developer Tools, Performance and Scalability Enhancements</li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Client Components vs Server Components</h2>
<p>Next.js 14 introduces the ability to use React Server Components alongside traditional Client Components.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2">Client Components</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Rendered on the client side.</li>
      <li>Suitable for highly interactive UI.</li>
    </ul>
  </div>
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2">Server Components</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Rendered on the server side.</li>
      <li>Reduce JavaScript sent to the client.</li>
      <li>Enhance performance (TTI).</li>
    </ul>
  </div>
</div>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`// pages/index.js
import ClientComponent from '../components/ClientComponent';
import ServerComponent from '../components/ServerComponent';

export default function Home() {
  return (
    <>
      <ClientComponent />
      <ServerComponent />
    </>
  );
}`}</code></pre>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Data Fetching Methods</h2>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Server Side Rendering (SSR)</h3>
<p>SSR allows you to render your React components on the server, generating HTML that is sent to the client. This improves SEO and performance for the initial load.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}`}</code></pre>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Static Site Generation (SSG) & ISR</h3>
<p>SSG pre-renders pages at build time. ISR enables you to use static generation on a per-page basis, allowing you to update static content without rebuilding the entire site.</p>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return {
    props: { data },
    revalidate: 10, // ISR: Revalidate every 10 seconds
  };
}`}</code></pre>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Conclusion</h2>
<p>Next.js 14 brings numerous enhancements and new features, making it an excellent choice for building modern web applications. Whether you're looking to improve SEO, performance, or development experience, Next.js provides the tools and flexibility to achieve your goals.</p>"""

postman_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Postman?</h2>
<p>In today's fast-paced digital landscape, APIs (Application Programming Interfaces) serve as the backbone of modern software development. However, managing APIs efficiently can be a daunting task, often leading to bottlenecks in development cycles and hindering innovation.</p>
<p>This is where Postman steps in. Postman is not just a tool; it's a comprehensive API development environment that empowers developers to streamline every stage of the API lifecycle. From designing and testing to monitoring and collaboration, Postman offers a unified platform to simplify complex workflows and accelerate development processes.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Why Postman Matters</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>Design APIs with ease using its intuitive interface and powerful schema support.</li>
  <li>Test APIs thoroughly with automated testing suites, saving time and ensuring reliability.</li>
  <li>Collaborate seamlessly with team members, fostering productivity and innovation.</li>
  <li>Monitor API performance in real-time to identify and address issues proactively.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">API Design and Documentation</h3>
<p>Postman provides a user-friendly interface for designing APIs using industry-standard schemas like OpenAPI (formerly Swagger) and RAML. Generate comprehensive API documentation automatically from your designs, ensuring clarity and consistency for developers consuming your APIs.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Automated Testing</h3>
<p>Create and run automated tests for your APIs, allowing you to catch bugs early in the development process. Utilize a wide range of testing tools, including assertions, scripts, and dynamic variables, to ensure the reliability and stability of your APIs.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Mock Servers & Monitoring</h3>
<p>Generate mock servers based on your API designs, enabling front-end and back-end developers to work independently and in parallel. Monitor API performance in real-time with Postman Monitors, enabling you to detect and address issues before they impact users.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Conclusion</h2>
<p>Postman is more than just an API client; it's a comprehensive platform designed to empower developers and teams to build, test, and collaborate on APIs efficiently. By leveraging its powerful features and functionalities, you can streamline your API development process, accelerate time-to-market, and deliver high-quality software products that delight users.</p>"""

flutter_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Flutter?</h2>
<p>Flutter is an open-source UI software development kit (SDK) created by Google. It is used for building natively compiled applications for mobile, web, and desktop from a single codebase. Flutter allows developers to use a single codebase to create beautiful and high-performance applications across multiple platforms.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">How Does it Compare to React?</h2>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Similarities</h3>
<ul className="list-disc pl-6 mb-6 space-y-2">
  <li><strong>UI Components:</strong> Both follow a component-based architecture, promoting code reusability and modularity.</li>
  <li><strong>Cross-Platform:</strong> Both support building applications across multiple platforms.</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Differences</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2 text-blue-500">Flutter</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Employs immediate mode rendering directly onto the canvas.</li>
      <li>Integrates with native features through platform channels.</li>
      <li>Used by Alibaba, Google Ads, and Tencent.</li>
    </ul>
  </div>
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <h4 className="font-bold text-[#111111] mb-2 text-cyan-500">React</h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
      <li>Utilizes virtual DOM rendering.</li>
      <li>Relies on libraries and APIs for native feature integration.</li>
      <li>Favored by Facebook, Instagram, and WhatsApp.</li>
    </ul>
  </div>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Stateful vs Stateless Widgets</h2>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Stateful Widgets</h3>
<p>Stateful widgets are a crucial concept in Flutter, allowing you to manage mutable state within your user interface. They can change their state over time in response to user interactions, network requests, animations, or other factors via the <code>setState()</code> method.</p>
<h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Stateless Widgets</h3>
<p>Stateless widgets do not have any mutable state. Once built, they remain unchanged and cannot be directly updated. Ideal for displaying static content such as text, images, icons, and simple UI components.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">BLOC (Business Logic Component)</h2>
<p>BLoC is a design pattern introduced by Google, which helps in managing state and handling events in Flutter applications. It promotes separation of concerns by separating the business logic from the UI layer.</p>
<p>BLoCs typically use streams or sinks to communicate changes in state to the UI layer. Streams represent a sequence of asynchronous events, while sinks are used to send events to a stream.</p>
<div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 my-8 text-center text-lg italic text-gray-700">
  "Unlock the power of Flutter and BLoC: where stateful widgets become state-of-the-art experiences!" <br/> — ArcNigri
</div>"""

nlp_pytorch_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is NLP?</h2>
<p>Natural Language Processing (NLP) is a branch of AI that enables machines to understand, interpret, and generate human language. It powers systems that can analyze text, extract meaning, and make intelligent decisions based on language data.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Core Concepts</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>PyTorch Foundations:</strong> Tensors for numerical computation, Training loops (forward pass, loss, backpropagation, optimization)</li>
  <li><strong>Text Processing:</strong> Tokenization (converting text into machine-readable format), Word embeddings (numerical representation of text)</li>
  <li><strong>Modeling Techniques:</strong> LSTM (Long Short-Term Memory networks) for sequence learning, Text classification models for predictions</li>
</ul>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">Processing Pipeline</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Input Text → Tokenization → Numerical Encoding → Model Processing → Output Prediction</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Fintech Applications of NLP</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Customer Support Automation:</strong> Automated responses, smart ticket routing, and 24/7 availability</li>
  <li><strong>Fraud Detection:</strong> Detect phishing and suspicious messages, flag high-risk transactions</li>
  <li><strong>Sentiment Analysis:</strong> Analyze customer feedback and identify dissatisfaction early</li>
  <li><strong>KYC / AML Document Processing:</strong> Extract and verify identity data, automate onboarding workflows</li>
  <li><strong>Transaction Categorization:</strong> Automatically classify expenses and improve financial tracking</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Example: Fraud Detection Workflow</h3>
<pre className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 overflow-x-auto shadow-sm"><code>{`Input: Customer message or transaction note
→ Tokenized into sequences
→ Processed by LSTM model
→ Output: Fraud probability score

If score > threshold → Alert triggered`}</code></pre>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Implementation Roadmap & Best Practices</h2>
<p>Start simple (LSTM) before scaling to Transformers. Use real company data for better accuracy. Focus on high-impact use cases (fraud, support, insights) and ensure explainability for decision-making.</p>"""

llamaindex_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is LlamaIndex?</h2>
<p>LlamaIndex is an open-source framework that bridges private data and Large Language Models (LLMs), enabling efficient ingestion, indexing, and querying for AI applications.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Main Features</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>Data ingestion from APIs, PDFs, databases, and spreadsheets</li>
  <li>Flexible indexing (Vector, Tree, List, Keyword)</li>
  <li>Natural language querying</li>
  <li>Retrieval-Augmented Generation (RAG)</li>
</ul>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How It Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Data → Indexing → Query Engine → Context-Aware Response</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Use Cases</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>Conversational chatbots</li>
  <li>Semantic search engines</li>
  <li>Knowledge agents</li>
  <li>Enterprise data augmentation</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Advantages & Challenges</h3>
<p><strong>Advantages:</strong> Flexible indexing, powerful retrieval, seamless integrations.</p>
<p><strong>Challenges:</strong> Resource-intensive, latency in large datasets, scaling complexity.</p>"""

qlora_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is QLoRA?</h2>
<p>QLoRA (Quantized Low-Rank Adaptation) is a parameter-efficient fine-tuning technique that enables training of massive LLMs by combining 4-bit quantization with lightweight LoRA adapters. It significantly reduces memory usage while maintaining high model performance.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">The QLoRA Workflow</h2>
<ul className="list-decimal pl-6 mb-8 space-y-2">
  <li><strong>Quantize:</strong> Compress the base model into 4-bit precision</li>
  <li><strong>Add LoRA:</strong> Inject trainable adapter layers</li>
  <li><strong>Train:</strong> Update only LoRA parameters</li>
  <li><strong>Deploy:</strong> Use optimized model for inference</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Architecture Overview</h3>
<p>It consists of a frozen 4-bit quantized base model and trainable LoRA adapter layers, combined in the inference pipeline.</p>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Benefits & Use Cases</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Resource Efficiency:</strong> Fine-tune large models on limited hardware</li>
  <li><strong>Cost Reduction:</strong> Lower GPU and infrastructure costs</li>
  <li><strong>Modular Design:</strong> Swap LoRA adapters for different tasks</li>
  <li><strong>High Performance:</strong> Near full fine-tuning accuracy</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Enterprise Applications</h3>
<p>Custom enterprise chatbots, domain-specific AI assistants, code generation systems, and financial/analytics models.</p>"""

make_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Make.com?</h2>
<p>Make.com is a powerful no-code automation platform that connects applications and automates workflows using trigger-action logic. With built-in AI capabilities, it goes beyond simple automation to enable intelligent, decision-making systems.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Key Features</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>Visual drag-and-drop workflow builder</li>
  <li>2,000+ app integrations</li>
  <li>AI-powered decision making</li>
  <li>Real-time and scheduled automation</li>
  <li>Advanced logic (filters, branching, error handling)</li>
</ul>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm">
  <h4 className="font-bold text-[#111111] mb-2">How It Works</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Trigger → Actions → Logic → Output</p>
  <p className="mt-4 text-sm text-gray-600">An event (like a form submission or email) triggers a workflow, which then executes a sequence of actions, applies logic, and produces results automatically.</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Real-World Use Cases</h2>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li><strong>Lead Capture:</strong> Save leads and send instant responses</li>
  <li><strong>Bug Tracking:</strong> Sync GitHub issues with Jira and Slack</li>
  <li><strong>E-Commerce:</strong> Automate orders, inventory, and emails</li>
  <li><strong>AI Support Bots:</strong> Respond to customers automatically</li>
  <li><strong>Reporting:</strong> Generate and send AI-powered summaries</li>
</ul>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Why Teams Choose Make.com</h3>
<p>Cost Efficiency, No-Code Simplicity, Scalability, and AI Integration.</p>"""

lora_html = """<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Overview</h2>
<p>LoRA (Low-Rank Adaptation) and PEFT (Parameter-Efficient Fine-Tuning) enable organizations to fine-tune large language models without retraining entire models. This drastically reduces computational cost, memory usage, and infrastructure requirements while maintaining high performance.</p>
<h3 className="font-display text-2xl text-[#111111] mt-8 mb-4">Key Benefits</h3>
<ul className="list-disc pl-6 mb-8 space-y-2">
  <li>~90% fewer trainable parameters</li>
  <li>≈1:1 performance compared to full fine-tuning</li>
  <li>Low-rank adapters (r ≈ 8) for efficient updates</li>
</ul>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What You Will Learn</h2>
<ol className="list-decimal pl-6 mb-8 space-y-4">
  <li><strong>The Problem Space:</strong> Why traditional fine-tuning fails for most organizations due to cost and scale.</li>
  <li><strong>What is LoRA?</strong> Low-rank matrix decomposition and how it reduces training cost.</li>
  <li><strong>PEFT Architecture:</strong> Frozen base model with lightweight LoRA layers.</li>
  <li><strong>Training Pipeline:</strong> Forward pass, loss, backpropagation — only adapters update.</li>
  <li><strong>HuggingFace PEFT:</strong> Using LoRAConfig and get_peft_model for implementation.</li>
  <li><strong>Live Demo:</strong> Transforming generic AI into domain-specific intelligence.</li>
</ol>
<div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm text-center">
  <h4 className="font-bold text-[#111111] mb-2 uppercase tracking-wider text-sm">Model Architecture</h4>
  <p className="font-mono text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">Base Model (FROZEN) + LoRA Adapters (TRAINABLE) = Fine-Tuned Model (OUTPUT)</p>
</div>
<h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Tech Stack</h2>
<p>Python, PyTorch, HuggingFace Transformers, PEFT Library, GPT / LLaMA</p>"""

# Write all files
pages = [
    ("app/[lang]/explore/rd-blogs/caching-strategies/page.tsx", "Caching Strategies", "UX Design", "Bethwel Kiptoo", "15 July, 2024", "UX Design", "/images/img5.jpg", "/en/explore/rd-blogs", "Back to R&D Blogs", caching_html),
    ("app/[lang]/explore/rd-blogs/nextjs-v14/page.tsx", "Next.js (v14)", "UI/UX Design", "Heman Alany", "15 Feb, 2025", "Frontend", "/images/img5.jpg", "/en/explore/rd-blogs", "Back to R&D Blogs", nextjs_html),
    ("app/[lang]/explore/rd-blogs/postman-rd/page.tsx", "POSTMAN", "API testing", "John Korio", "3 May, 2024", "API", "/images/img1.jpg", "/en/explore/rd-blogs", "Back to R&D Blogs", postman_html),
    ("app/[lang]/explore/rd-blogs/flutter-introduction/page.tsx", "Introduction to Flutter", "Cross-Platform Framework", "Civious Rumaita", "3 May, 2024", "Mobile", "/images/img5.jpg", "/en/explore/rd-blogs", "Back to R&D Blogs", flutter_html),
    ("app/[lang]/explore/ai-topics/nlp-pytorch/page.tsx", "Natural Language Processing (NLP) with PyTorch", "Building AI-Powered Text Intelligence Systems", "John Lokok", "5/03/2026", "AI Training Series", "/images/img6.jpg", "/en/explore/ai-topics", "Back to AI Topics", nlp_pytorch_html),
    ("app/[lang]/explore/ai-topics/llamaindex/page.tsx", "LlamaIndex: Data Framework", "Connecting enterprise data to LLMs", "Enock Borabu", "2026", "Data Frameworks", "/images/img1.jpg", "/en/explore/ai-topics", "Back to AI Topics", llamaindex_html),
    ("app/[lang]/explore/ai-topics/qlora/page.tsx", "QLoRA: Advanced Model Fine-Tuning", "Efficiently training large language models", "Civious Rumaita", "2026", "Model Optimization", "/images/img6.jpg", "/en/explore/ai-topics", "Back to AI Topics", qlora_html),
    ("app/[lang]/explore/ai-topics/make-automation/page.tsx", "Make.com Automation", "No-Code Automation with AI Agents", "Sheila Samita", "16/02/2026", "Automation & AI Systems", "/images/img1.jpg", "/en/explore/ai-topics", "Back to AI Topics", make_html),
    ("app/[lang]/explore/ai-topics/lora-peft/page.tsx", "Fine-Tuning with LoRA / PEFT", "Parameter-Efficient Fine-Tuning for LLMs", "Herman Alany", "2026", "AI Training Session", "/images/img6.jpg", "/en/explore/ai-topics", "Back to AI Topics", lora_html),
]

for p in pages:
    create_page(*p)

print("Created all pages.")
