
// SUMMARY CALCULATIONS

export const calculateSummary = (transactions) => {
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentIncome = 0;
    let currentExpenses = 0;

    let prevIncome = 0;
    let prevExpenses = 0;

    transactions.forEach((tx) => {
        const date = new Date(tx.date);
        const month = date.getMonth();
        const year = date.getFullYear();

        // CURRENT MONTH
        if (month === currentMonth && year === currentYear) {
            if (tx.type === "income") currentIncome += tx.amount;
            else currentExpenses += tx.amount;
        }

        // PREVIOUS MONTH
        if (month === prevMonth && year === prevYear) {
            if (tx.type === "income") prevIncome += tx.amount;
            else prevExpenses += tx.amount;
        }
    });

    const currentBalance = currentIncome - currentExpenses;
    const prevBalance = prevIncome - prevExpenses;

    // % change helper
    const getChange = (current, prev) => {
        if (prev === 0) return 0;
        return Number((((current - prev) / prev) * 100).toFixed(1));
    };

    return {
        totalBalance: currentBalance,
        income: currentIncome,
        expenses: currentExpenses,

        balanceChange: getChange(currentBalance, prevBalance),
        incomeChange: getChange(currentIncome, prevIncome),
        expenseChange: getChange(currentExpenses, prevExpenses),
    };
};
// MONTHLY TRENDS (Last 6 months)

export const getMonthlyTrends = (transactions) => {
    const map = {};

    transactions.forEach((tx) => {
        const date = new Date(tx.date);
        const month = date.toLocaleString("default", { month: "short" });

        if (!map[month]) {
            map[month] = { income: 0, expense: 0 };
        }

        if (tx.type === "income") {
            map[month].income += tx.amount;
        } else {
            map[month].expense += tx.amount;
        }
    });

    return Object.entries(map)
        .map(([month, val]) => ({
            month,
            ...val,
            balance: val.income - val.expense,
        }))
        .slice(-6); // last 6 months
};


// CATEGORY BREAKDOWN (Expenses)

export const getCategoryBreakdown = (transactions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const categories = [
    "food",
    "shopping",
    "transport",
    "bills",
    "entertainment",
    "health",
    "travel",
    "others",
  ];

  const map = {};
  categories.forEach((cat) => (map[cat] = 0));

  transactions.forEach((tx) => {
    const date = new Date(tx.date + "T00:00:00"); 

    if (
      tx.type === "expense" &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      map[tx.category] += tx.amount;
    }
  });

  return categories.map((category) => ({
    category,
    amount: map[category],
  }));
};
// CATEGORY TRENDS (Reports)


const ALL_CATEGORIES = [
  "food",
  "shopping",
  "transport",
  "bills",
  "entertainment",
  "health",
  "travel",
  "others",
];

export const getCategoryTrends = (transactions) => {
  const map = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const date = new Date(tx.date);
      const month = date.toLocaleString("default", { month: "short" });

      if (!map[month]) {
        map[month] = {};

        // Initialize ALL categories
        ALL_CATEGORIES.forEach((cat) => {
          map[month][cat] = 0;
        });
      }

      map[month][tx.category] += tx.amount;
    }
  });

  const MONTH_ORDER = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  return Object.entries(map)
    .map(([month, categories]) => ({
      month,
      ...categories,
    }))
    .sort(
      (a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month)
    );
};

// INSIGHTS

export const getInsights = (transactions) => {
  const categoryMap = {};
  const monthlyExpense = {};
  const monthlyIncome = {};

  let totalIncome = 0;
  let totalExpenses = 0;

  // Sort transactions by date (needed for streak)
  const sortedTx = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let currentStreak = 0;
  let longestStreak = 0;

  sortedTx.forEach((tx, index) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", { month: "long" });

    if (tx.type === "income") {
      totalIncome += tx.amount;

      monthlyIncome[month] =
        (monthlyIncome[month] || 0) + tx.amount;
    } else {
      totalExpenses += tx.amount;

      // Category tracking
      categoryMap[tx.category] =
        (categoryMap[tx.category] || 0) + tx.amount;

      // Monthly expense tracking
      monthlyExpense[month] =
        (monthlyExpense[month] || 0) + tx.amount;

      // Streak logic
      if (index > 0) {
        const prevDate = new Date(sortedTx[index - 1].date);
        const diff =
          (date - prevDate) / (1000 * 60 * 60 * 24);

        if (diff <= 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  });

  // Top category
  const topCategoryEntry = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topCategory = topCategoryEntry
    ? {
        category: topCategoryEntry[0],
        amount: topCategoryEntry[1],
        percentage: totalExpenses
          ? ((topCategoryEntry[1] / totalExpenses) * 100).toFixed(1)
          : 0,
      }
    : null;

  // Highest month
  const highestMonthEntry = Object.entries(monthlyExpense).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const highestMonth = highestMonthEntry
    ? {
        month: highestMonthEntry[0],
        amount: highestMonthEntry[1],
      }
    : null;

  // Average savings (correct)
  const monthsCount = new Set(
    transactions.map((tx) =>
      new Date(tx.date).toLocaleString("default", { month: "long" })
    )
  ).size;

  const averageMonthlySavings =
    monthsCount > 0
      ? (totalIncome - totalExpenses) / monthsCount
      : 0;

  return {
    topSpendingCategory: topCategory,
    highestSpendingMonth: highestMonth,
    longestExpenseStreak: longestStreak,
    averageMonthlySavings,
    savingsRate:
      totalIncome > 0
        ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
        : 0,
  };
};

const MONTH_ORDER = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getIncomeExpenseTrends = (transactions) => {
  const map = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!map[month]) {
      map[month] = {
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") {
      map[month].income += tx.amount;
    } else {
      map[month].expense += tx.amount;
    }
  });

  // Convert to array + sort properly
  const result = Object.entries(map)
    .map(([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    }))
    .sort(
      (a, b) =>
        MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month)
    );

  return result;
};

