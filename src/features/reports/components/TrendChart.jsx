import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { formatCurrency } from "../../../utils/formatCurrency";

const CATEGORY_COLORS = {
  food: "#10b981",
  shopping: "#f97316",
  transport: "#3b82f6",
  bills: "#0f172a",
  entertainment: "#6366f1",
  health: "#ec4899",
  travel: "#14b8a6",
  others: "#94a3b8",
};

const TrendChart = ({ data = [] }) => {
  if (!data.length) return null;

  const categories = Object.keys(data[0]).filter((key) => key !== "month");

  const maxValue = Math.max(
    ...data.flatMap((d) => categories.map((c) => d[c] || 0)),
    0
  );

  const maxRounded = Math.ceil(maxValue / 5000) * 5000;

  return (
    <div className="card h-[360px] p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Category Trends
        </h2>
        <span className="text-xs text-slate-400 uppercase tracking-wide">
          Last 6 months
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickMargin={10}
          />

          {/* Y Axis */}
          <YAxis
            domain={[0, maxRounded]}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v === 0 ? "₹0" : `₹${v / 1000}k`)}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickMargin={10}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ stroke: "#e2e8f0", strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
            }}
            labelStyle={{
              color: "#94a3b8",
              fontSize: "11px",
              textTransform: "uppercase",
            }}
            itemStyle={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 500,
            }}
            formatter={(value) => formatCurrency(value)}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
            iconType="circle"
          />

          {/* Dynamic Lines */}
          {categories.map((cat) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={CATEGORY_COLORS[cat] || "#94a3b8"}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                stroke: CATEGORY_COLORS[cat],
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;