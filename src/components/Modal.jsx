import { X, Plus } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store/useStore";
import { CATEGORIES } from "../data";

export default function Modal() {
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const addTransaction = useStore((state) => state.addTransaction);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "Salary",
    amount: "",
    type: "income",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTransaction({
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount),
      type: formData.type,
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category: "Salary",
      amount: "",
      type: "income",
    });
    setErrors({});
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Transaction</h2>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Transaction Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  handleInputChange({
                    target: { name: "type", value: "income" },
                  })
                }
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  formData.type === "income"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                    : "bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-gray-300 hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                💰 Income
              </button>
              <button
                type="button"
                onClick={() =>
                  handleInputChange({
                    target: { name: "type", value: "expense" },
                  })
                }
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  formData.type === "expense"
                    ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-gray-300 hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                💸 Expense
              </button>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border ${
                errors.date ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-500"
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.date}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-400 dark:hover:border-slate-600"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0"
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border ${
                errors.amount ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-500"
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200`}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.amount}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mt-8 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 border border-slate-300 dark:border-slate-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
