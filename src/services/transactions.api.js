import transactionsData from "../data/transactions.json";
import { fakeApi } from "./api";

export const getTransactions = async (filters = {}) => {
  let data = [...transactionsData];

  // 🔍 SEARCH
  if (filters.search) {
    const search = filters.search.toLowerCase();
    data = data.filter(
      (tx) =>
        tx.notes?.toLowerCase().includes(search) ||
        tx.category.toLowerCase().includes(search)
    );
  }

  // TYPE
  if (filters.type) {
    data = data.filter((tx) => tx.type === filters.type);
  }

  // CATEGORY
  if (filters.category) {
    data = data.filter((tx) => tx.category === filters.category);
  }

  // MIN AMOUNT
  if (filters.minAmount) {
    data = data.filter((tx) => tx.amount >= Number(filters.minAmount));
  }

  // MAX AMOUNT
  if (filters.maxAmount) {
    data = data.filter((tx) => tx.amount <= Number(filters.maxAmount));
  }

  // DATE RANGE
  if (filters.startDate) {
    data = data.filter(
      (tx) => new Date(tx.date + "T00:00:00") >= new Date(filters.startDate)
    );
  }

  if (filters.endDate) {
    data = data.filter(
      (tx) => new Date(tx.date + "T23:59:59") <= new Date(filters.endDate)
    );
  }

  return fakeApi(data, {
    delay: 600,
    errorRate: 0.05,
  });
};