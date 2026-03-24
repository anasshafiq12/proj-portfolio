import { motion } from "framer-motion";
import { Search, ArrowRight, TrendingUp, Zap, Code2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HomeTabProps {
  onNavigate: (tab: "about" | "projects" | "contact") => void;
}

const quickResults = [
  { title: "About Me — Background, Skills & Experience", desc: "Detail-oriented Software Engineer building scalable full-stack applications", tab: "about" as const, icon: "👤" },
  { title: "Projects — Featured Work & Case Studies", desc: "Real-world applications showcasing modern web development", tab: "projects" as const, icon: "📂" },
  { title: "Contact — Let's Work Together", desc: "Get in touch for collaborations and opportunities", tab: "contact" as const, icon: "✉️" },
];

const HomeTab = ({ onNavigate }: HomeTabProps) => {
  return (
    <div className="flex min-h-full flex-col">
      {/* Hero section */}
      <div className="relative flex flex-col items-center justify-center px-6 py-20">
        <div className="absolute inset-0 opacity-10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              <span className="gradient-text">Shafiq</span>
              <span className="text-foreground">Search</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-lg font-semibold text-foreground"
          >
            Anas Shafiq — Software Engineer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-md text-sm text-muted-foreground"
          >
            Searching for high-performance web solutions? You've found the right result.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex w-full max-w-lg items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-lg transition-shadow focus-within:shadow-xl"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-left text-sm text-muted-foreground">
              Search my portfolio...
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate("projects")}
                className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                Explore
              </button>
            </div>
          </motion.div>

          {/* Quick tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              { icon: TrendingUp, label: "Full-Stack" },
              { icon: Zap, label: "React Expert" },
              { icon: Code2, label: "TypeScript" },
            ].map((tag) => (
              <span
                key={tag.label}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                <tag.icon className="h-3 w-3" />
                {tag.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Search results */}
      <div className="mx-auto w-full max-w-2xl px-6 pb-12">
        <p className="mb-4 text-xs text-muted-foreground">
          About 3 results (0.42 seconds)
        </p>
        <div className="space-y-6">
          {quickResults.map((result, i) => (
            <motion.button
              key={result.tab}
              onClick={() => onNavigate(result.tab)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="group block w-full text-left"
            >
              <p className="text-xs text-muted-foreground mb-0.5">
                https://shafiq.dev/{result.tab}
              </p>
              <p className="text-base font-medium text-primary group-hover:underline flex items-center gap-2">
                {result.icon} {result.title}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </p>
              <p className="text-sm text-muted-foreground">{result.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
