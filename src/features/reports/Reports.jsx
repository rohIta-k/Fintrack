import { useFetch } from "../../hooks/useFetch";
import { getReportsData } from "../../services/reports.api";

import InsightCard from "./components/InsightCard";
import TrendChart from "./components/TrendChart";
import IncomeExpenseChart from "./components/IncomeExpenseChart";

import { formatCurrency } from "../../utils/formatCurrency";

const Reports = () => {
  const { data, loading, error, refetch } = useFetch(getReportsData);

  // Loading State
  if (loading) {
    return (
      <div className="container-app page-padding flex flex-col gap-6 animate-pulse">

        {/* Heading */}
        <div className="space-y-2">
          <div className="h-8 w-1/2 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-2xl h-[110px]"
            ></div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-2xl h-[360px]"></div>
          <div className="bg-gray-200 rounded-2xl h-[360px]"></div>
        </div>

      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container-app page-padding flex flex-col gap-4">
        <p className="text-red-500">Failed to load reports</p>
        <button className="btn-primary w-fit" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  const insights = data?.insights || {};
  const categoryTrends = data?.categoryTrends || [];
  const incomeExpenseTrends = data?.incomeExpenseTrends || [];

  return (
    <div className="container-app page-padding flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight leading-snug">
          Reports & Insights
        </h1>

        <p className="mt-2 text-sm md:text-base text-[var(--muted)]">
          Understand your financial patterns and optimise spending.
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <InsightCard
          title="Top Spending Category"
          value={
            insights.topSpendingCategory
              ? `${insights.topSpendingCategory.category} (${insights.topSpendingCategory.percentage}%)`
              : "-"
          }
          subtitle={
            insights.topSpendingCategory
              ? `${formatCurrency(insights.topSpendingCategory.amount)} spent`
              : ""
          }
          icon="🛍️"
          color="bg-orange-100 text-orange-600"
        />

        <InsightCard
          title="Highest Spending Month"
          value={insights.highestSpendingMonth?.month || "-"}
          subtitle={
            insights.highestSpendingMonth
              ? `${formatCurrency(insights.highestSpendingMonth.amount)} total expenses`
              : ""
          }
          icon="📅"
          color="bg-green-100 text-green-600"
        />

        <InsightCard
          title="Longest Expense Streak"
          value={
            insights.longestExpenseStreak
              ? `${insights.longestExpenseStreak} days`
              : "-"
          }
          subtitle="Consecutive days with spending"
          icon="🔥"
          color="bg-orange-100 text-orange-600"
        />

        <InsightCard
          title="Avg. Monthly Savings"
          value={insights.averageMonthlySavings || 0}
          subtitle={
            insights.savingsRate
              ? `${insights.savingsRate}% savings rate`
              : ""
          }
          icon="💰"
          color="bg-emerald-100 text-emerald-600"
        />

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart data={categoryTrends} />
        <IncomeExpenseChart data={incomeExpenseTrends} />
      </div>
    </div>
  );
};

export default Reports;