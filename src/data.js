export const initialTransactions = [
  // Income
  { id: 1, date: "2026-03-01", amount: 5000, category: "Salary", type: "income" },
  { id: 2, date: "2026-03-15", amount: 2000, category: "Freelance", type: "income" },
  { id: 3, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
  { id: 4, date: "2026-04-10", amount: 1500, category: "Bonus", type: "income" },

  // Expenses
  { id: 5, date: "2026-03-02", amount: 1200, category: "Rent", type: "expense" },
  { id: 6, date: "2026-03-05", amount: 450, category: "Food & Dining", type: "expense" },
  { id: 7, date: "2026-03-08", amount: 250, category: "Transportation", type: "expense" },
  { id: 8, date: "2026-03-10", amount: 800, category: "Shopping", type: "expense" },
  { id: 9, date: "2026-03-12", amount: 120, category: "Entertainment", type: "expense" },
  { id: 10, date: "2026-03-15", amount: 300, category: "Utilities", type: "expense" },
  { id: 11, date: "2026-03-18", amount: 650, category: "Food & Dining", type: "expense" },
  { id: 12, date: "2026-03-20", amount: 1200, category: "Rent", type: "expense" },
  { id: 13, date: "2026-03-22", amount: 200, category: "Entertainment", type: "expense" },
  { id: 14, date: "2026-03-25", amount: 380, category: "Transportation", type: "expense" },
  { id: 15, date: "2026-03-28", amount: 500, category: "Shopping", type: "expense" },
  
  // April
  { id: 16, date: "2026-04-02", amount: 1200, category: "Rent", type: "expense" },
  { id: 17, date: "2026-04-05", amount: 600, category: "Food & Dining", type: "expense" },
  { id: 18, date: "2026-04-08", amount: 200, category: "Utilities", type: "expense" },
  { id: 19, date: "2026-04-12", amount: 700, category: "Shopping", type: "expense" },
  { id: 20, date: "2026-04-15", amount: 350, category: "Entertainment", type: "expense" },
];

export const CATEGORIES = [
  "Salary",
  "Freelance",
  "Bonus",
  "Rent",
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Education",
  "Other",
];

export const CATEGORY_COLORS = {
  Salary: "#10b981",
  Freelance: "#14b8a6",
  Bonus: "#06b6d4",
  Rent: "#f87171",
  "Food & Dining": "#fb923c",
  Transportation: "#a78bfa",
  Shopping: "#ec4899",
  Entertainment: "#f472b6",
  Utilities: "#94a3b8",
  Healthcare: "#ef4444",
  Education: "#3b82f6",
  Other: "#64748b",
};
