import { useState, useEffect } from "react";

/**
 * Debounce hook
 * Delays value update until user stops typing
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup (very important)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};