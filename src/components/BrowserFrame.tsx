import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, RotateCw, Shield, Star, Lock,
  Search, ChevronDown, User, Clock, BookMarked, Settings,
  EyeOff, X, Plus, Home as HomeIcon, Bookmark, Minimize2,
  Maximize2, Globe
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
  { id: "home", label: "Home", emoji: "🏠", url: "shafiq.dev", favicon: "🏠" },
  { id: "about", label: "About", emoji: "👤", url: "shafiq.dev/about", favicon: "👤" },
  { id: "projects", label: "Projects", emoji: "📂", url: "shafiq.dev/projects", favicon: "📂" },
  { id: "contact", label: "Contact", emoji: "✉️", url: "shafiq.dev/contact", favicon: "✉️" },
];

const bookmarks = [
  { label: "GitHub", url: "github.com/anasshafiq12", icon: "📁", href: "https://github.com/anasshafiq12", tab: null as TabId | null },
  { label: "LinkedIn", url: "linkedin.com/in/anas-shafiq", icon: "💼", href: "https://linkedin.com/in/anas-shafiq", tab: null as TabId | null },
  { label: "Projects", url: "shafiq.dev/projects", icon: "🚀", href: null, tab: "projects" as TabId | null },
  { label: "Resume", url: "shafiq.dev/about", icon: "📄", href: null, tab: "about" as TabId | null },
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const handleStar = () => {
    setIsStarred(!isStarred);
    toast(isStarred ? "Bookmark removed" : "Page bookmarked ⭐", {
      duration: 1500,
    });
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => setIsMinimized(false), 800);
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

  return (
    <motion.div
      className={`mx-auto flex flex-col overflow-hidden rounded-xl border border-browser-chrome-border bg-browser-chrome shadow-2xl browser-glow transition-all duration-500 ${
        isMaximized
          ? "h-screen w-screen max-h-none max-w-none rounded-none"
          : "h-[95vh] max-h-[900px] w-[98vw] max-w-[1400px]"
      }`}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{
        opacity: isMinimized ? 0 : 1,
        scale: isMinimized ? 0.5 : 1,
        y: isMinimized ? 200 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-browser-chrome-border bg-browser-toolbar px-4 py-2">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => toast("Can't close your portfolio! 😄", { duration: 1500 })}
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
          <span className="text-xs text-muted-foreground font-medium">
            {isIncognito ? "🕵️ Incognito Mode" : "Shafiq Browser"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleIncognito}
            className={`rounded-md p-1.5 transition-colors hover:bg-muted ${isIncognito ? "text-primary" : "text-muted-foreground"}`}
            title={isIncognito ? "Exit Incognito" : "Go Incognito"}
          >
            <EyeOff className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Tabs bar — enhanced with close buttons & better styling */}
      <div className="flex items-end gap-0 bg-browser-toolbar px-2 pt-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            whileHover={activeTab !== tab.id ? { backgroundColor: "hsl(var(--muted))" } : {}}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex items-center gap-1.5 rounded-t-lg px-4 py-2 text-xs font-medium transition-all duration-200 min-w-[100px] ${
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
            {/* Active tab covers bottom border */}
            {activeTab === tab.id && (
              <div className="absolute -bottom-px left-0 right-0 h-px bg-browser-tab-active" />
            )}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toast("All tabs are already open! 📑", { duration: 1500 })}
          className="mb-1 ml-1 rounded-md p-1.5 text-muted-foreground transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-2 border-b border-browser-chrome-border bg-browser-tab-active px-3 py-2">
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
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
              title={label}
            >
              <Icon className="h-4 w-4" />
            </motion.button>
          ))}
          <motion.button
            onClick={onRefresh}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            title="Refresh"
          >
            <RotateCw className={`h-4 w-4 transition-transform ${isRefreshing ? "animate-spin" : ""}`} />
          </motion.button>
          <motion.button
            onClick={() => onTabChange("home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            title="Home"
          >
            <HomeIcon className="h-4 w-4" />
          </motion.button>
        </div>

        {/* URL bar */}
        <motion.div
          className="flex flex-1 items-center gap-2 rounded-full bg-browser-url-bg px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/30"
          whileHover={{ boxShadow: "0 2px 8px hsl(var(--glass-shadow))" }}
        >
          <Lock className="h-3.5 w-3.5 text-traffic-green" />
          <div className="flex flex-1 items-center text-sm">
            <span className="text-muted-foreground">https://</span>
            <motion.span
              key={currentTab.url}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-medium text-foreground"
            >
              {currentTab.url}
            </motion.span>
          </div>
          <motion.button
            onClick={handleStar}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <Star className={`h-3.5 w-3.5 cursor-pointer transition-colors ${isStarred ? "fill-traffic-yellow text-traffic-yellow" : "text-muted-foreground hover:text-primary"}`} />
          </motion.button>
        </motion.div>

        <div className="flex items-center gap-0.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toast("Site is secure 🔒", { duration: 1500 })}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <Shield className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setShowHistory(!showHistory); setShowAccount(false); }}
            className={`rounded-md p-1.5 transition-colors hover:bg-muted ${showHistory ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            <Clock className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setShowAccount(!showAccount); setShowHistory(false); }}
            className={`rounded-md p-1.5 transition-colors hover:bg-muted ${showAccount ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            <User className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`rounded-md p-1.5 transition-colors hover:bg-muted ${showBookmarks ? "text-primary" : "text-muted-foreground"}`}
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
            className="flex items-center gap-0.5 overflow-hidden border-b border-browser-chrome-border bg-browser-tab-active px-3 py-1"
          >
            {bookmarks.map((bm) => (
              <motion.button
                key={bm.label}
                whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookmarkClick(bm)}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{bm.icon}</span>
                <span>{bm.label}</span>
              </motion.button>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <Bookmark className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Other bookmarks</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading progress bar */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            className="h-0.5 loading-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Dropdown panels */}
      <div className="relative">
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              className="absolute right-16 top-1 z-50 w-80 rounded-xl border border-border bg-card p-4 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Browsing History
                </h3>
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toast("History cleared! 🧹", { duration: 1500 })}
                    className="rounded-md px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted"
                  >
                    Clear all
                  </motion.button>
                  <button onClick={handleClosePanel}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
                </div>
              </div>
              <div className="space-y-0.5 max-h-60 overflow-auto">
                {history.map((h, i) => {
                  const t = tabs.find((t) => t.id === h)!;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ x: 3 }}
                      onClick={() => { onTabChange(h); setShowHistory(false); }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted ${i === historyIndex ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                    >
                      <span className="text-sm">{t.emoji}</span>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{t.label}</p>
                        <p className="text-[10px] opacity-60">{t.url}</p>
                      </div>
                      {i === historyIndex && (
                        <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] font-medium text-primary">current</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAccount && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              className="absolute right-4 top-1 z-50 w-80 rounded-xl border border-border bg-card p-4 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Account
                </h3>
                <button onClick={handleClosePanel}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg"
                >
                  AS
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground">Anas Shafiq</p>
                  <p className="text-xs text-muted-foreground">anasshafiq9988@gmail.com</p>
                  <p className="text-[10px] text-traffic-green mt-0.5">● Online</p>
                </div>
              </div>
              <div className="mt-3 space-y-0.5">
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => toast("Managing your account... 👤", { duration: 1500 })}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" /> Manage Account
                </motion.button>
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    onToggleIncognito();
                    setShowAccount(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
                >
                  <EyeOff className="h-3.5 w-3.5" /> {isIncognito ? "Exit Incognito" : "Go Incognito"}
                </motion.button>
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    window.open("https://github.com/anasshafiq12", "_blank");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" /> View GitHub Profile
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-background" onClick={handleClosePanel}>
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
      <div className="flex items-center justify-between border-t border-browser-chrome-border bg-browser-toolbar px-4 py-1">
        <motion.span
          key={isRefreshing ? "loading" : currentTab.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] text-muted-foreground"
        >
          {isRefreshing ? "⏳ Loading..." : `✅ Secure | https://${currentTab.url}`}
        </motion.span>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
          {isIncognito ? "🕵️ Incognito" : "👤 Anas Shafiq"}
          <span className="hidden md:inline">• Built with ❤️ & React</span>
        </span>
      </div>
    </motion.div>
  );
};

export default BrowserFrame;
