import { Zap, TrendingUp, Percent, AlertCircle, Flame } from "lucide-react";
import { useStore } from "../store/useStore";
import {
  getCategoryBreakdown,
  getHighestSpendingCategory,
  calculateSavingsRate,
  calculateSummary,
  formatCurrency,
} from "../utils";

export default function Insights() {
  const transactions = useStore((state) => state.transactions);
  const darkMode = useStore((state) => state.darkMode);
  const { income, expenses, balance } = calculateSummary(transactions);
  const highestSpending = getHighestSpendingCategory(transactions);
  const savingsRate = calculateSavingsRate(transactions);

  // Calculate monthly comparison
  const monthlyData = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: 0 };
    }
    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expenses += t.amount;
    }
  });

  const months = Object.entries(monthlyData).sort();
  const thisMonth = months[months.length - 1]?.[1] || { income: 0, expenses: 0 };
  const lastMonth = months[months.length - 2]?.[1] || { income: 0, expenses: 0 };

  const monthlyGrowth =
    lastMonth.income > 0
      ? (((thisMonth.income - lastMonth.income) / lastMonth.income) * 100).toFixed(1)
      : 0;

  const InsightCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => (
    <div className="card card-hover p-6 group relative overflow-hidden animate-fade-in-up">
      {/* Background Accent */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 ${bgColor} opacity-5 dark:opacity-10 rounded-full blur-2xl group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-slate-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wide">
              {title}
            </p>
            <p className={`${color} text-2xl sm:text-3xl font-bold mt-2`}>{value}</p>
          </div>
          <div className={`p-2.5 rounded-lg ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`${color} w-5 h-5`} />
          </div>
        </div>
        {subtitle && (
          <p className="text-slate-500 dark:text-gray-500 text-xs font-medium mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg">
          <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
          Insights & Analytics
        </h2>
      </div>

      {/* Key Metrics - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <InsightCard
          icon={Flame}
          title="Top Spending"
          value={highestSpending ? highestSpending[0] : "—"}
          subtitle={
            highestSpending
              ? `${formatCurrency(highestSpending[1])} spent`
              : "No expenses yet"
          }
          color="text-pink-600 dark:text-pink-400"
          bgColor="bg-pink-500/20"
        />

        <InsightCard
          icon={Percent}
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle={
            savingsRate >= 20
              ? "Excellent savings! 💪"
              : savingsRate > 0
              ? "Room to improve 👍"
              : "Negative ⚠️"
          }
          color={
            savingsRate >= 20
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-yellow-600 dark:text-yellow-400"
          }
          bgColor={savingsRate >= 20 ? "bg-emerald-500/20" : "bg-yellow-500/20"}
        />

        <InsightCard
          icon={TrendingUp}
          title="Monthly Growth"
          value={`${monthlyGrowth > 0 ? "+" : ""}${monthlyGrowth}%`}
          subtitle={
            monthlyGrowth > 0
              ? "Growing income 📈"
              : monthlyGrowth < 0
              ? "Declining trend 📉"
              : "Stable 📊"
          }
          color={
            monthlyGrowth > 0
              ? "text-green-600 dark:text-green-400"
              : monthlyGrowth < 0
              ? "text-red-600 dark:text-red-400"
              : "text-blue-600 dark:text-blue-400"
          }
          bgColor={
            monthlyGrowth > 0
              ? "bg-green-500/20"
              : monthlyGrowth < 0
              ? "bg-red-500/20"
              : "bg-blue-500/20"
          }
        />

        <InsightCard
          icon={AlertCircle}
          title="Balance Status"
          value={formatCurrency(balance)}
          subtitle={
            balance > expenses * 2
              ? "Strong position ✨"
              : balance > 0
              ? "Positive balance 💚"
              : "Attention needed ⚠️"
          }
          color={balance > 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}
          bgColor={balance > 0 ? "bg-blue-500/20" : "bg-red-500/20"}
        />
      </div>

      {/* Summary Statistics Card */}
      <div className="card card-hover p-6 md:p-8 animate-fade-in-up">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="p-2 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-lg">
            <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </span>
          Financial Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Total Transactions */}
          <div className="rounded-lg p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <p className="text-slate-600 dark:text-gray-400 text-sm font-medium mb-2">
              Total Transactions
            </p>
            <p className="text-slate-900 dark:text-white text-3xl font-bold">{transactions.length}</p>
            <p className="text-slate-500 dark:text-gray-500 text-xs mt-2">Tracked items</p>
          </div>

          {/* Average Expense */}
          <div className="rounded-lg p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <p className="text-slate-600 dark:text-gray-400 text-sm font-medium mb-2">
              Avg Expense
            </p>
            <p className="text-slate-900 dark:text-white text-3xl font-bold">
              {transactions.filter((t) => t.type === "expense").length > 0
                ? formatCurrency(
                    expenses /
                      transactions.filter((t) => t.type === "expense").length
                  )
                : "$0"}
            </p>
            <p className="text-slate-500 dark:text-gray-500 text-xs mt-2">Per transaction</p>
          </div>

          {/* Expense to Income Ratio */}
          <div className="rounded-lg p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <p className="text-slate-600 dark:text-gray-400 text-sm font-medium mb-2">
              Budget utilization
            </p>
            <p className="text-slate-900 dark:text-white text-3xl font-bold">
              {income > 0 ? `${((expenses / income) * 100).toFixed(1)}%` : "0%"}
            </p>
            <p className="text-slate-500 dark:text-gray-500 text-xs mt-2">Of income spent</p>
          </div>
        </div>
      </div>
    </div>
  );
}