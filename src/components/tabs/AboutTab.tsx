import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Briefcase, MapPin, Calendar,
  Terminal, ChevronRight, Database, Globe, Layers,
  Server, Palette, ExternalLink, Download, Check
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

// --- DATA ---
const techLogos: Record<string, string> = {
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "SCSS/SASS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Vue": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Angular": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "jQuery": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "React Redux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "VueX": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Zustand": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Material UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "shadcn/ui": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Nest.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "ASP.NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Blazor": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "TanStack Query": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Swagger": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
};

const skillCategories = [
  { title: "Languages", icon: Terminal, color: "text-primary", bgColor: "bg-primary/5", borderColor: "hover:border-primary/40", skills: ["JavaScript", "TypeScript", "PHP", "SQL", "HTML5", "SCSS/SASS"] },
  { title: "Frontend", icon: Globe, color: "text-accent", bgColor: "bg-accent/5", borderColor: "hover:border-accent/40", skills: ["React", "Next.js", "Vue", "Angular", "jQuery"] },
  { title: "State Management", icon: Layers, color: "text-traffic-green", bgColor: "bg-traffic-green/5", borderColor: "hover:border-traffic-green/40", skills: ["Redux Toolkit", "React Redux", "VueX", "Zustand"] },
  { title: "UI / Styling", icon: Palette, color: "text-traffic-yellow", bgColor: "bg-traffic-yellow/5", borderColor: "hover:border-traffic-yellow/40", skills: ["Tailwind CSS", "Material UI", "Bootstrap", "shadcn/ui"] },
  { title: "Backend / APIs", icon: Server, color: "text-primary", bgColor: "bg-primary/5", borderColor: "hover:border-primary/40", skills: ["Node.js", "Nest.js", "Express.js", "ASP.NET", "FastAPI", "Blazor", "REST APIs"] },
  { title: "Database / DevOps", icon: Database, color: "text-accent", bgColor: "bg-accent/5", borderColor: "hover:border-accent/40", skills: ["MongoDB", "MySQL", "PostgreSQL", "TanStack Query", "Git", "GitHub", "Swagger"] },
];

// --- SEPARATE COMPONENT (Internalized) ---
const DownloadCV = ({ variant = "button" }: { variant?: "button" | "bar" }) => {
  const [state, setState] = useState<"idle" | "downloading" | "done">("idle");

  const handleDownload = () => {
    if (state !== "idle") return;
    setState("downloading");
    
    const link = document.createElement("a");
    link.href = "/Anas_Shafiq_CV.pdf";
    link.download = "Anas_Shafiq_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setState("done"), 2000);
    setTimeout(() => setState("idle"), 4000);
  };

  if (variant === "bar") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <Download className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Anas_Shafiq_CV.pdf</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">Ready for download</p>
            {state === "downloading" && (
              <motion.div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
              </motion.div>
            )}
          </div>
        </div>
        <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={state !== "idle"} className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-60 transition-opacity">
          {state === "idle" ? "Download" : state === "downloading" ? "Downloading..." : "✓ Done"}
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={state !== "idle"} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl self-start disabled:opacity-80 min-w-[140px] justify-center">
      <AnimatePresence mode="wait">
        {state === "idle" && <motion.div key="i" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Download className="h-4 w-4" /> Download CV</motion.div>}
        {state === "downloading" && <motion.div key="l" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} /><span>Downloading...</span></motion.div>}
        {state === "done" && <motion.div key="d" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Check className="h-4 w-4" /> Downloaded!</motion.div>}
      </AnimatePresence>
    </motion.button>
  );
};

