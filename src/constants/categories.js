// Expense Categories
export const EXPENSE_CATEGORIES = [
  {
    id: "food",
    label: "Food & Dining",
    color: "#ef4444",
    icon: "🍔",
  },
  {
    id: "shopping",
    label: "Shopping",
    color: "#f97316",
    icon: "🛍️",
  },
  {
    id: "transport",
    label: "Transportation",
    color: "#3b82f6",
    icon: "🚗",
  },
  {
    id: "bills",
    label: "Bills & Utilities",
    color: "#6366f1",
    icon: "💡",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    color: "#8b5cf6",
    icon: "🎬",
  },
  {
    id: "health",
    label: "Health",
    color: "#10b981",
    icon: "🏥",
  },
  {
    id: "travel",
    label: "Travel",
    color: "#14b8a6",
    icon: "✈️",
  },
  {
    id: "others",
    label: "Others",
    color: "#6b7280",
    icon: "📦",
  },
];

// Income Categories
export const INCOME_CATEGORIES = [
  {
    id: "salary",
    label: "Salary",
    color: "#10b981",
    icon: "💼",
  },
  {
    id: "freelance",
    label: "Freelance",
    color: "#22c55e",
    icon: "🧑‍💻",
  },
  {
    id: "investments",
    label: "Investments",
    color: "#0ea5e9",
    icon: "📈",
  },
  {
    id: "business",
    label: "Business",
    color: "#84cc16",
    icon: "🏢",
  },
  {
    id: "other_income",
    label: "Other",
    color: "#6b7280",
    icon: "💰",
  },
];

// Combined helper (useful for dropdowns)
export const ALL_CATEGORIES = [
  ...EXPENSE_CATEGORIES,
  ...INCOME_CATEGORIES,
];

// Helper function → get category by ID
export const getCategoryById = (id) => {
  return ALL_CATEGORIES.find((cat) => cat.id === id);
};