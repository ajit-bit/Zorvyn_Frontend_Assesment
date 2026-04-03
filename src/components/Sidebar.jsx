import { Home, Table, BarChart3, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStore } from "../store/useStore";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "transactions", label: "Transactions", icon: Table },
  { key: "insights", label: "Insights", icon: BarChart3 },
];

export default function Sidebar() {
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-20 md:w-72 xl:w-80 bg-white border-r border-slate-200 shadow-lg dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl transition-all duration-300">
      <div className="h-full flex flex-col justify-between">
        <div className="px-3 py-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Menu className="w-5 h-5 text-cyan-500" />
              <p className="text-slate-900 dark:text-gray-300 font-bold hidden md:block">FinanceApp</p>
            </div>
            <button
              className="rounded-lg p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 transition-colors"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.key;
              return (
                <motion.button
                  key={item.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left ${
                    active
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-semibold">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        <div className="mb-6 px-3">
          <p className="text-xs text-slate-500 dark:text-gray-500 text-center">© 2026 FinanceApp</p>
        </div>
      </div>
    </aside>
  );
}
