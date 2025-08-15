import { useState, useEffect } from 'react';

let globalLoading = false;
let listeners: ((val: boolean) => void)[] = [];

export function setGlobalLoading(value: boolean) {
  globalLoading = value;
  listeners.forEach((listener) => listener(globalLoading));
}

export function useGlobalLoading() {
  const [isLoading, setIsLoading] = useState(globalLoading);

  useEffect(() => {
    const listener = (val: boolean) => setIsLoading(val);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return isLoading;
}
