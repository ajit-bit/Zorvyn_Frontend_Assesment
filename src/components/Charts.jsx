import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../store/useStore";
import { getCategoryBreakdown, getMonthlyTrend, formatCurrency } from "../utils";
import { CATEGORY_COLORS } from "../data";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

export default function Charts() {
  const transactions = useStore((state) => state.transactions);
  const categoryData = getCategoryBreakdown(transactions);
  const monthlyData = getMonthlyTrend(transactions);

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: CATEGORY_COLORS[category] || "#64748b",
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-glass p-4 rounded-xl shadow-xl">
          <p className="text-gray-300 text-sm font-medium">{payload[0].payload.name || payload[0].name}</p>
          <p className="text-emerald-400 font-bold text-lg mt-1">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trend Line Chart */}
      <div className="card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Monthly Trend</h3>
          </div>

          {monthlyData.length > 0 ? (
            <div className="h-80 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Income"
                    isAnimationActive={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: "#ef4444", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Expenses"
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-400">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Spending by Category Pie Chart */}
      <div className="card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <PieChartIcon className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Spending by Category</h3>
          </div>

          {pieData.length > 0 ? (
            <div className="h-80 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-400">No expense data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}