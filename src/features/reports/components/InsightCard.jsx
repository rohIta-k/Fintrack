import { formatCurrency } from "../../../utils/formatCurrency";

const InsightCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "bg-orange-100 text-orange-600",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition">

      {/* Top Row  */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          <span className="text-lg">{icon}</span>
        </div>

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>
      </div>

      {/* Value */}
      <h2 className="text-2xl font-semibold text-slate-900 leading-tight">
        {typeof value === "number" ? formatCurrency(value) : value}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default InsightCard;