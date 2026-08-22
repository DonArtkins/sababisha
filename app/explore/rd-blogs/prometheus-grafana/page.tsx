"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CyberText } from "@/components/CyberText";
import { ArticleCommentForm } from "@/components/ArticleCommentForm";
import { getRDBlogBySlug } from "@/lib/db";

export default function PrometheusArticle() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const blog = getRDBlogBySlug("/explore/rd-blogs/prometheus-grafana");

  useEffect(() => {
    if (!headerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <main className="bg-[#EFEFEF] min-h-screen pt-32 pb-24 text-[#111111]">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header ref={headerRef} className="mb-12">
          <Link href="/explore/rd-blogs" className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-[#FF5A36] transition-colors interactive cursor-none mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <CyberText text="Back to R&D Blogs" speed={30} />
          </Link>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-tight mb-6">
            Prometheus, Grafana <br />
            <span className="text-accent relative inline-block">
              & Alertmanager
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-sans mb-8">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-semibold text-[#111111]">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5A36]" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span className="uppercase tracking-wider text-xs font-bold">{blog.category}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden aspect-video mb-16 bg-gray-200 relative p-6 sm:p-8">
          <OptimizedImage
            src={blog.image}
            alt={blog.title}
            priority
            loading="eager"
            wrapperClassName="w-full h-full"
            imageClassName="w-full h-full object-contain object-center"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="prose prose-lg prose-gray max-w-none font-sans leading-relaxed text-gray-700">
          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Prometheus?</h2>
          <p className="mb-6">
            Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability.
          </p>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Main Features:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Pull-based model:</strong> Prometheus scrapes metrics from configured targets.</li>
            <li><strong>Time-series database:</strong> Metrics are stored as time-stamped data.</li>
            <li><strong>PromQL:</strong> A powerful query language for aggregating and filtering metrics.</li>
            <li><strong>Service Discovery:</strong> Automatically discovers targets from cloud environments or custom configurations.</li>
          </ul>

          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Common Use Cases:</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Monitoring server performance (CPU, memory, disk usage)</li>
            <li>Application-level metrics (HTTP requests, error rates)</li>
            <li>Infrastructure monitoring (databases, containers)</li>
          </ul>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">How Prometheus Works</h2>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Architecture:</h3>
          <p className="mb-4">
            Prometheus scrapes metrics from configured targets at set intervals. Metrics are stored in a time-series database.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Prometheus server:</strong> Central component responsible for scraping and storing metrics.</li>
            <li><strong>Targets:</strong> Applications, databases, and systems exposing metrics.</li>
          </ul>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Data Collection Process:</h3>
          <p className="mb-4">
            Metrics are scraped via HTTP. Each target must expose a <code>/metrics</code> endpoint (e.g., Node Exporter).
          </p>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">PromQL Example:</h3>
          <div className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm mb-8 shadow-sm">
            rate(http_requests_total[5m])
          </div>
          <p className="mb-8 text-sm text-gray-500 mt-2">
            Finds the rate of HTTP requests over the past 5 minutes.
          </p>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Grafana?</h2>
          <p className="mb-6">
            Grafana is a data visualization platform that provides powerful dashboards and visual representations of real-time metrics.
          </p>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Customizable Dashboards</li>
            <li>Multi-source Support (Prometheus, Elasticsearch, etc.)</li>
            <li>Annotations (mark events on dashboards)</li>
            <li>Grafana Alerts (set up alerts directly from dashboards)</li>
          </ul>
          <p className="mb-8">
            <strong>Use Cases:</strong> Real-time infrastructure monitoring, tracking application performance, centralized monitoring for multiple systems and environments.
          </p>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">What is Alertmanager?</h2>
          <p className="mb-6">
            Alertmanager is a component in Prometheus that handles alerts generated based on defined rules.
          </p>
          <h3 className="font-display text-2xl text-[#111111] mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Alert Routing:</strong> Route alerts to different receivers like email, Slack.</li>
            <li><strong>Alert Grouping:</strong> Reduce noise by grouping similar alerts.</li>
            <li><strong>Silencing:</strong> Mute alerts temporarily.</li>
            <li><strong>Inhibition:</strong> Prevent cascading alerts.</li>
          </ul>
          <p className="mb-8">
            <strong>Use Cases:</strong> Notify DevOps teams when infrastructure or services go down, configure alerts for metric thresholds (e.g., CPU &gt; 80%).
          </p>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Alertmanager Architecture</h2>
          <p className="mb-4">
            <strong>Alert Flow:</strong> Prometheus evaluates alert rules. Alerts are sent to Alertmanager, which routes them to the appropriate channel (email, Slack, etc.).
          </p>
          <div className="bg-orange-50 border-l-4 border-[#FF5A36] p-4 rounded-r-xl mb-8">
            <strong className="text-[#111111]">Example:</strong> A high CPU alert triggers in Prometheus. Alertmanager routes it to Slack based on the configuration. The alert is grouped and notified to the appropriate team.
          </div>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Prometheus + Grafana + Alertmanager Integration</h2>
          <p className="mb-4">
            <strong>Monitoring Workflow:</strong> Prometheus scrapes and stores metrics, Grafana visualizes metrics via custom dashboards, and Alertmanager handles alert notifications.
          </p>
          <div className="bg-orange-50 border-l-4 border-[#FF5A36] p-4 rounded-r-xl mb-8">
            <strong className="text-[#111111]">Example:</strong> Prometheus scrapes HTTP requests metrics. Grafana visualizes requests and displays alert thresholds. Alertmanager triggers an alert when thresholds are exceeded.
          </div>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Exporters for Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-display text-xl text-[#111111] mb-3">Windows Exporter</h3>
              <p className="text-sm text-gray-600 mb-3">
                An open-source exporter for Prometheus that collects hardware and OS metrics from Windows systems.
              </p>
              <h4 className="font-bold text-sm text-[#111111]">Metrics Monitored:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mt-2">
                <li>CPU usage</li>
                <li>Memory utilization</li>
                <li>Disk I/O and free space</li>
                <li>Network traffic</li>
                <li>Windows services and processes</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-display text-xl text-[#111111] mb-3">Node Exporter</h3>
              <p className="text-sm text-gray-600 mb-3">
                An open-source exporter that exposes hardware and OS metrics from Linux servers, commonly used for collecting Linux server metrics in Prometheus.
              </p>
              <h4 className="font-bold text-sm text-[#111111]">Metrics Monitored:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mt-2">
                <li>CPU usage</li>
                <li>Memory utilization</li>
                <li>Disk I/O</li>
                <li>Network bandwidth and errors</li>
                <li>File system statistics</li>
              </ul>
            </div>
          </div>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 mb-8 space-y-4">
            <li><strong>Prometheus:</strong> Use service discovery for dynamic environments, keep data retention periods manageable, optimize scrape intervals for resource efficiency.</li>
            <li><strong>Grafana:</strong> Organize dashboards by team or service, use variables to create dynamic and reusable dashboards.</li>
            <li><strong>Alertmanager:</strong> Group and deduplicate alerts to avoid alert fatigue. Set up inhibition rules to avoid redundant alerts. Test alert configurations regularly.</li>
          </ul>

          <h2 className="font-display text-3xl text-[#111111] mt-10 mb-4">Resources and References</h2>
          <ul className="list-none space-y-3 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://medium.com/@abdullaeid/prometheus-security-a-guide-to-tls-and-basic-authentication-5c8f0c8e0c8e" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">Prometheus Security: A Guide to TLS and Basic Authentication… | by Abdullah Eid | Medium</Link>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://devconnected.com/alertmanager-and-prometheus-complete-setup/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">AlertManager and Prometheus Complete Setup on Linux – devconnected</Link>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">Install Grafana on Debian or Ubuntu | Grafana documentation</Link>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">Configure security | Grafana documentation</Link>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://grafana.com/docs/grafana/latest/setup-grafana/set-up-https/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">Set up Grafana HTTPS for secure web traffic | Grafana documentation</Link>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://prometheus.io/docs/prometheus/latest/installation/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">Installation | Prometheus</Link>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5A36] font-bold mt-1">→</span>
              <Link href="https://www.youtube.com/results?search_query=prometheus+grafana+alertmanager+setup" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:text-[#FF5A36] transition-colors underline decoration-gray-300 underline-offset-4 interactive cursor-none">YouTube Tutorial</Link>
            </li>
          </ul>
        </div>

        <ArticleCommentForm source="rd-blog" article={blog} />
      </article>
    </main>
  );
}
