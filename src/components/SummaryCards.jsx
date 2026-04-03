import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useStore } from "../store/useStore";
import { calculateSummary, formatCurrency } from "../utils";

export default function SummaryCards() {
  const transactions = useStore((state) => state.transactions);
  const { income, expenses, balance } = calculateSummary(transactions);

  const Card = ({ title, value, icon: Icon, bgColor, textColor, gradientFrom, gradientTo }) => (
    <div className={`card card-hover group relative overflow-hidden p-6 md:p-8 space-y-3 animate-fade-in-up`}>
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${bgColor}`} />
      
      {/* Background Gradient Accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</p>
            <h2 className={`${textColor} text-4xl md:text-5xl font-bold mt-2 tracking-tight`}>
              {formatCurrency(value)}
            </h2>
          </div>

          {/* Icon Container */}
          <div className={`p-3 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-all duration-300 ml-4 flex-shrink-0`}>
            <Icon className={`${textColor} w-6 h-6 transition-transform duration-300 group-hover:scale-110`} />
          </div>
        </div>

        {/* Change Indicator */}
        <p className="text-gray-500 text-xs font-medium flex items-center gap-1">
          <span className={textColor}>●</span>
          Active
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total Balance"
        value={balance}
        icon={Wallet}
        bgColor="bg-blue-500/5"
        textColor="text-blue-400"
        gradientFrom="from-blue-500"
        gradientTo="to-blue-600"
      />
      <Card
        title="Total Income"
        value={income}
        icon={TrendingUp}
        bgColor="bg-green-500/5"
        textColor="text-green-400"
        gradientFrom="from-green-500"
        gradientTo="to-emerald-600"
      />
      <Card
        title="Total Expenses"
        value={expenses}
        icon={TrendingDown}
        bgColor="bg-red-500/5"
        textColor="text-red-400"
        gradientFrom="from-red-500"
        gradientTo="to-rose-600"
      />
    </div>
  );
}