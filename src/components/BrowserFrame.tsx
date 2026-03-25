import { useState, useCallback, useRef, useEffect } from "react"; // Added useRef, useEffect
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, RotateCw, Shield, Star, Lock,
  Search, ChevronDown, User, Clock, BookMarked, Settings,
  EyeOff, X, Plus, Home as HomeIcon, Bookmark, Minimize2,
  Maximize2, Globe, RefreshCcw
} from "lucide-react";
import { toast } from "sonner";

export type TabId = "home" | "about" | "projects" | "contact";

interface Tab {
  id: TabId;
  label: string;
  emoji: string;
  url: string;
  favicon: string;
}

const tabs: Tab[] = [
  { id: "home", label: "Home", emoji: "🏠", url: "anas.dev", favicon: "🏠" },
  { id: "about", label: "About", emoji: "👤", url: "anas.dev/about", favicon: "👤" },
  { id: "projects", label: "Projects", emoji: "📂", url: "anas.dev/projects", favicon: "📂" },
  { id: "contact", label: "Contact", emoji: "✉️", url: "anas.dev/contact", favicon: "✉️" },
];

const bookmarks = [
  { label: "GitHub", url: "github.com/anasshafiq12", icon: "📁", href: "https://github.com/anasshafiq12", tab: null as TabId | null },
  { label: "LinkedIn", url: "linkedin.com/in/anas-shafiq-1a584025a/", icon: "💼", href: "https://linkedin.com/in/anas-shafiq-1a584025a/", tab: null as TabId | null },
  { label: "Projects", url: "anas.dev/projects", icon: "🚀", href: null, tab: "projects" as TabId | null },
  { label: "Resume", url: "anas.dev/about", icon: "📄", href: null, tab: "about" as TabId | null },
];

