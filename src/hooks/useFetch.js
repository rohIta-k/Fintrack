import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook for fetching data (mock API friendly)
 */
export const useFetch = (apiFunction, params = null, options = {}) => {
  const { autoFetch = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    let isMounted = true;

    try {
      const result = params
        ? await apiFunction(params)
        : await apiFunction();

      if (isMounted) {
        setData(result);
      }
    } catch (err) {
      if (isMounted) {
        setError(err?.message || "Something went wrong");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [apiFunction, params]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};