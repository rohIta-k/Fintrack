import {
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    ComposedChart
} from "recharts";

import { formatCurrency } from "../../../utils/formatCurrency";

const BalanceChart = ({ data = [] }) => {
    const maxValue = Math.max(...data.map((d) => d.balance), 0);
    const maxRounded = Math.ceil(maxValue / 10000) * 10000;

    const ticks = Array.from(
        { length: maxRounded / 10000 + 1 },
        (_, i) => i * 10000
    );

    return (
        <div className="card h-[390px] flex flex-col p-6 bg-white rounded-2xl shadow-sm">
            {/* Header Section */}
            <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-lg font-semibold text-slate-800">Balance Overview</h2>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Last 6 months</span>
            </div>

            {/* Chart Section */}
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
                                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={15}
                            tick={{ fill: "#64748b", fontSize: 13 }}
                            padding={{ left: 30, right: 30 }}
                        />

                        <YAxis
                            domain={[0, maxRounded]}
                            ticks={ticks}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => (v === 0 ? "₹0" : `₹${v / 1000}k`)}
                            tick={{ fill: "#64748b", fontSize: 13 }}
                            tickMargin={10}
                        />

                        <Tooltip
                            cursor={{ stroke: "#f97316", strokeWidth: 1, strokeDasharray: "4 4" }}
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "none",
                                borderRadius: "12px",
                                padding: "12px",
                            }}
                            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}
                            labelStyle={{ color: "#94a3b8", marginBottom: "4px", fontSize: "11px", textTransform: "uppercase" }}
                            formatter={(value) => [formatCurrency(value), "Balance"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="balance"
                            stroke="none"
                            fill="url(#balanceGradient)"
                            tooltipType="none"
                            activeDot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#f97316"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 6,
                                stroke: "#f97316",
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

export default BalanceChart;