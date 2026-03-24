import { motion } from "framer-motion";
import {
  GraduationCap, Briefcase, Download, MapPin, Calendar,
  Terminal, ChevronRight, Cpu, Database, Globe, Layers,
  Server, Palette
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const skillCategories = [
  {
    title: "Languages",
    icon: Terminal,
    color: "text-primary",
    skills: ["JavaScript", "TypeScript", "PHP", "SQL", "HTML5", "SCSS/SASS"],
  },
  {
    title: "Frontend",
    icon: Globe,
    color: "text-accent",
    skills: ["React", "Next.js", "Vue", "Angular", "jQuery"],
  },
  {
    title: "State Management",
    icon: Layers,
    color: "text-traffic-green",
    skills: ["Redux Toolkit", "React Redux", "VueX", "Zustand"],
  },
  {
    title: "UI / Styling",
    icon: Palette,
    color: "text-traffic-yellow",
    skills: ["Tailwind CSS", "Material UI", "Bootstrap", "shadcn/ui"],
  },
  {
    title: "Backend / APIs",
    icon: Server,
    color: "text-primary",
    skills: ["Node.js", "Nest.js", "Express.js", "ASP.NET", "FastAPI", "Blazor", "REST APIs"],
  },
  {
    title: "Database / DevOps",
    icon: Database,
    color: "text-accent",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "TanStack Query", "Git", "GitHub", "Swagger"],
  },
];

const AboutTab = () => {
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
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl self-start"
          >
            <Download className="h-4 w-4" />
            Download CV
          </motion.a>
        </motion.div>

        {/* Education & Experience */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div variants={item} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-semibold">Education</h3>
            </div>
            <h4 className="font-medium text-foreground">BS Software Engineering</h4>
            <p className="text-sm text-muted-foreground">PUCIT — Punjab University</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2022 — 2026</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Lahore, PK</span>
            </div>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-accent">
              <Briefcase className="h-5 w-5" />
              <h3 className="font-semibold">Experience</h3>
            </div>
            <h4 className="font-medium text-foreground">Full-Stack Developer</h4>
            <p className="text-sm text-muted-foreground">CodeClever</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> Full-time</span>
              <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> Current</span>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack — DevTools Console Style */}
        <motion.div variants={item}>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* DevTools header */}
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">DevTools — Tech Stack Inspector</span>
              <span className="ml-auto text-[10px] text-muted-foreground">Elements  Console  Sources  Network</span>
            </div>

            <div className="p-4 font-mono text-xs">
              <p className="text-muted-foreground mb-3">
                <span className="text-primary">{'>'}</span> console.log(shafiq.skills)
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {skillCategories.map((cat) => (
                  <div key={cat.title} className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                      <span className="font-semibold text-foreground">{cat.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.08 }}
                          className="rounded-md bg-card px-2 py-0.5 text-[11px] text-foreground border border-border transition-colors hover:border-primary hover:text-primary cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-traffic-green">
                <ChevronRight className="inline h-3 w-3" /> {skillCategories.reduce((a, c) => a + c.skills.length, 0)} skills loaded ✓
              </p>
            </div>
          </div>
        </motion.div>

        {/* Download notification */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
        >
          <Download className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Anas_Shafiq_CV.pdf</p>
            <p className="text-xs text-muted-foreground">Resume ready for download • 2.4 MB</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
          >
            Download
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutTab;