// --- MAIN COMPONENT ---
const AboutTab = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState("Console");
  const consoleTabs = ["Elements", "Console", "Sources", "Network"];

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        
        {/* Header */}
        <motion.div variants={item} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold gradient-text">About Me</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl">
              Detail-oriented Software Engineer with a passion for building scalable,
              full-stack applications. I specialize in crafting performant web experiences
              with modern technologies.
            </p>
          </div>
          <DownloadCV variant="button" />
        </motion.div>

        {/* Education & Experience */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div variants={item} whileHover={{ y: -3, boxShadow: "0 8px 30px -10px hsl(var(--primary) / 0.15)" }} className="rounded-xl border border-border bg-card p-5 transition-all cursor-default">
            <div className="mb-3 flex items-center gap-2 text-primary"><GraduationCap className="h-5 w-5" /><h3 className="font-semibold">Education</h3></div>
            <h4 className="font-medium text-foreground">BS Software Engineering</h4>
            <p className="text-sm text-muted-foreground">PUCIT — Punjab University</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2022 — 2026</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Lahore, PK</span>
            </div>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -3, boxShadow: "0 8px 30px -10px hsl(var(--accent) / 0.15)" }} className="rounded-xl border border-border bg-card p-5 transition-all cursor-default">
            <div className="mb-3 flex items-center gap-2 text-accent"><Briefcase className="h-5 w-5" /><h3 className="font-semibold">Experience</h3></div>
            <h4 className="font-medium text-foreground">Full-Stack Developer</h4>
            <p className="text-sm text-muted-foreground">CodeClever</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> Full-time</span></div>
            <motion.a href="#" whileHover={{ x: 3 }} className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline">View details <ExternalLink className="h-3 w-3" /></motion.a>
          </motion.div>
        </div>

        {/* Tech Stack — DevTools Style */}
        <motion.div variants={item}>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center border-b border-border bg-muted">
              <Terminal className="h-4 w-4 text-primary ml-4" />
              <span className="text-xs font-semibold text-foreground ml-2 mr-4">DevTools</span>
              <div className="flex">
                {consoleTabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveConsoleTab(tab)} className={`relative px-3 py-2 text-[11px] font-medium transition-colors ${activeConsoleTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                    {tab}
                    {activeConsoleTab === tab && <motion.div layoutId="consoleTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 font-mono text-xs">
              <motion.p className="text-muted-foreground mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <span className="text-primary">{'>'}</span> console.log(anas.skills)
              </motion.p>
              <div className="grid gap-3 md:grid-cols-2">
                {skillCategories.map((cat, catIndex) => (
                  <motion.div key={cat.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + catIndex * 0.08 }} className={`rounded-lg border border-border ${cat.bgColor} p-3 transition-all ${cat.borderColor}`}>
                    <div className="mb-2 flex items-center gap-2"><cat.icon className={`h-3.5 w-3.5 ${cat.color}`} /><span className="font-semibold text-foreground">{cat.title}</span><span className="ml-auto text-[10px] text-muted-foreground">{cat.skills.length}</span></div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <motion.span key={skill} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} onHoverStart={() => setHoveredSkill(skill)} onHoverEnd={() => setHoveredSkill(null)} className={`relative flex items-center gap-1.5 rounded-md bg-card px-2 py-1 text-[11px] text-foreground border transition-all cursor-default ${hoveredSkill === skill ? "border-primary shadow-md z-10" : "border-border"}`}>
                          {techLogos[skill] && <img src={techLogos[skill]} alt={skill} className="h-3.5 w-3.5" loading="lazy" />}{skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Technical Footer Metadata */}
              <div className="mt-3 flex flex-wrap items-center justify-between border-t border-border/50 pt-3">
                <motion.p className="text-traffic-green flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                  <ChevronRight className="inline h-3 w-3" /> {skillCategories.reduce((a, c) => a + c.skills.length, 0)} skills loaded ✓
                  <span className="ml-2 text-muted-foreground hidden sm:inline">{hoveredSkill ? `// inspecting: ${hoveredSkill}` : "// hover to inspect"}</span>
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-4 text-[10px] text-muted-foreground/60">
                  <div className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-traffic-green animate-pulse" /><span>System: Online</span></div>
                  <span>Last Sync: {new Date().toLocaleDateString()}</span>
                  <span className="hidden md:inline">v2.4.0-stable</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Download Bar */}
        <motion.div variants={item}>
          <DownloadCV variant="bar" />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AboutTab;