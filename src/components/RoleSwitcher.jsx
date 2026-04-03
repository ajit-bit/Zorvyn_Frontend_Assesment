import { useStore } from "../store/useStore";
import { Shield, Eye, Plus } from "lucide-react";

export default function RoleSwitcher({ compact = false }) {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap justify-end">
      {/* Role Switcher */}
      <div className="card p-1 border-slate-300 dark:border-slate-700 flex items-center gap-1">
        <button
          onClick={() => setRole("viewer")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            role === "viewer"
              ? "bg-blue-500/30 border border-blue-500/60 text-blue-400 shadow-lg shadow-blue-500/20"
              : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className={`${compact ? "text-xs" : "hidden sm:inline"}`}>Viewer</span>
        </button>
        <button
          onClick={() => setRole("admin")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            role === "admin"
              ? "bg-purple-500/30 border border-purple-500/60 text-purple-400 shadow-lg shadow-purple-500/20"
              : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span className={`${compact ? "text-xs" : "hidden sm:inline"}`}>Admin</span>
        </button>
      </div>

      {/* Add Transaction Button (Admin Only) */}
      {role === "admin" && (
        <button
          onClick={() => setShowModal(!showModal)}
          className={`flex items-center gap-2 ${compact ? "px-3 py-2 text-xs" : "px-5 py-2.5"} bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95`}
        >
          <Plus className="w-4 h-4" />
          <span>{compact ? "Add" : "Add Transaction"}</span>
        </button>
      )}
    </div>
  );
}
