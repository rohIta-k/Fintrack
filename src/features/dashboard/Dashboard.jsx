import { useFetch } from "../../hooks/useFetch";
import { getDashboardData } from "../../services/dashboard.api";

import SummaryCard from "./components/SummaryCard";
import BalanceChart from "./components/BalanceChart";
import SpendingChart from "./components/SpendingChart";

const Dashboard = () => {
    const { data, loading, error, refetch } = useFetch(getDashboardData);

    // Loading State
    if (loading) {
        return (
            <div className="container-app page-padding flex flex-col gap-6 animate-pulse">

                {/* Heading */}
                <div className="space-y-2">
                    <div className="h-8 w-2/3 bg-gray-200 rounded-md"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="card h-[100px] bg-gray-200 rounded-xl"></div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 card h-[300px] bg-gray-200 rounded-xl"></div>
                    <div className="card h-[300px] bg-gray-200 rounded-xl"></div>
                </div>

            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="container-app page-padding flex flex-col gap-4">
                <p className="text-red-500">Failed to load dashboard</p>
                <button className="btn-primary w-fit" onClick={refetch}>
                    Retry
                </button>
            </div>
        );
    }

    const summary = data?.summary || {};
    const monthlyTrends = data?.monthlyTrends || [];
    const categoryBreakdown = data?.categoryBreakdown || [];

    return (
        <div className="container-app page-padding flex flex-col gap-6">
            {/* Heading */}
            <div>
                <h1 className="text-4xl font-semibold tracking-tight leading-snug">
                    All Your Finances, One Intelligent View
                </h1>

                <p className="mt-2 text-sm md:text-base text-[var(--muted)]">
                    Track, analyze, and optimize your financial life.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard
                    title="Total Balance"
                    amount={summary.totalBalance}
                    change={summary.balanceChange}
                />

                <SummaryCard
                    title="Income"
                    amount={summary.income}
                    change={summary.incomeChange}
                    type="income"
                />

                <SummaryCard
                    title="Expenses"
                    amount={summary.expenses}
                    change={summary.expenseChange}
                    type="expense"
                />
            </div>


            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                {/* Line Chart (takes more space) */}
                <div className="lg:col-span-2">
                    <BalanceChart data={monthlyTrends} />
                </div>

                {/* Donut Chart */}
                <SpendingChart data={categoryBreakdown} />
            </div>
        </div>
    );
};

export default Dashboard;