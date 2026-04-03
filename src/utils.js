export const calculateSummary = (transactions) => {
  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const getCategoryBreakdown = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });
  return map;
};

export const getMonthlyTrend = (transactions) => {
  const months = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // YYYY-MM
    if (!months[month]) {
      months[month] = { income: 0, expenses: 0 };
    }
    if (t.type === "income") {
      months[month].income += t.amount;
    } else {
      months[month].expenses += t.amount;
    }
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { income, expenses }]) => ({
      month: formatMonthLabel(month),
      income,
      expenses,
      balance: income - expenses,
    }));
};

const formatMonthLabel = (monthStr) => {
  const [year, month] = monthStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const getHighestSpendingCategory = (transactions) => {
  const breakdown = getCategoryBreakdown(transactions);
  const entries = Object.entries(breakdown);
  if (entries.length === 0) return null;
  return entries.reduce((max, [cat, amount]) =>
    amount > max[1] ? [cat, amount] : max
  );
};

export const calculateSavingsRate = (transactions) => {
  const { income, expenses } = calculateSummary(transactions);
  if (income === 0) return 0;
  return ((income - expenses) / income * 100).toFixed(1);
};

export const exportToCSV = (transactions) => {
  const headers = ["Date", "Category", "Amount", "Type"];
  const rows = transactions.map((t) => [t.date, t.category, t.amount, t.type]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};