interface BrowserFrameProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isIncognito: boolean;
  onToggleIncognito: () => void;
  children: React.ReactNode;
  isRefreshing: boolean;
  onRefresh: () => void;
  history: TabId[];
  historyIndex: number;
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const BrowserFrame = ({
  activeTab, onTabChange, isIncognito, onToggleIncognito,
  children, isRefreshing, onRefresh, history, historyIndex,
  onBack, onForward, canGoBack, canGoForward,
}: BrowserFrameProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [isStarred, setIsStarred] = useState(false);
  
  // New States for Editable URL
  const [urlInput, setUrlInput] = useState("");
  const [isUrlFocused, setIsUrlFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isMaximized, setIsMaximized] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  // Sync input with active tab URL when not focused
  useEffect(() => {
    if (!isUrlFocused) {
      setUrlInput(currentTab.url);
    }
  }, [activeTab, isUrlFocused, currentTab.url]);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUrlFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStar = () => {
    setIsStarred(!isStarred);
    toast(isStarred ? "Bookmark removed" : "Page bookmarked ⭐", {
      duration: 1500,
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    toast("Browser closed", {
      description: "Click the refresh icon to restore the window.",
      action: {
        label: "Restore",
        onClick: () => setIsVisible(true),
      },
    });
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleBookmarkClick = (bm: typeof bookmarks[0]) => {
    if (bm.tab) {
      onTabChange(bm.tab);
    } else if (bm.href) {
      window.open(bm.href, "_blank");
    }
  };

  const handleClosePanel = useCallback(() => {
    setShowHistory(false);
    setShowAccount(false);
  }, []);

  if (!isVisible) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-lg"
        >
          <RefreshCcw className="h-4 w-4" /> Restore Browser
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={`mx-auto flex flex-col overflow-hidden border border-browser-chrome-border bg-browser-chrome shadow-2xl browser-glow transition-all duration-500 ${
        isMaximized
          ? "fixed inset-0 z-50 h-screen w-screen max-h-none max-w-none rounded-none"
          : "relative h-[92vh] sm:h-[95vh] max-h-[900px] w-full sm:w-[98vw] max-w-[1400px] rounded-xl"
      }`}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{
        opacity: isMinimized ? 0.4 : 1,
        scale: isMinimized ? 0.8 : 1,
        y: isMinimized ? 400 : 0,
        filter: isMinimized ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-browser-chrome-border bg-browser-toolbar px-3 sm:px-4 py-2">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleClose}
            className="group relative h-3 w-3 rounded-full bg-traffic-red transition-transform"
          >
            <X className="absolute inset-0 m-auto h-2 w-2 text-traffic-red opacity-0 group-hover:opacity-100 group-hover:text-red-900" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleMinimize}
            className="group relative h-3 w-3 rounded-full bg-traffic-yellow transition-transform"
          >
            <Minimize2 className="absolute inset-0 m-auto h-2 w-2 text-traffic-yellow opacity-0 group-hover:opacity-100 group-hover:text-yellow-900" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsMaximized(!isMaximized)}
            className="group relative h-3 w-3 rounded-full bg-traffic-green transition-transform"
          >
            <Maximize2 className="absolute inset-0 m-auto h-2 w-2 text-traffic-green opacity-0 group-hover:opacity-100 group-hover:text-green-900" />
          </motion.button>
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium truncate max-w-[100px] sm:max-w-none">
            {isIncognito ? "🕵️ Incognito" : "Portfolio Explorer"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleIncognito}
            className={`rounded-md p-1 sm:p-1.5 transition-colors hover:bg-muted ${isIncognito ? "text-primary" : "text-muted-foreground"}`}
            title={isIncognito ? "Exit Incognito" : "Go Incognito"}
          >
            <EyeOff className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex items-end gap-0 bg-browser-toolbar px-2 pt-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              if (isMinimized) setIsMinimized(false);
            }}
            whileHover={activeTab !== tab.id ? { backgroundColor: "hsl(var(--muted))" } : {}}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex items-center gap-1.5 rounded-t-lg px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-medium transition-all duration-200 min-w-[80px] sm:min-w-[100px] flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-browser-tab-active text-foreground shadow-sm z-10 border-t border-l border-r border-browser-chrome-border"
                : "text-muted-foreground"
            }`}
          >
            <motion.span
              animate={activeTab === tab.id ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {tab.emoji}
            </motion.span>
            <span className="truncate">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {activeTab === tab.id && (
              <div className="absolute -bottom-px left-0 right-0 h-px bg-browser-tab-active" />
            )}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toast("All tabs are already open! 📑", { duration: 1500 })}
          className="mb-1 ml-1 rounded-md p-1.5 text-muted-foreground transition-colors flex-shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Navigation bar + Editable URL Bar */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-browser-chrome-border bg-browser-tab-active px-2 sm:px-3 py-2 relative">
        <div className="flex items-center gap-0.5">
          {[
            { icon: ArrowLeft, action: onBack, disabled: !canGoBack, label: "Back" },
            { icon: ArrowRight, action: onForward, disabled: !canGoForward, label: "Forward" },
          ].map(({ icon: Icon, action, disabled, label }) => (
            <motion.button
              key={label}
              onClick={action}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.9 } : {}}
              className="rounded-md p-1 sm:p-1.5 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
              title={label}
            >
              <Icon className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            </motion.button>
          ))}
          <motion.button
            onClick={onRefresh}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            className="rounded-md p-1 sm:p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            title="Refresh"
          >
            <RotateCw className={`h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform ${isRefreshing ? "animate-spin" : ""}`} />
          </motion.button>
        </div>

        {/* URL bar - Editable with Suggestions */}
        <div className="relative flex flex-1 items-center" ref={dropdownRef}>
          <motion.div
            className="flex w-full items-center gap-1 sm:gap-2 rounded-full bg-browser-url-bg px-3 sm:px-4 py-1 sm:py-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/30"
            whileHover={{ boxShadow: "0 2px 8px hsl(var(--glass-shadow))" }}
          >
            <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-traffic-green flex-shrink-0" />
            <div className="flex flex-1 items-center text-[10px] sm:text-sm overflow-hidden">
              <span className="text-muted-foreground hidden sm:inline">https://</span>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onFocus={() => setIsUrlFocused(true)}
                className="w-full bg-transparent font-medium text-foreground outline-none border-none p-0 focus:ring-0"
                placeholder="Search or enter URL"
              />
            </div>
            <motion.button
              onClick={handleStar}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="flex-shrink-0"
            >
              <Star className={`h-3 w-3 sm:h-3.5 sm:w-3.5 cursor-pointer transition-colors ${isStarred ? "fill-traffic-yellow text-traffic-yellow" : "text-muted-foreground hover:text-primary"}`} />
            </motion.button>
          </motion.div>

          {/* URL Suggestions Dropdown */}
          <AnimatePresence>
            {isUrlFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 z-[60] mt-2 rounded-xl border border-border bg-card p-2 shadow-2xl"
              >
                <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Available Pages</div>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsUrlFocused(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span>{tab.emoji}</span>
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{tab.url}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-0.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setShowAccount(!showAccount); setShowHistory(false); }}
            className={`rounded-md p-1 sm:p-1.5 transition-colors hover:bg-muted ${showAccount ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            <User className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`hidden sm:block rounded-md p-1.5 transition-colors hover:bg-muted ${showBookmarks ? "text-primary" : "text-muted-foreground"}`}
          >
            <BookMarked className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Bookmarks bar */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-0.5 overflow-hidden border-b border-browser-chrome-border bg-browser-tab-active px-3 py-1"
          >
            {bookmarks.map((bm) => (
              <motion.button
                key={bm.label}
                whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookmarkClick(bm)}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
              >
                <span>{bm.icon}</span>
                <span>{bm.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-background relative" onClick={handleClosePanel}>
        {isMinimized && (
          <div 
            className="absolute inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-background/40 backdrop-blur-sm"
            onClick={() => setIsMinimized(false)}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-2xl"
            >
              Click to Restore Window
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {isRefreshing && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 loading-bar z-50"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-browser-chrome-border bg-browser-toolbar px-3 sm:px-4 py-1">
        <motion.span
          key={isRefreshing ? "loading" : currentTab.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[9px] sm:text-[10px] text-muted-foreground truncate"
        >
          {isRefreshing ? "⏳ Loading..." : `✅ Secure | ${currentTab.url}`}
        </motion.span>
        <span className="text-[9px] sm:text-[10px] text-muted-foreground flex items-center gap-1 whitespace-nowrap ml-2">
          {isIncognito ? "🕵️ Incognito" : "👤 Anas Shafiq"}
        </span>
      </div>

      {/* Account Panel */}
      <AnimatePresence>
        {showAccount && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            className="absolute right-2 sm:right-4 top-24 sm:top-28 z-50 w-[calc(100vw-16px)] sm:w-80 rounded-xl border border-border bg-card p-4 shadow-2xl"
          >
             <div className="mb-3 flex items-center justify-between">
               <h3 className="text-sm font-semibold flex items-center gap-2">
                 <User className="h-4 w-4 text-primary" /> Account
               </h3>
               <button onClick={handleClosePanel}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
             </div>
             <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
               <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg">AS</div>
             </div>
             <div className="mt-3 space-y-0.5">
               <button onClick={() => { onToggleIncognito(); setShowAccount(false); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors">
                 <EyeOff className="h-3.5 w-3.5" /> {isIncognito ? "Exit Incognito" : "Go Incognito"}
               </button>
               <button onClick={() => window.open("https://github.com/anasshafiq12", "_blank")} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors">
                 <Globe className="h-3.5 w-3.5" /> GitHub
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BrowserFrame;