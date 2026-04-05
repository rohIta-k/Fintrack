/**
 * Format date into readable format (default: DD MMM YYYY)
 * Handles invalid / null values safely
 */

export const formatDate = (date, options = {}) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  // Invalid date check
  if (isNaN(parsedDate)) return "-";

  const defaultOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  try {
    return new Intl.DateTimeFormat(
      "en-IN",
      options.format || defaultOptions
    ).format(parsedDate);
  } catch (error) {
    return parsedDate.toDateString(); // fallback
  }
};

export const formatShortDate = (date) => {
  return formatDate(date, {
    format: {
      day: "2-digit",
      month: "short",
    },
  });
};

export const formatMonthYear = (date) => {
  return formatDate(date, {
    format: {
      month: "short",
      year: "numeric",
    },
  });
};

export const formatDateTime = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};