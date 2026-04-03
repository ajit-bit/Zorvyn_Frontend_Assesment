import { useEffect, useRef, useState } from "react";
import { Bell, Search, Moon, Sun, Activity, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../store/useStore";

export default function Topbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = useStore((state) => state.notifications);
  const markNotificationRead = useStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useStore((state) => state.markAllNotificationsRead);

  const isDarkMode = useStore((state) => state.isDarkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  const unreadCount = notifications.filter((item) => !item.read).length;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 backdrop-blur bg-white/70 dark:border-slate-800 dark:bg-slate-950/70 transition-colors duration-300">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            Live / SaaS
          </div>
          <p className="font-semibold text-slate-700 dark:text-gray-300">Real-time performance insights enabled</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400 md:flex">
            <Search className="h-4 w-4" />
            <input
              type="search"
              placeholder="Search transactions, users..."
              className="w-44 bg-transparent text-xs focus:outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDarkMode(!isDarkMode)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.button>          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsNotificationOpen((open) => !open)}
              className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-50 mt-2 w-[min(23rem,calc(100vw-1.25rem))] overflow-hidden rounded-2xl border border-slate-300 bg-white/95 shadow-2xl backdrop-blur-lg ring-1 ring-black/10 dark:border-slate-700 dark:bg-slate-950/90"
                >
                  <div className="absolute right-4 -top-1 h-3 w-3 rotate-45 bg-white dark:bg-slate-950/90" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-gray-100">Notifications</p>
                      <button
                        type="button"
                        onClick={() => markAllNotificationsRead()}
                        className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-sm text-slate-600 dark:text-gray-400">No notifications.</div>
                      ) : (
                        notifications.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              markNotificationRead(item.id);
                              setIsNotificationOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 transition-colors ${
                              item.read
                                ? "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                                : "bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                            } ${unreadCount > 0 && !item.read ? "border-l-4 border-blue-500" : "border-l-4 border-transparent"}`}
                          >
                            <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">{item.title}</p>
                            <p className="text-xs text-slate-600 dark:text-gray-400">{item.message}</p>
                            <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-500">{item.time}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1 text-sm dark:border-slate-700 dark:bg-slate-900 sm:flex">
            <Activity className="h-4 w-4 text-emerald-500" />
            <p className="text-slate-600 dark:text-gray-300">Fast sync: 2m</p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1 text-sm dark:border-slate-700 dark:bg-slate-900 sm:flex">
            <User className="h-4 w-4 text-blue-500" />
            <p className="text-slate-600 dark:text-gray-300">Emma, PM</p>
          </div>        </div>
      </div>
    </header>
  );
}
