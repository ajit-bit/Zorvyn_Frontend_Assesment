import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useStore } from "../store/useStore";
import { calculateSummary, formatCurrency } from "../utils";

export default function SummaryCards() {
  const transactions = useStore((state) => state.transactions);
  const { income, expenses, balance } = calculateSummary(transactions);

  const Card = ({ title, value, icon: Icon, bgColor, textColor, gradientFrom, gradientTo }) => (
    <div className="card card-hover relative overflow-hidden p-6 md:p-8 space-y-3 animate-fade-in-up group">
      {/* Gradient Background Effect */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 ${bgColor}`}
      />

      {/* Background Gradient Accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wide">
              {title}
            </p>
            <h2
              className={`${textColor} text-3xl sm:text-4xl md:text-5xl font-bold mt-2 tracking-tight`}
            >
              {formatCurrency(value)}
            </h2>
          </div>

          {/* Icon Container */}
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${bgColor} bg-opacity-10 dark:bg-opacity-20
            group-hover:bg-opacity-20 dark:group-hover:bg-opacity-30 transition-all duration-300 ml-4 flex-shrink-0`}
          >
            <Icon className={`${textColor} w-6 h-6 transition-transform duration-300 group-hover:scale-110`} />
          </div>
        </div>

        {/* Change Indicator */}
        <p className="text-slate-500 dark:text-gray-500 text-xs font-medium flex items-center gap-1">
          <span className={textColor}>●</span>
          Active
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      <Card
        title="Total Balance"
        value={balance}
        icon={Wallet}
        bgColor="from-blue-500 to-blue-600"
        textColor="text-blue-600 dark:text-blue-400"
        gradientFrom="from-blue-500"
        gradientTo="to-blue-600"
      />
      <Card
        title="Total Income"
        value={income}
        icon={TrendingUp}
        bgColor="from-green-500 to-emerald-600"
        textColor="text-green-600 dark:text-green-400"
        gradientFrom="from-green-500"
        gradientTo="to-emerald-600"
      />
      <Card
        title="Total Expenses"
        value={expenses}
        icon={TrendingDown}
        bgColor="from-red-500 to-rose-600"
        textColor="text-red-600 dark:text-red-400"
        gradientFrom="from-red-500"
        gradientTo="to-rose-600"
      />
    </div>
  );
}