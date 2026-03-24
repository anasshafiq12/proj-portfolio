import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import BrowserFrame, { type TabId } from "@/components/BrowserFrame";
import HomeTab from "@/components/tabs/HomeTab";
import AboutTab from "@/components/tabs/AboutTab";
import ProjectsTab from "@/components/tabs/ProjectsTab";
import ContactTab from "@/components/tabs/ContactTab";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isIncognito, setIsIncognito] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [history, setHistory] = useState<TabId[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(tab);
      return newHistory;
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const handleBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActiveTab(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActiveTab(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  const handleToggleIncognito = useCallback(() => {
    setIsIncognito((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onNavigate={handleTabChange} />;
      case "about":
        return <AboutTab />;
      case "projects":
        return <ProjectsTab />;
      case "contact":
        return <ContactTab />;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <BrowserFrame
            key="browser"
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isIncognito={isIncognito}
            onToggleIncognito={handleToggleIncognito}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            history={history}
            historyIndex={historyIndex}
            onBack={handleBack}
            onForward={handleForward}
            canGoBack={historyIndex > 0}
            canGoForward={historyIndex < history.length - 1}
          >
            {renderContent()}
          </BrowserFrame>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
