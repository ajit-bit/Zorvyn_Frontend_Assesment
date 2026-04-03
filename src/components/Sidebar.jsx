import { Home, Table, BarChart3, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "transactions", label: "Transactions", icon: Table },
  { key: "insights", label: "Insights", icon: BarChart3 },
];

export default function Sidebar({ open, setOpen }) {
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-20 md:w-72 xl:w-80 bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-950 border-r border-sky-200 dark:border-slate-800 shadow-lg dark:shadow-black/50 transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="px-3 md:px-4 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-400/20">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
                <span className="text-slate-900 dark:text-white font-bold hidden md:block text-sm">FinanceApp</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="md:hidden rounded-lg p-1 bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.key;
                return (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl transition-all duration-200 text-left text-sm font-semibold ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-700 hover:bg-blue-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden md:inline">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="mb-6 px-3 md:px-4">
            <p className="text-xs text-slate-500 dark:text-gray-500 text-center">© 2026 FinanceApp</p>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 md:hidden z-50 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );
}
