import transactionsData from "../data/transactions.json";
import { fakeApi } from "./api";

import {
  getInsights,
  getCategoryTrends,
  getIncomeExpenseTrends
} from "../utils/analytics";

/**
 * Get reports data
 */
export const getReportsData = async () => {
  const transactions = await fakeApi(transactionsData, {
    delay: 800,
    errorRate: 0.05,
  });

  return {
    insights: getInsights(transactions),
    categoryTrends: getCategoryTrends(transactions),
    incomeExpenseTrends: getIncomeExpenseTrends(transactions)
  };
};