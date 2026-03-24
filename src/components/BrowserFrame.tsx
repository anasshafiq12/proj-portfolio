import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, RotateCw, Shield, Star, Lock,
  Search, ChevronDown, User, Clock, BookMarked, Settings,
  EyeOff, X, Plus, Home as HomeIcon, Bookmark
} from "lucide-react";

export type TabId = "home" | "about" | "projects" | "contact";

interface Tab {
  id: TabId;
  label: string;
  emoji: string;
  url: string;
}

const tabs: Tab[] = [
  { id: "home", label: "Home", emoji: "🏠", url: "shafiq.dev" },
  { id: "about", label: "About", emoji: "👤", url: "shafiq.dev/about" },
  { id: "projects", label: "Projects", emoji: "📂", url: "shafiq.dev/projects" },
  { id: "contact", label: "Contact", emoji: "✉️", url: "shafiq.dev/contact" },
];

const bookmarks = [
  { label: "GitHub", url: "github.com/anasshafiq12", icon: "📁" },
  { label: "LinkedIn", url: "linkedin.com/in/anas-shafiq", icon: "💼" },
  { label: "Projects", url: "shafiq.dev/projects", icon: "🚀" },
  { label: "Resume", url: "shafiq.dev/resume", icon: "📄" },
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

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <motion.div
      className="mx-auto flex h-[95vh] max-h-[900px] w-[98vw] max-w-[1400px] flex-col overflow-hidden rounded-xl border border-browser-chrome-border bg-browser-chrome shadow-2xl browser-glow"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-browser-chrome-border bg-browser-toolbar px-4 py-2">
        <div className="flex items-center gap-2">
          <button onClick={() => {}} className="h-3 w-3 rounded-full bg-traffic-red transition-transform hover:scale-125" />
          <button onClick={() => {}} className="h-3 w-3 rounded-full bg-traffic-yellow transition-transform hover:scale-125" />
          <button onClick={() => {}} className="h-3 w-3 rounded-full bg-traffic-green transition-transform hover:scale-125" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {isIncognito ? "🕵️ Incognito Mode" : "Shafiq Browser"}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleIncognito}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title={isIncognito ? "Exit Incognito" : "Go Incognito"}
          >
            <EyeOff className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex items-end gap-0.5 bg-browser-toolbar px-2 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group relative flex items-center gap-1.5 rounded-t-lg px-4 py-2 text-xs font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-browser-tab-active text-foreground shadow-sm z-10"
                : "bg-browser-tab-inactive text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
        <button className="mb-1 ml-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-2 border-b border-browser-chrome-border bg-browser-tab-active px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onForward}
            disabled={!canGoForward}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onRefresh}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <RotateCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => onTabChange("home")}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <HomeIcon className="h-4 w-4" />
          </button>
        </div>

        {/* URL bar */}
        <div className="flex flex-1 items-center gap-2 rounded-full bg-browser-url-bg px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/30">
          <Lock className="h-3.5 w-3.5 text-traffic-green" />
          <div className="flex flex-1 items-center text-sm">
            <span className="text-muted-foreground">https://</span>
            <span className="font-medium text-foreground">{currentTab.url}</span>
          </div>
          <Star className="h-3.5 w-3.5 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted">
            <Shield className="h-4 w-4" />
          </button>
          <button
            onClick={() => { setShowHistory(!showHistory); setShowAccount(false); }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <Clock className="h-4 w-4" />
          </button>
          <button
            onClick={() => { setShowAccount(!showAccount); setShowHistory(false); }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <User className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`rounded-md p-1.5 transition-colors hover:bg-muted ${showBookmarks ? "text-primary" : "text-muted-foreground"}`}
          >
            <BookMarked className="h-4 w-4" />
          </button>
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
            className="flex items-center gap-1 overflow-hidden border-b border-browser-chrome-border bg-browser-tab-active px-3 py-1"
          >
            {bookmarks.map((bm) => (
              <button
                key={bm.label}
                onClick={() => {
                  if (bm.url.includes("projects")) onTabChange("projects");
                }}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <span>{bm.icon}</span>
                <span>{bm.label}</span>
              </button>
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
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute right-16 top-0 z-50 w-72 rounded-lg border border-border bg-card p-3 shadow-xl"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold">History</h3>
                <button onClick={() => setShowHistory(false)}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
              </div>
              <div className="space-y-1">
                {history.map((h, i) => {
                  const t = tabs.find((t) => t.id === h)!;
                  return (
                    <button
                      key={i}
                      onClick={() => { onTabChange(h); setShowHistory(false); }}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-muted ${i === historyIndex ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                    >
                      <Clock className="h-3 w-3" />
                      <span>{t.emoji} {t.label}</span>
                      <span className="ml-auto text-[10px] opacity-50">{t.url}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAccount && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute right-4 top-0 z-50 w-72 rounded-lg border border-border bg-card p-4 shadow-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Account</h3>
                <button onClick={() => setShowAccount(false)}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  AS
                </div>
                <div>
                  <p className="text-sm font-semibold">Anas Shafiq</p>
                  <p className="text-xs text-muted-foreground">anasshafiq9988@gmail.com</p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted">
                  <Settings className="h-3 w-3" /> Manage Account
                </button>
                <button
                  onClick={onToggleIncognito}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  <EyeOff className="h-3 w-3" /> {isIncognito ? "Exit Incognito" : "Go Incognito"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-browser-chrome-border bg-browser-toolbar px-4 py-1">
        <span className="text-[10px] text-muted-foreground">
          {isRefreshing ? "Loading..." : `✓ Secure | https://${currentTab.url}`}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {isIncognito ? "🕵️ Incognito" : "👤 Anas Shafiq"}
        </span>
      </div>
    </motion.div>
  );
};

export default BrowserFrame;
