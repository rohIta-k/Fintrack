import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  Area,
} from "recharts";

import { formatCurrency } from "../../../utils/formatCurrency";

const IncomeExpenseChart = ({ data = [] }) => {
  if (!data.length) return null;

  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.income || 0, d.expense || 0)),
    0
  );

  const maxRounded = Math.ceil(maxValue / 10000) * 10000;

  return (
    <div className="card h-[360px] flex flex-col p-6 rounded-2xl shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Income vs Expenses
        </h2>
        <span className="text-xs text-slate-400 uppercase tracking-wider">
          Last 6 months
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

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
              tickMargin={12}
              tick={{ fill: "#64748b", fontSize: 13 }}
              padding={{ left: 20, right: 20 }}
            />

            {/* Y Axis */}
            <YAxis
              domain={[0, maxRounded]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v === 0 ? "₹0" : `₹${v / 1000}k`)}
              tick={{ fill: "#64748b", fontSize: 13 }}
              tickMargin={10}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ stroke: "#94a3b8", strokeDasharray: "4 4" }}
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

            {/* Income Area */}
            <Area
              type="monotone"
              dataKey="income"
              stroke="none"
              fill="url(#incomeGradient)"
              tooltipType="none"
            />

            {/* Expense Area */}
            <Area
              type="monotone"
              dataKey="expense"
              stroke="none"
              fill="url(#expenseGradient)"
              tooltipType="none"
            />

            {/* Income Line */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              name="Income"
              activeDot={{
                r: 5,
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />

            {/* Expense Line */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
              name="Expenses"
              activeDot={{
                r: 5,
                stroke: "#ef4444",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;