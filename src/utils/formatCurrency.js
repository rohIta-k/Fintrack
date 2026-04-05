/**
 * Format number into currency (default: INR)
 * Handles null, undefined, invalid values safely
 */

export const formatCurrency = (
  amount,
  options = {
    minimumFractionDigits: 0,
  }
) => {
  // Handle invalid values
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "₹0";
  }

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR", // 🔒 force INR
      minimumFractionDigits: options.minimumFractionDigits ?? 0,
    }).format(amount);
  } catch (error) {
    // fallback 
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  }
};