import { Trash2, ArrowUpRight, ArrowDownLeft, List } from "lucide-react";
import { useStore } from "../store/useStore";
import { formatCurrency, formatDate } from "../utils";

export default function Transactions() {
  const transactions = useStore((state) => state.transactions);
  const searchQuery = useStore((state) => state.searchQuery);
  const filterCategory = useStore((state) => state.filterCategory);
  const filterType = useStore((state) => state.filterType);
  const sortBy = useStore((state) => state.sortBy);
  const sortOrder = useStore((state) => state.sortOrder);
  const role = useStore((state) => state.role);
  const deleteTransaction = useStore((state) => state.deleteTransaction);
  const deleteConfirmId = useStore((state) => state.deleteConfirmId);
  const setDeleteConfirmId = useStore((state) => state.setDeleteConfirmId);

  // Get filtered transactions using store's logic
  let filtered = transactions;

  if (searchQuery) {
    filtered = filtered.filter((t) =>
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterCategory !== "all") {
    filtered = filtered.filter((t) => t.category === filterCategory);
  }

  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  // Sorting
  filtered.sort((a, b) => {
    let comparison = 0;
    if (sortBy === "date") {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === "amount") {
      comparison = a.amount - b.amount;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Salary: "bg-green-500/20 text-green-400 border-green-500/30",
      Freelance: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Bonus: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      Rent: "bg-red-500/20 text-red-400 border-red-500/30",
      "Food & Dining": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Transportation: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Shopping: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      Entertainment: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      Utilities: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      Healthcare: "bg-red-500/20 text-red-400 border-red-500/30",
      Education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  if (filtered.length === 0) {
    return (
      <div className="card p-12 rounded-2xl text-center border-gray-700">
        <p className="text-gray-400 text-lg font-medium">No transactions found</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or add new transactions</p>
      </div>
    );
  }

  return (
    <div className="card border-gray-700 overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="px-6 md:px-8 py-5 border-b border-gray-800 bg-gray-800/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <List className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Recent Transactions
          </h2>
        </div>
        <p className="text-gray-400 text-sm ml-11">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/30 sticky top-0">
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-gray-400 font-semibold uppercase tracking-wider text-xs">
                Date
              </th>
              <th className="px-6 py-4 text-left text-gray-400 font-semibold uppercase tracking-wider text-xs">
                Category
              </th>
              <th className="px-6 py-4 text-right text-gray-400 font-semibold uppercase tracking-wider text-xs">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-gray-400 font-semibold uppercase tracking-wider text-xs">
                Type
              </th>
              {role === "admin" && (
                <th className="px-6 py-4 text-center text-gray-400 font-semibold uppercase tracking-wider text-xs">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, idx) => (
              <tr
                key={t.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 text-gray-300 font-medium">{formatDate(t.date)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(
                      t.category
                    )}`}
                  >
                    {t.category}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 text-right font-bold text-lg ${
                    t.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {t.type === "income" ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={
                        t.type === "income"
                          ? "text-green-400 font-semibold"
                          : "text-red-400 font-semibold"
                      }
                    >
                      {t.type === "income" ? "Income" : "Expense"}
                    </span>
                  </div>
                </td>
                {role === "admin" && (
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setDeleteConfirmId(t.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile */}
      <div className="md:hidden divide-y divide-gray-800">
        {filtered.map((t) => (
          <div key={t.id} className="px-6 py-4 hover:bg-gray-800/30 transition-colors duration-200 group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-500 text-xs font-medium">{formatDate(t.date)}</p>
                <p className="text-white font-semibold mt-2">{t.category}</p>
              </div>
              <span
                className={`font-bold text-lg ${
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {formatCurrency(t.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-800">
              <div className="flex items-center gap-1.5">
                {t.type === "income" ? (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />
                )}
                <span
                  className={
                    t.type === "income"
                      ? "text-green-400 text-xs font-semibold"
                      : "text-red-400 text-xs font-semibold"
                  }
                >
                  {t.type === "income" ? "Income" : "Expense"}
                </span>
              </div>
              {role === "admin" && (
                <button
                  onClick={() => setDeleteConfirmId(t.id)}
                  className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl border border-gray-700 p-6 w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Confirm Delete</h3>
            <p className="text-gray-300 text-sm mb-4">
              Are you sure you want to delete this transaction? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  deleteTransaction(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}