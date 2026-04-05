/**
 * Generic mock API handler
 * Simulates network delay + optional errors
 */

export const fakeApi = (
  data,
  options = {
    delay: 800,
    shouldFail: false,
  }
) => {
  const { delay, shouldFail } = options;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate error 
      if (shouldFail) {
        reject(new Error("Something went wrong. Please try again."));
        return;
      }

      resolve(data);
    }, delay);
  });
};