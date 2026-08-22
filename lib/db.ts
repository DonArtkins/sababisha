import type {
  AITopic,
  Brand,
  GalleryItem,
  Product,
  RDBlog,
  Service,
  TeamDirectory,
  TeamMember,
} from "@/lib/types";

// Products Data
export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Maziwa",
    category: "Loan Management System",
    desc: "A microfinance and loan management platform for SACCOs, lending companies, and community finance teams that need digital client onboarding, loan tracking, repayment schedules, portfolio reporting, and faster credit operations.",
    features: ["Loan Management", "Client Tracking", "Financial Reporting"],
    image: "/images/projects/maziwa-bg.png",
    link: "https://maziwa.sababisha.com",
  },
  {
    id: 2,
    title: "Sheria Pro",
    category: "Law Firm Management System",
    desc: "A law firm management system for case files, client records, billing, hearings, document workflows, task tracking, and performance dashboards, helping legal teams improve accountability and reduce administrative delays.",
    features: [
      "Case and Client Management",
      "Billing and Invoicing",
      "Graphical Analysis",
    ],
    image: "/images/projects/sheria-pro-bg.png",
    link: "https://sheriapro.mcb.co.ke",
  },
  {
    id: 3,
    title: "BIMA",
    category: "Insurance Agency Management System",
    desc: "An insurance agency management platform for policy administration, renewals, underwriting support, client communication, claims visibility, commission tracking, and management reporting across growing insurance teams.",
    features: ["Policy Management", "Client Management", "Reporting Tools"],
    image: "/images/projects/bima-bg.png",
    link: "https://bima.sababisha.com",
  },
  {
    id: 4,
    title: "Microsoft Business Central",
    category: "ERP",
    desc: "A Microsoft Dynamics 365 Business Central ERP implementation and integration solution for finance, procurement, inventory, projects, approvals, reporting, and cross-department process automation.",
    features: [
      "Financial Management",
      "Supply Chain Management",
      "Project Management",
    ],
    image: "/images/products/microsoft-business-central-erp.png",
    link: "https://erp.sababisha.com/BC200",
  },
  {
    id: 5,
    title: "Members Self Service Portal (MSS)",
    category: "Portal",
    desc: "A secure member self-service portal that gives SACCOs, associations, and institutions digital access to member profiles, statements, requests, communication, contributions, approvals, and service updates.",
    features: [
      "Member Registration",
      "Self-Service Tools",
      "Communication Hub",
    ],
    image: "/images/projects/members-portal-bg.png",
    link: "https://membersportal.kar.co.ke",
  },
  {
    id: 6,
    title: "TIBA",
    category: "Hospital Management System",
    desc: "A hospital management system for patient registration, appointments, triage, pharmacy, laboratory, billing, staff workflows, medical records, and operational reporting across healthcare facilities.",
    features: [
      "Patient Management",
      "Appointment Scheduling",
      "Staff Management",
    ],
    image: "/images/projects/tiba-bg.png",
    link: "https://tiba.sababisha.com",
  },
  {
    id: 7,
    title: "Call Centre System",
    category: "Support",
    desc: "A customer support and call centre platform for ticket handling, agent performance, call tracking, customer history, escalation workflows, service-level monitoring, and real-time support analytics.",
    features: ["Call Tracking", "Agent Management", "Performance Reporting"],
    image: "/images/products/sababisha-call-center.png",
    link: "https://callcenter.sababisha.com",
  },
  {
    id: 8,
    title: "School ERP",
    category: "Education",
    desc: "An education ERP for schools and training institutions managing student records, admissions, fees, timetables, exams, parent communication, staff administration, and academic performance reporting.",
    features: [
      "Student Information System",
      "Timetable Management",
      "Parent Communication",
    ],
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    title: "Loyalty Portal",
    category: "Customer Engagement",
    desc: "A customer loyalty and rewards portal for points management, promotions, redemption workflows, customer segmentation, engagement analytics, campaign tracking, and repeat-business growth.",
    features: ["Points System", "Customer Analytics", "Promotions Management"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    title: "Check off System",
    category: "Finance",
    desc: "A check-off and payroll deduction system for employers, SACCOs, lenders, and finance teams that need accurate deductions, reconciliations, approvals, compliance reports, and predictable collections.",
    features: [
      "Payroll Integration",
      "Payment Scheduling",
      "Compliance Tracking",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 11,
    title: "HR System",
    category: "Human Resources",
    desc: "A human resource management system for employee records, recruitment, onboarding, leave, payroll coordination, performance tracking, approvals, policy compliance, and workforce reporting.",
    features: [
      "Employee Management",
      "Payroll Processing",
      "Recruitment Tools",
    ],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    title: "Fleet Management",
    category: "Logistics",
    desc: "A fleet management solution for vehicle tracking, route visibility, fuel usage, maintenance planning, driver records, cost control, incident reporting, and logistics performance monitoring.",
    features: [
      "Real-Time Tracking",
      "Maintenance Scheduling",
      "Fuel Management",
    ],
    image: "/images/products/fleet-management.png",
  },
  {
    id: 13,
    title: "M-Kodi",
    category: "Property Management System",
    desc: "A property management system for landlords, agents, and estate teams managing tenants, leases, rent collection, maintenance requests, arrears tracking, statements, and property performance reports.",
    features: [
      "Tenant Management",
      "Maintenance Requests",
      "Financial Reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 14,
    title: "Chama Management System (E-Ledger)",
    category: "Finance",
    desc: "A chama and investment group management system for contributions, member ledgers, loans, penalties, meeting records, approvals, reports, transparency, and accountable group finance operations.",
    features: [
      "Contribution Tracking",
      "Loan Management",
      "Financial Reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 15,
    title: "Accounting Software",
    category: "Accounting",
    desc: "Accounting and petty cash software for expense capture, approvals, reconciliations, budgets, ledgers, management reports, audit trails, and better visibility into day-to-day financial control.",
    features: ["Expense Tracking", "Financial Reporting", "Budget Management"],
    image: "/images/products/accounting-software.png",
  },
  {
    id: 16,
    title: "Credit Scoring Tool (Pesa Score)",
    category: "Finance",
    desc: "A credit scoring and risk assessment tool that helps lenders evaluate borrowers using structured data, scoring rules, affordability checks, portfolio insights, and responsible lending workflows.",
    features: ["Risk Assessment", "Automated Scoring", "Reporting Tools"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 17,
    title: "Architectural Firm Management Solution",
    category: "Management",
    desc: "A firm management solution for architects and project consultancies handling clients, project stages, drawings, approvals, resources, billing, team tasks, deadlines, and delivery reporting.",
    features: [
      "Project Management",
      "Resource Allocation",
      "Client Management",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 18,
    title: "MCB Payment Hub",
    category: "Enterprise Service Bus",
    desc: "An enterprise payment hub for integrating M-Pesa, banks, cards, gateways, reconciliation services, transaction monitoring, secure APIs, audit logs, and high-volume financial workflows.",
    features: [
      "Payment Gateway Integration",
      "Transaction Monitoring",
      "Security Features",
    ],
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  },
];

// Trusted brands / clients shown in the home marquee
export const BRANDS: Brand[] = [
  {
    name: "Ministry of Agriculture",
    domain: "kilimo.go.ke",
    logo: "/images/brands/ministry-of-agriculture.png",
  },
  {
    name: "Alpic Micro-Credit",
    domain: "alpic.co.ke",
    logo: "/images/brands/alpic-micro-credit.png",
  },
  {
    name: "CPHRM Group",
    domain: "career.cphrmgroup.co.ke",
    logo: "/images/brands/cphrm-group.png",
  },
  {
    name: "Dataghala",
    domain: "dataghala.com",
    logo: "/images/brands/dataghala.png",
  },
  {
    name: "Ecent Ventures",
    domain: "ecentventures.com",
    logo: "/images/brands/ecent-ventures.png",
  },
  {
    name: "FI",
    domain: "fi.co.ke",
    logo: "/images/brands/fi.png",
  },
  {
    name: "Fulusi Capital",
    domain: "fulusicapital.co.ke",
    logo: "/images/brands/fulusi-capital.png",
  },
  {
    name: "WestZone Capital",
    domain: "westzonecapital.com",
    logo: "/images/brands/westzone-capital.png",
  },
  {
    name: "Gepha Mart",
    domain: "gephamart.com",
    logo: "/images/brands/gepha-mart.png",
  },
  {
    name: "Jamcroc Micro Credit",
    domain: "jamcroc.com",
    logo: "/images/brands/jamcroc-micro-credit.png",
  },
  {
    name: "Jomoaa",
    domain: "jomoaa.com",
    logo: "/images/brands/jomoaa.png",
  },
  {
    name: "Olion Ventures",
    domain: "olionventures.com",
    logo: "/images/brands/olion-ventures.png",
  },
  {
    name: "Ozol Investments",
    domain: "ozolinvestments.com",
    logo: "/images/brands/ozol-investments.png",
  },
];

// Gallery Data
export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    title: "The Sababisha Solutions Family",
    desc: "The Sababisha Solutions family all together for a late-night photo — leadership, engineering, product, support, and operations side by side in branded gear, capturing the people behind every platform we ship.",
    image: "/images/gallery/sababisha-team.png",
    category: "Sababisha Team",
  },
  {
    id: 2,
    title: "The Sababisha Dev Team",
    desc: "The Sababisha Dev Team — the group behind the code, implementation, and integration of the softwares and solutions under Sababisha, from architecture and features through testing, deployment, and client go-live.",
    image: "/images/gallery/development-team.png",
    category: "Development Team",
  },
  {
    id: 3,
    title: "Celebrating How Far We've Come",
    desc: "The Sababisha team and family coming together to share memories and celebrate how far they have come — milestones, shipped products, and hard-won achievements over a delicious celebratory cake.",
    image: "/images/gallery/team-moments.png",
    category: "Teams Moments",
  },
];

// Gallery Filters
export const GALLERY_FILTERS = [
  "All",
  "Sababisha Team",
  "Development Team",
  "Teams Moments",
];

// AI Topics Data
export const AI_TOPICS: AITopic[] = [
  {
    title: "AI Infrastructure & Ollama",
    excerpt: "Learn how enterprises can deploy private local LLMs with Ollama, protect sensitive business data, reduce cloud dependency, and build secure AI assistants on owned infrastructure.",
    author: "David Maru",
    date: "12/2/2026",
    category: "AI Infrastructure",
    image: "/images/ai-topics/ollama.jpg",
    slug: "/explore/ai-topics/ollama",
    content: {
      subtitle: "Deploying private, scalable, and cost-aware AI infrastructure for enterprise teams that need local model control, data protection, and practical LLM workflows.",
    },
  },
  {
    title: "Natural Language Processing (NLP) with PyTorch",
    excerpt: "A practical guide to building AI-powered text intelligence with PyTorch, from tokenization and model training to fraud detection, support automation, and document processing.",
    author: "John Lokok",
    date: "5/03/2026",
    category: "AI Training Series",
    image: "/images/ai-topics/nlp-pytorch.jpg",
    slug: "/explore/ai-topics/nlp-pytorch",
    content: {
      subtitle: "Building AI-powered text intelligence systems for fintech, customer support, compliance, fraud detection, and automated document understanding.",
    },
  },
  {
    title: "LlamaIndex: Data Framework for LLM Applications",
    excerpt: "Explore how LlamaIndex connects private enterprise data, documents, APIs, and databases to LLM applications so teams can retrieve trusted context and generate better answers.",
    author: "Enock Borabu",
    date: "2026",
    category: "AI Data Engineering & Retrieval",
    image: "/images/ai-topics/llamaindex.jpg",
    slug: "/explore/ai-topics/llamaindex",
    content: {
      subtitle: "Connecting enterprise data to LLMs for retrieval-augmented generation, internal knowledge assistants, document search, and context-aware AI applications.",
    },
  },
  {
    title: "QLoRA: Advanced Model Fine-Tuning",
    excerpt:
      "Understand how QLoRA makes advanced model fine-tuning more affordable by reducing memory requirements while preserving performance for domain-specific enterprise AI use cases.",
    author: "Civious Rumaita",
    date: "2026",
    category: "AI Model Optimization",
    image: "/images/ai-topics/qlora.jpg",
    slug: "/explore/ai-topics/qlora",
  },
  {
    title: "Make.com: No-Code Automation & AI Agents",
    excerpt:
      "See how Make.com helps teams automate approvals, notifications, CRM updates, data movement, reporting, and AI-assisted workflows without building every integration from scratch.",
    author: "Sheila Samita",
    date: "16/02/2026",
    category: "Automation & AI Systems",
    image: "/images/ai-topics/make-automation.jpg",
    slug: "/explore/ai-topics/make-automation",
  },
  {
    title: "Fine-Tuning with LoRA / PEFT",
    excerpt: "A focused introduction to LoRA and PEFT for adapting large language models to business-specific tasks without the cost of full model retraining.",
    author: "Herman Alany",
    date: "2026",
    category: "AI Training Session",
    image: "/images/ai-topics/lora-peft.svg",
    slug: "/explore/ai-topics/lora-peft",
  },
];

// R&D Blogs Data
export const RD_BLOGS: RDBlog[] = [
  {
    title: "Prometheus, Grafana & Alertmanager",
    excerpt: "A practical look at using Prometheus, Grafana, and Alertmanager to monitor infrastructure, visualize application health, reduce downtime, and respond to incidents faster.",
    author: "John Korio",
    date: "4 Oct, 2024",
    category: "Monitoring",
    image: "/images/rd-blogs/prometheus-grafana.svg",
    slug: "/explore/rd-blogs/prometheus-grafana",
  },
  {
    title: "Caching Strategies",
    excerpt: "Learn how LRU, LFU, FIFO, LIFO, and random replacement caching strategies improve API speed, database performance, scalability, and user experience in production systems.",
    author: "Bethwel Kiptoo",
    date: "15 July, 2024",
    category: "UX Design",
    image: "/images/rd-blogs/caching-strategies.jpg",
    slug: "/explore/rd-blogs/caching-strategies",
  },
  {
    title: "Next.js (v14)",
    excerpt: "Explore key Next.js 14 concepts for modern web applications, including rendering patterns, routing improvements, caching behavior, streaming, and production-ready frontend architecture.",
    author: "Heman Alany",
    date: "15 Feb, 2025",
    category: "UI/UX Design",
    image: "/images/rd-blogs/nextjs-v14.svg",
    slug: "/explore/rd-blogs/nextjs-v14",
    content: {
      subtitle: "Modern frontend architecture, routing, rendering, caching, and user experience patterns for production Next.js applications.",
    },
  },
  {
    title: "POSTMAN",
    excerpt: "A hands-on guide to Postman for API testing, documentation, collections, environments, debugging, collaboration, and reliable backend integration workflows.",
    author: "John Korio",
    date: "3 May, 2024",
    category: "API testing",
    image: "/images/rd-blogs/postman-rd.jpg",
    slug: "/explore/rd-blogs/postman-rd",
  },
  {
    title: "Introduction to Flutter",
    excerpt: "An introduction to Flutter for building cross-platform mobile applications with reusable UI components, fast iteration, native-feeling experiences, and maintainable product delivery.",
    author: "Civious Rumaita",
    date: "3 May, 2024",
    category: "Flutter",
    image: "/images/rd-blogs/flutter-introduction.jpg",
    slug: "/explore/rd-blogs/flutter-introduction",
  },
];

// Team Data
export const TEAM: TeamDirectory = {
  management: [
    {
      id: 1,
      name: "David Opiyo",
      role: "Chief Executive Officer",
      image: "/images/team/david-opiyo.jpg",
    },
    {
      id: 2,
      name: "Sarah M.",
      role: "Chief Operating Officer",
      image: "/images/team/sarah-m.jpg",
    },
  ],
  leads: [
    {
      id: 3,
      name: "John K.",
      role: "Lead Engineer",
      image: "/images/team/john-k.jpg",
    },
    {
      id: 4,
      name: "Mercy N.",
      role: "Product Manager",
      image: "/images/team/mercy-n.jpg",
    },
    {
      id: 5,
      name: "Peter W.",
      role: "Design Lead",
      image: "/images/team/peter-w.jpg",
    },
  ],
  supervisors: [
    {
      id: 6,
      name: "Grace O.",
      role: "QA Supervisor",
      image: "/images/team/grace-o.jpg",
    },
    {
      id: 7,
      name: "Daniel K.",
      role: "Backend Supervisor",
      image: "/images/team/daniel-k.jpg",
    },
    {
      id: 8,
      name: "Lucy M.",
      role: "Frontend Supervisor",
      image: "/images/team/lucy-m.jpg",
    },
    {
      id: 9,
      name: "Kevin M.",
      role: "DevOps Supervisor",
      image: "/images/team/kevin-m.jpg",
    },
  ],
};

// Services Data
export const SERVICES: Service[] = [
  {
    slug: "innovative-fintech-solutions",
    title: "Innovative Fintech Solutions",
    category: "FINTECH",
    iconKey: "FINTECH",
    desc: "Secure fintech platforms for lending, payments, wallets, check-off workflows, credit scoring, reconciliation, and financial reporting, built for compliance, auditability, and transaction reliability.",
    points: [
      "Digital onboarding and payment workflows",
      "Security-first transaction architecture",
      "Regulatory-ready reporting integration",
    ],
  },
  {
    slug: "expert-consultancy",
    title: "Expert Consultancy",
    category: "ADVISORY",
    iconKey: "ADVISORY",
    desc: "Digital transformation consultancy that helps leaders define product strategy, system architecture, integration roadmaps, automation opportunities, governance controls, and measurable technology investment outcomes.",
    points: [
      "Roadmap and architecture planning",
      "Digital transformation strategy",
      "Risk, compliance, and governance guidance",
    ],
  },
  {
    slug: "enterprise-systems-development",
    title: "Enterprise Systems Development",
    category: "SYSTEMS",
    iconKey: "SYSTEMS",
    desc: "Mission-critical enterprise systems for multi-department workflows, user roles, approvals, APIs, reporting, data governance, and scalable infrastructure across growing organizations.",
    points: [
      "Cross-department process automation",
      "API-ready architecture for integrations",
      "Performance-focused platform engineering",
    ],
  },
  {
    slug: "advanced-analytics",
    title: "Advanced Analytics",
    category: "ANALYTICS",
    iconKey: "ANALYTICS",
    desc: "Analytics dashboards and reporting platforms that turn operational, financial, customer, and performance data into useful KPIs, trends, forecasts, and executive decision support.",
    points: [
      "Executive dashboards and KPI tracking",
      "Predictive and trend analysis modules",
      "Data quality and governance support",
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "ENGINEERING",
    iconKey: "ENGINEERING",
    desc: "Custom web, mobile, and internal business applications designed around your users, approvals, integrations, security needs, reporting workflows, and long-term growth plans.",
    points: [
      "Domain-specific workflow design",
      "Scalable backend and frontend systems",
      "Deployment-ready and maintainable codebase",
    ],
  },
  {
    slug: "ongoing-support-maintenance",
    title: "Ongoing Support & Maintenance",
    category: "LIFECYCLE",
    iconKey: "LIFECYCLE",
    desc: "Post-launch support, maintenance, monitoring, optimization, user assistance, security updates, and feature improvements that keep critical digital platforms dependable as business needs evolve.",
    points: [
      "Proactive monitoring and incident response",
      "Routine updates and performance tuning",
      "Dedicated technical support and optimization",
    ],
  },
];

function normalizeContentSlug(slug: string) {
  if (slug === "/en") return "/";
  return slug.startsWith("/en/") ? slug.slice(3) : slug;
}

// Helper function to get AI topic by slug
export function getAITopicBySlug(slug: string): AITopic | undefined {
  const normalized = normalizeContentSlug(slug);
  return AI_TOPICS.find((topic) => topic.slug === slug || topic.slug === normalized);
}

// Helper function to get R&D blog by slug
export function getRDBlogBySlug(slug: string): RDBlog | undefined {
  const normalized = normalizeContentSlug(slug);
  return RD_BLOGS.find((blog) => blog.slug === slug || blog.slug === normalized);
}

// Helper function to get product by ID
export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

// Helper function to get gallery item by ID
export function getGalleryItemById(id: number): GalleryItem | undefined {
  return GALLERY_DATA.find((item) => item.id === id);
}

// Helper function to get team member by ID
export function getTeamMemberById(id: number): TeamMember | undefined {
  return [...TEAM.management, ...TEAM.leads, ...TEAM.supervisors].find(
    (member) => member.id === id,
  );
}
