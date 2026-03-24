import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Globe, Code2, Sparkles, Rocket } from "lucide-react";

const loadingSteps = [
  { icon: Globe, text: "Initializing Shafiq Browser...", progress: 15 },
  { icon: Code2, text: "Loading portfolio assets...", progress: 40 },
  { icon: Sparkles, text: "Compiling experiences...", progress: 70 },
  { icon: Rocket, text: "Almost there! Launching...", progress: 95 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const target = loadingSteps[step].progress;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= target) { clearInterval(interval); return target; }
        return p + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [step]);

  const CurrentIcon = loadingSteps[step].icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Browser icon */}
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Globe className="h-10 w-10 text-primary" />
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/30"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold gradient-text">Shafiq Browser</h1>
          <p className="mt-1 text-sm text-muted-foreground">v2024 — Developer Edition</p>
        </div>

        {/* Step text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="flex items-center gap-2 text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{loadingSteps[step].text}</span>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-72 overflow-hidden rounded-full bg-muted h-2">
          <motion.div
            className="h-full rounded-full loading-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <p className="text-xs text-muted-foreground/60">{progress}%</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
