import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, TrendingUp, Zap, Code2, Sparkles, Terminal, MousePointerClick, Clock, Eye } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HomeTabProps {
  onNavigate: (tab: "about" | "projects" | "contact") => void;
}

const quickResults = [
  { title: "About Me — Background, Skills & Experience", desc: "Detail-oriented Software Engineer building scalable full-stack applications", tab: "about" as const, icon: "👤" },
  { title: "Projects — Featured Work & Case Studies", desc: "Real-world applications showcasing modern web development", tab: "projects" as const, icon: "📂" },
  { title: "Contact — Let's Work Together", desc: "Get in touch for collaborations and opportunities", tab: "contact" as const, icon: "✉️" },
];

const typingTexts = [
  "React developer...",
  "full-stack engineer...",
  "UI/UX enthusiast...",
  "TypeScript expert...",
  "problem solver...",
];

const stats = [
  { icon: Code2, label: "Projects", value: "20+", color: "text-primary" },
  { icon: Clock, label: "Experience", value: "2+ yrs", color: "text-accent" },
  { icon: Sparkles, label: "Technologies", value: "30+", color: "text-traffic-green" },
  { icon: Eye, label: "Profile Views", value: "5K+", color: "text-traffic-yellow" },
];

const HomeTab = ({ onNavigate }: HomeTabProps) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing animation
  useEffect(() => {
    const currentText = typingTexts[typingIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentText.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  const filteredResults = searchQuery
    ? quickResults.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickResults;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase();
    if (q.includes("about") || q.includes("skill") || q.includes("experience")) onNavigate("about");
    else if (q.includes("project") || q.includes("work") || q.includes("portfolio")) onNavigate("projects");
    else if (q.includes("contact") || q.includes("email") || q.includes("hire")) onNavigate("contact");
    else onNavigate("projects");
  };

  return (
    <div className="flex min-h-full flex-col">
      {/* Hero section */}
      <div className="relative flex flex-col items-center justify-center px-6 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <motion.div
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5"
              animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary)/0.1)", "0 0 0 8px hsl(var(--primary)/0)", "0 0 0 0 hsl(var(--primary)/0.1)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Welcome to my portfolio</span>
            </motion.div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              <span className="gradient-text">Shafiq</span>
              <span className="text-foreground">Search</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-1 text-lg font-semibold text-foreground"
          >
            Anas Shafiq — Software Engineer
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
          >
            <span>I'm a </span>
            <span className="font-medium text-primary">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-primary"
            />
          </motion.div>

          {/* Interactive search bar */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative w-full max-w-lg"
          >
            <div
              className={`flex items-center gap-3 rounded-full border bg-card px-5 py-3 shadow-lg transition-all duration-300 ${
                searchFocused ? "border-primary shadow-xl ring-4 ring-primary/10" : "border-border"
              }`}
            >
              <Search className={`h-5 w-5 transition-colors ${searchFocused ? "text-primary" : "text-muted-foreground"}`} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  setSearchFocused(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  setSearchFocused(false);
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder="Search my portfolio..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
              >
                Search
              </motion.button>
            </div>

            {/* Search suggestions dropdown */}
            <AnimatePresence>
              {showSuggestions && searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-xl z-20"
                >
                  <div className="p-2">
                    <p className="px-3 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Quick Navigate</p>
                    {filteredResults.map((result) => (
                      <button
                        key={result.tab}
                        onMouseDown={() => onNavigate(result.tab)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted group"
                      >
                        <span className="text-lg">{result.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{result.desc}</p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

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
              { icon: Terminal, label: "Open Source" },
            ].map((tag) => (
              <motion.span
                key={tag.label}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex cursor-default items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <tag.icon className="h-3 w-3" />
                {tag.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-auto grid w-full max-w-2xl grid-cols-4 gap-3 px-6 pb-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4, scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 text-center transition-shadow hover:shadow-lg cursor-default"
          >
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <span className="text-lg font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Search results with enhanced interactivity */}
      <div className="mx-auto w-full max-w-2xl px-6 pb-12">
        <p className="mb-4 text-xs text-muted-foreground flex items-center gap-1">
          <MousePointerClick className="h-3 w-3" />
          About 3 results (0.42 seconds) — Click to navigate
        </p>
        <div className="space-y-4">
          {quickResults.map((result, i) => (
            <motion.button
              key={result.tab}
              onClick={() => onNavigate(result.tab)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.15 }}
              whileHover={{ x: 6, backgroundColor: "hsl(var(--muted) / 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="group block w-full rounded-lg p-3 text-left transition-all border border-transparent hover:border-border"
            >
              <p className="text-xs text-traffic-green mb-0.5 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-traffic-green" />
                https://shafiq.dev/{result.tab}
              </p>
              <p className="text-base font-medium text-primary group-hover:underline flex items-center gap-2">
                {result.icon} {result.title}
                <motion.span
                  className="inline-block"
                  initial={{ x: 0, opacity: 0 }}
                  whileHover={{ x: 4, opacity: 1 }}
                >
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                </motion.span>
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">{result.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* "I'm feeling lucky" section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <motion.button
            onClick={() => onNavigate("projects")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border border-border bg-card px-5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            🎯 I'm Feeling Lucky
          </motion.button>
          <motion.button
            onClick={() => onNavigate("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border border-border bg-card px-5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            💬 Let's Talk
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeTab;
