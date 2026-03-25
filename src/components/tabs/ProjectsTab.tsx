import { useState } from "react";
import rec1 from "../../assets/recruitpro/rec1.png";
import rec2 from "../../assets/recruitpro/rec2.png";
import rec3 from "../../assets/recruitpro/rec3.png";

import ho1 from "../../assets/homerepair/ho1.png"
import ho2 from "../../assets/homerepair/ho2.png"
import ho3 from "../../assets/homerepair/ho3.png"

import fin1 from "../../assets/finance/fin1.png"
import fin2 from "../../assets/finance/fin2.png"
import fin3 from "../../assets/finance/fin3.png"

import vis1 from "../../assets/visionai/vis1.png"


const projects = {
  fullstack: [
    {
      title: "  RecruitPro",
      description: "RecruitPro is an end-to-end talent acquisition platform designed to bridge the gap between high-caliber professionals and forward-thinking organizations through intelligent automation. It streamlines the entire hiring lifecycle—from automated job distribution and resume parsing to collaborative interview scheduling and digital onboarding—all within a centralized dashboard. By focusing on data-driven matching and bias reduction, the platform helps recruitment teams cut down time-to-hire significantly while ensuring a seamless, professional experience for every candidate.",
      tech: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "Stripe", "Hugging Face"],
      github: "https://github.com/anasshafiq12/proj-recruitpro.git",
      images: [
        rec1,
        rec2,
        rec3,
      ],
      year: "2026",
    },
    {
      title: "ElectroFix",
      description: "ElectroFix serves as a comprehensive digital bridge between homeowners, professional technicians, and specialized hardware vendors. The platform streamlines the entire property maintenance lifecycle by offering on-demand service booking alongside a robust multi-vendor marketplace for repair parts and home improvement goods. With a centralized administration suite to oversee service quality, dispute resolution, and vendor payouts, it transforms fragmented home maintenance into a seamless, end-to-end consumer experience.",
      tech: ["ASP .Net", "Blazor", "MsSQL", "Socket.io", "OpenAI API"],
      github: "https://github.com/anasshafiq12/HomeRepairApp.git",
      images: [
        ho1,
        ho2,
        ho3
      ],
      year: "2025",
    },
    {
      title: "Expense Tracker",
      description: "This finance management ecosystem empowers users to take full control of their fiscal health through intelligent automation and real-time data visualization. By integrating advanced OCR (Optical Character Recognition) technology, the platform eliminates manual data entry by instantly transforming physical receipts and invoices into structured digital records. Beyond simple expense tracking, the system provides deep analytical insights into spending patterns, automated budget alerts, and secure cloud synchronization for a holistic view of personal or business capital. It serves as a centralized financial command center, bridging the gap between raw transaction data and actionable wealth-management strategies.",
      tech: ["React", "FastAPI", "PostgreSQL", "Computer Vision", "AWS S3"],
      github: "https://github.com/anasshafiq12/proj-finance-tracker.git",
      images: [
        fin1,
        fin2,
        fin3
      ],
      year: "2025",
    },
  ],
  backend: [
    {
      title: "Project Suggestion Microservice",
      description: "This service is a high-performance, enterprise-grade recommendation engine designed to deliver deeply personalized consumer experiences through advanced semantic understanding. By leveraging Vector Databases and Approximate Nearest Neighbor (ANN) search, the system transcends traditional keyword matching to identify complex relationships between products and user behaviors with sub-second latency. The architecture utilizes asynchronous task queues to handle high-dimensional embedding generation, ensuring the platform remains responsive even when processing massive data updates or catalog expansions..",
      tech: ["FastAPI", "Celery", "PostgreSQL", "Docker"],
      github: "https://github.com/anasshafiq12/proj-product-recommendation.git",
      year: "2026",
      stats: [{ label: "Uptime", value: "99.9%" }, { label: "Latency", value: "<10ms" }],
    },
    {
      title: "WorkSphere",
      description: "This is a project management backend engineered to streamline complex organizational workflows and enhance cross-functional team collaboration. Built as a robust ASP.NET service, it serves as the centralized engine for task orchestration, resource allocation, and real-time progress tracking across diverse project portfolios. By providing a scalable and secure infrastructure for managing data-driven roadmaps, WorkSphere ensures that high-level project goals are seamlessly translated into actionable, measurable milestones.",
      tech: ["ASP. NET", "GraphQL", "MsSQL Server", "gRPC"],
      github: "https://github.com/anasshafiq12/WorkSphere-Backend.git",
      year: "2024",
      status: "Production",
      stats: [{ label: "Services", value: "12" }, { label: "Queries/day", value: "10+" }, { label: "P99", value: "45ms" }],
    },
  ],
  aiml: [
    {
      title: "VisionAI",
      description: "VisionAI is an advanced computer vision ecosystem designed to transform raw visual data into actionable intelligence through real-time object detection and spatial analysis. The platform serves as an intelligent system capable of identifying, tracking, and classifying multiple entities simultaneously with high precision and minimal latency. By bridging the gap between hardware input and cognitive understanding, it enables automated monitoring, safety compliance, and data-driven decision-making across diverse environments.",
      tech: ["Python", "FastAPI", "LangChain", "Pinecone", "React"],
      github: "https://github.com/anasshafiq12/proj-visionai.git",
      image: vis1,
      year: "2025",
      status: "Live",
      showImage: true,
    },
    {
      title: "FaceForge",
      description: "This is computer vision app to perform high-precision facial analysis and real-time image manipulation. By extracting granular facial landmarks—mapping key coordinate points across the eyes, nose, mouth, and jawline—the system creates a digital mesh that understands the unique geometry of any human face. This structural data serves as the foundation for seamless face-swapping algorithms and the application of complex, context-aware digital filters that adapt dynamically to user expressions and head orientation.",
      tech: ["PyTorch", "OpenCV", "Python", "Streamlit"],
      github: "https://github.com/anasshafiq12/proj-expression-detection.git",
      year: "2025",
      showImage: false,
      metrics: [{ label: "Accuracy", value: "94.2%" }, { label: "Latency", value: "23ms" }],
    },
  ],
};

