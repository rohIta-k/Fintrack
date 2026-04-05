import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency } from "../../../utils/formatCurrency";

const SpendingChart = ({ data = [] }) => {
  const categoryColors = {
    food: "#10b981",
    shopping: "#f97316",
    transport: "#3b82f6",
    bills: "#0f172a",
    entertainment: "#6366f1",
    health: "#ec4899",
    travel: "#14b8a6",
    others: "#94a3b8",
  };

  const chartData = data.map(item => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    value: item.amount,
    color: categoryColors[item.category] || "#cbd5e1"
  }));

  const filteredChartData = chartData
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalAmount = filteredChartData.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const sideLegend = chartData.slice(0, 3);
  const bottomLegend = chartData.slice(3);

  return (
    <div className="card h-[390px] p-5 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        Spending Breakdown
      </h2>

      <div className="flex flex-row items-center justify-between mb-2">

        {/* Left Legends */}
        <div className="flex flex-col gap-3 min-w-[120px]">
          {sideLegend.map((item) => (
            <div key={item.name} className="flex flex-col">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[15px] font-semibold text-slate-700">
                  {item.name}
                </span>
              </div>
              <span className="text-[13px] font-medium text-slate-400 ml-4">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>

        {/* Donut */}
        <div className="relative w-[180px] h-[180px] shrink-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 translate-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              This Month
            </span>
            <span className="text-xl font-bold text-slate-900 leading-none">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredChartData}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                cornerRadius={4}
                stroke="none"
              >
                {filteredChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => formatCurrency(value)}
                wrapperStyle={{ zIndex: 1000 }}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="grid grid-cols-3 gap-y-3 gap-x-2 pt-4 border-t border-slate-50 mt-auto">
        {bottomLegend.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-[13px] font-semibold text-slate-700 truncate">
                {item.name}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                {formatCurrency(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;