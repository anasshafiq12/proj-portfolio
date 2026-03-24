import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check } from "lucide-react";

interface DownloadCVProps {
  variant?: "button" | "bar";
  fileName?: string;
  filePath?: string;
}

const DownloadCV = ({ 
  variant = "button", 
  fileName = "Anas_Shafiq_CV.pdf", 
  filePath = "/Anas_Shafiq_CV.pdf" 
}: DownloadCVProps) => {
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "done">("idle");

  const handleDownload = () => {
    if (downloadState !== "idle") return;

    setDownloadState("downloading");

    // Actual File Download Logic
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Sync with your UI timing
    setTimeout(() => setDownloadState("done"), 2000);
    setTimeout(() => setDownloadState("idle"), 4000);
  };

  if (variant === "bar") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <Download className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{fileName}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">Resume ready for download • 2.4 MB</p>
            {downloadState === "downloading" && (
              <motion.div 
                className="h-1 w-20 overflow-hidden rounded-full bg-muted"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </motion.div>
            )}
          </div>
        </div>
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={downloadState !== "idle"}
          className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-60 transition-opacity"
        >
          {downloadState === "idle" ? "Download" : downloadState === "downloading" ? "Downloading..." : "✓ Done"}
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={downloadState !== "idle"}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl self-start disabled:opacity-80 min-w-[140px] justify-center"
    >
      <AnimatePresence mode="wait">
        {downloadState === "idle" && (
          <motion.div key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Download className="h-4 w-4" /> Download CV
          </motion.div>
        )}
        {downloadState === "downloading" && (
          <motion.div key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <span>Downloading...</span>
          </motion.div>
        )}
        {downloadState === "done" && (
          <motion.div key="done" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Check className="h-4 w-4" /> Downloaded!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default DownloadCV;