const tabs = [
  { id: "fullstack", label: "Full Stack", emoji: "🚀", count: projects.fullstack.length },
  { id: "backend", label: "Backend", emoji: "⚙️", count: projects.backend.length },
  { id: "aiml", label: "AI / ML", emoji: "🤖", count: projects.aiml.length },
];

const tabAccent = { fullstack: "#7c3aed", backend: "#2563eb", aiml: "#a21caf" };

// Status badge config — colors stay explicit since they convey semantic meaning
const statusStyle = {
  Live:       { bg: "bg-green-100 dark:bg-green-900/30",  color: "text-green-700 dark:text-green-400",  dot: "bg-green-500" },
  Production: { bg: "bg-blue-100 dark:bg-blue-900/30",   color: "text-blue-700 dark:text-blue-400",   dot: "bg-blue-500" },
  Archived:   { bg: "bg-muted",                           color: "text-muted-foreground",               dot: "bg-muted-foreground/50" },
};

// Pill color variants
const pillVariants = {
  purple: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-700/50",
  blue:   "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50",
  pink:   "bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-700/50",
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

function StatusBadge({ status }) {
  const s = statusStyle[status] || statusStyle.Archived;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase rounded-full px-2.5 py-0.5 whitespace-nowrap ${s.bg} ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}

function TechPill({ label, colorKey = "purple" }) {
  return (
    <span className={`inline-flex items-center text-[11px] font-medium rounded-md px-2 py-0.5 ${pillVariants[colorKey]}`}>
      {label}
    </span>
  );
}

function GhBtn({ href, colorKey = "purple" }) {
  const colorMap = {
    purple: "text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-700/50 bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/40",
    blue:   "text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40",
    pink:   "text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-700/50 bg-fuchsia-50 dark:bg-fuchsia-900/20 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/40",
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold no-underline px-2.5 py-1 rounded-md border transition-colors ${colorMap[colorKey]}`}>
      <GitHubIcon /> GitHub
    </a>
  );
}

function LiveBtn({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-semibold no-underline px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
      <ExternalIcon /> Live Demo
    </a>
  );
}

function ProjectCard({ children, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        boxShadow: hov ? `0 8px 28px rgba(0,0,0,0.10), 0 0 0 1px ${accent}25` : "0 1px 3px rgba(0,0,0,0.05)",
        borderColor: hov ? `${accent}40` : undefined,
        transform: hov ? "translateY(-3px)" : "none",
      }}
    >
      {children}
    </div>
  );
}

function ImageCarousel({ images, title }) {
  const [idx, setIdx] = useState(0);
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden bg-muted"
      style={{ aspectRatio: "16/9" }}
    >
      <img key={idx} src={images[idx]} alt={title}
        className="w-full h-full object-contain block transition-opacity duration-300" />
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIdx((idx - 1 + images.length) % images.length)}
            className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/90 border border-border text-foreground cursor-pointer flex items-center justify-center text-base transition-opacity shadow-sm ${hov ? "opacity-100" : "opacity-0"}`}>
            ‹
          </button>
          <button
            onClick={() => setIdx((idx + 1) % images.length)}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/90 border border-border text-foreground cursor-pointer flex items-center justify-center text-base transition-opacity shadow-sm ${hov ? "opacity-100" : "opacity-0"}`}>
            ›
          </button>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{ width: i === idx ? 18 : 6, background: i === idx ? "#7c3aed" : "rgba(255,255,255,0.65)" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CardBody({ children }) {
  return <div className="p-4 pb-4.5 flex flex-col gap-2.5">{children}</div>;
}

function CardFooter({ children }) {
  return (
    <div className="flex items-center gap-2 pt-2.5 border-t border-border mt-0.5">
      {children}
    </div>
  );
}

function YearTag({ year }) {
  return <span className="ml-auto text-[11px] text-muted-foreground font-medium">{year}</span>;
}

// ── Full Stack Card ──────────────────────────────────────────
function FullStackCard({ p }) {
  return (
    <ProjectCard accent="#7c3aed">
      <ImageCarousel images={p.images} title={p.title} />
      <CardBody>
        <div className="flex items-start justify-between gap-2">
          <h3 className="m-0 text-[15px] font-bold text-foreground tracking-tight">{p.title}</h3>
          <StatusBadge status={p.status} />
        </div>
        <p className="m-0 text-[12.5px] text-muted-foreground leading-relaxed">{p.description}</p>
        <div className="flex flex-wrap gap-1">
          {p.tech.map(t => <TechPill key={t} label={t} colorKey="purple" />)}
        </div>
        <CardFooter>
          <GhBtn href={p.github} colorKey="purple" />
          {p.live && <LiveBtn href={p.live} />}
          <YearTag year={p.year} />
        </CardFooter>
      </CardBody>
    </ProjectCard>
  );
}

// ── Backend Card ─────────────────────────────────────────────
function BackendCard({ p }) {
  return (
    <ProjectCard accent="#2563eb">
      <CardBody>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[13px] text-violet-600 dark:text-violet-400 font-bold flex-shrink-0">{">"}_</span>
          <div className="flex-1 flex items-start justify-between gap-2">
            <h3 className="m-0 text-[15px] font-bold text-foreground tracking-tight">{p.title}</h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[11px] text-muted-foreground">{p.year}</span>
              <StatusBadge status={p.status} />
            </div>
          </div>
        </div>
        <p className="m-0 text-[12.5px] text-muted-foreground leading-relaxed">{p.description}</p>
        {p.stats && (
          <div className="grid grid-cols-3 gap-2">
            {p.stats.map(s => (
              <div key={s.label} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 rounded-lg p-2 text-center">
                <div className="text-[17px] font-extrabold text-blue-800 dark:text-blue-300 leading-tight tracking-tight">{s.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium mt-0.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {p.tech.map(t => <TechPill key={t} label={t} colorKey="blue" />)}
        </div>
        <CardFooter>
          <GhBtn href={p.github} colorKey="blue" />
        </CardFooter>
      </CardBody>
    </ProjectCard>
  );
}

// ── AI/ML Card ───────────────────────────────────────────────
function AiMlCard({ p }) {
  if (p.showImage) {
    return (
      <ProjectCard accent="#a21caf">
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img src={p.image} alt={p.title} className="w-full h-full object-contain block" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
            <h3 className="m-0 text-[15px] font-bold text-white">{p.title}</h3>
            <StatusBadge status={p.status} />
          </div>
        </div>
        <CardBody>
          <p className="m-0 text-[12.5px] text-muted-foreground leading-relaxed">{p.description}</p>
          <div className="flex flex-wrap gap-1">
            {p.tech.map(t => <TechPill key={t} label={t} colorKey="pink" />)}
          </div>
          <CardFooter>
            <GhBtn href={p.github} colorKey="pink" />
            {p.live && <LiveBtn href={p.live} />}
            <YearTag year={p.year} />
          </CardFooter>
        </CardBody>
      </ProjectCard>
    );
  }
  return (
    <ProjectCard accent="#a21caf">
      <CardBody>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="m-0 mb-0.5 text-[15px] font-bold text-foreground">{p.title}</h3>
            <span className="text-[11px] text-muted-foreground">{p.year}</span>
          </div>
          <StatusBadge status={p.status} />
        </div>
        <p className="m-0 text-[12.5px] text-muted-foreground leading-relaxed">{p.description}</p>
        {p.metrics && (
          <div className="grid grid-cols-2 gap-2">
            {p.metrics.map(m => (
              <div key={m.label} className="bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-700/40 rounded-lg px-3.5 py-2">
                <div className="text-[18px] font-extrabold text-fuchsia-800 dark:text-fuchsia-300 leading-tight tracking-tight">{m.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium mt-0.5 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {p.tech.map(t => <TechPill key={t} label={t} colorKey="pink" />)}
        </div>
        <CardFooter>
          <GhBtn href={p.github} colorKey="pink" />
        </CardFooter>
      </CardBody>
    </ProjectCard>
  );
}

// ── Root ─────────────────────────────────────────────────────

export default function ProjectsTab() {
  const [activeTab, setActiveTab] = useState("fullstack");
  const [animKey, setAnimKey] = useState(0);
  const switchTab = (id) => { setActiveTab(id); setAnimKey(k => k + 1); };
  const accent = tabAccent[activeTab];

  return (
    <div className="min-h-screen bg-background font-sans py-6 md:py-10 px-4 md:px-6 pb-20">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .card-enter { animation: fadeUp 0.3s ease both; }
        /* Custom scrollbar for the tab row on mobile */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-[1060px] mx-auto">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[20px] md:text-[22px]">🚀</span>
            <h2 className="m-0 text-[22px] md:text-[26px] font-extrabold tracking-tight transition-colors duration-300"
              style={{ color: accent }}>
              Projects
            </h2>
          </div>
          <p className="m-0 text-xs md:text-sm text-muted-foreground">
            Featured work across full-stack products, backend systems, and AI/ML
          </p>
        </div>

        {/* DevTools-style tab panel */}
        <div className="bg-card border border-border rounded-xl mb-5 shadow-sm overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center px-4 pt-2.5 pb-0 gap-0">
            
            <span className="text-[10px] md:text-[11px] text-muted-foreground font-mono flex items-center gap-1">
              <span className="font-bold transition-colors duration-300" style={{ color: accent }}>{">"}_</span>
              <span className="hidden xs:inline">anas.projects</span>
              <span className="xs:hidden">projects</span>
            </span>
            <div className="ml-auto" />
          </div>

          {/* Tabs row - Added horizontal scroll for mobile */}
          <div className="flex border-b border-border px-2 mt-1 overflow-x-auto hide-scrollbar flex-nowrap">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const ac = tabAccent[tab.id];
              return (
                <button key={tab.id} onClick={() => switchTab(tab.id)}
                  className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-[12px] md:text-[13px] font-medium bg-transparent border-0 cursor-pointer transition-all duration-150 -mb-px whitespace-nowrap"
                  style={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? ac : undefined,
                    borderBottom: isActive ? `2.5px solid ${ac}` : "2.5px solid transparent",
                  }}>
                  <span className="text-muted-foreground">
                    {tab.emoji}
                  </span>
                  <span className={isActive ? "" : "text-muted-foreground"}>{tab.label}</span>
                  <span 
                    className={`text-[9px] md:text-[10px] font-bold rounded-full px-1.5 py-0.5 transition-all duration-150 ${isActive ? "" : "bg-muted text-muted-foreground"}`}
                    style={{
                      background: isActive ? `${ac}18` : undefined,
                      color: isActive ? ac : undefined,
                    }}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid - Adjusted minmax for better mobile scaling */}
        <div key={animKey}>
          <div className="grid gap-4 md:gap-6" 
               style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" }}>
            {activeTab === "fullstack" && projects.fullstack.map((p, i) => (
              <div key={p.title} className="card-enter" style={{ animationDelay: `${i * 0.07}s` }}>
                <FullStackCard p={p} />
              </div>
            ))}
            {activeTab === "backend" && projects.backend.map((p, i) => (
              <div key={p.title} className="card-enter" style={{ animationDelay: `${i * 0.07}s` }}>
                <BackendCard p={p} />
              </div>
            ))}
            {activeTab === "aiml" && projects.aiml.map((p, i) => (
              <div key={p.title} className="card-enter" style={{ animationDelay: `${i * 0.07}s` }}>
                <AiMlCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}