import { Search, Filter, Download } from "lucide-react";
import { useStore } from "../store/useStore";
import { CATEGORIES } from "../data";
import { exportToCSV } from "../utils";

export default function FilterBar() {
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const filterCategory = useStore((state) => state.filterCategory);
  const setFilterCategory = useStore((state) => state.setFilterCategory);
  const filterType = useStore((state) => state.filterType);
  const setFilterType = useStore((state) => state.setFilterType);
  const sortBy = useStore((state) => state.sortBy);
  const setSortBy = useStore((state) => state.setSortBy);
  const sortOrder = useStore((state) => state.sortOrder);
  const setSortOrder = useStore((state) => state.setSortOrder);
  const transactions = useStore((state) => state.transactions);

  const handleExport = () => {
    exportToCSV(transactions);
  };

  return (
    <div className="card card-hover p-4 md:p-8 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg">
            <Filter className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Advanced Filters</h3>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-500/10 dark:bg-emerald-500/20 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg transition-all duration-200 text-sm font-semibold border border-emerald-500/30 hover:border-emerald-500/60"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
        <input
          type="text"
          placeholder="Search by category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Category Filter */}
        <div className="group">
          <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Category
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="group">
          <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="group">
          <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="group">
          <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Active Filters Indicator */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-sm">
        {searchQuery && (
          <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-medium">
            🔍 Search: {searchQuery}
          </span>
        )}
        {filterCategory !== "all" && (
          <span className="px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-medium">
            📁 {filterCategory}
          </span>
        )}
        {filterType !== "all" && (
          <span className="px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-medium">
            📊 {filterType === "income" ? "💰 Income" : "📉 Expense"}
          </span>
        )}
      </div>
    </div>
  );
}
