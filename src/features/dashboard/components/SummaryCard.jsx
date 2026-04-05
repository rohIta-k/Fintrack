import { formatCurrency } from "../../../utils/formatCurrency";
import { STATUS_COLORS } from "../../../constants/colors";

const SummaryCard = ({
    title,
    amount,
    change,
    type = "neutral",
}) => {
    const isPositive = change >= 0;

    const getAmountColor = () => {
        if (type === "income") return STATUS_COLORS.income;
        if (type === "expense") return STATUS_COLORS.expense;
        return "var(--text)";
    };

    return (
        <div className="card card-hover flex flex-col gap-2">
            {/* Title */}
            <p className="text-sm font-semibold text-[var(--text)]">
                {title}
            </p>

            {/* Amount */}
            <h2
                className="text-3xl font-semibold text-[var(--text)]"
                style={{ color: getAmountColor() }}
            >
                {formatCurrency(amount)}
            </h2>

            {/* Trend */}
            <div className="flex items-center gap-2 text-sm">
                <span
                    className={`
      px-2 py-0.5 rounded-full text-xs font-medium
      bg-gray-100 dark:bg-gray-800
      ${isPositive
                            ? "text-green-600"
                            : "text-red-500"
                        }
    `}
                >
                    {isPositive ? "↑" : "↓"} {Math.abs(change)}%
                </span>

                <span className="text-[var(--muted)]">vs last month</span>
            </div>
        </div >
    )
};

export default SummaryCard;