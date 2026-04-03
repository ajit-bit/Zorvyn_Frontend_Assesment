import { useEffect, useLayoutEffect, useState } from "react";
import { useStore } from "./store/useStore";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import FilterBar from "./components/FilterBar";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import RoleSwitcher from "./components/RoleSwitcher";
import Modal from "./components/Modal";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { TrendingUp, Zap } from "lucide-react";

export default function App() {
  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);
  const currentPage = useStore((state) => state.currentPage);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize dark mode from localStorage on app load (before paint)
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    setDarkMode(isDark);
    applyTheme(isDark);
    setMounted(true);
  }, [setDarkMode]);

  // Apply theme whenever darkMode changes
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const applyTheme = (isDark) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen gradient-bg text-slate-800 dark:text-white transition-colors duration-300">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={`${sidebarOpen ? "md:ml-72 xl:ml-80" : ""} sm:ml-20 transition-all duration-300 min-h-screen`}>
        <Topbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <div className="card card-hover">
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Finance Dashboard</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track, analyze, and manage your finances with confidence.</p>
            </div>
            <div className="card card-hover bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg border-none">
              <p className="text-xs uppercase tracking-wide opacity-90">Role</p>
              <RoleSwitcher compact />
            </div>
            <div className="card card-hover">
              <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Current Page</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{currentPage}</p>
            </div>
            <div className="card card-hover">
              <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Last sync</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>

          {(currentPage === "dashboard" || currentPage === "transactions" || currentPage === "insights") && (
            <div className="space-y-8 animate-stagger">
              {currentPage === "dashboard" && (
                <>
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <SummaryCards />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <Charts />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <FilterBar />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <Transactions />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <Insights />
                  </div>
                </>
              )}

              {currentPage === "transactions" && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <FilterBar />
                  <Transactions />
                </div>
              )}

              {currentPage === "insights" && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <Insights />
                </div>
              )}
            </div>
          )}

          <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-sm text-slate-500 dark:text-gray-400">
            Built with React • Tailwind • Recharts • Zustand
          </div>
        </main>

        <Modal />
      </div>
    </div>
  );
}