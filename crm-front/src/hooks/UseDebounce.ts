import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

export const useDebounce = (func: SomeFunction, delay: number) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunc = (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunc;
};
