import { useState, useEffect, useCallback } from "react";

type CallbackFunction = (...args: any[]) => void;

const useDebounce = (
  callback: CallbackFunction,
  delay: number
): CallbackFunction => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const debouncedFunction = useCallback(
    (...args: any[]) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      const timeout = setTimeout(() => {
        callback(...args);
      }, delay);
      setDebounceTimeout(timeout);
    },
    [callback, delay, debounceTimeout]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return debouncedFunction;
};

export default useDebounce;
