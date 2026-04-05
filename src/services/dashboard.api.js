import transactionsData from "../data/transactions.json";
import { fakeApi } from "./api";

import {
  calculateSummary,
  getMonthlyTrends,
  getCategoryBreakdown,
} from "../utils/analytics";

/**
 * Get dashboard data (computed from transactions)
 */
export const getDashboardData = async () => {
  // simulate API delay
  const transactions = await fakeApi(transactionsData, {
    delay: 700,
    errorRate: 0.05,
  });

  // compute everything
  const summary = calculateSummary(transactions);
  const monthlyTrends = getMonthlyTrends(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);

  return {
    summary,
    monthlyTrends,
    categoryBreakdown,
  };
};