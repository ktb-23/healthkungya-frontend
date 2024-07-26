import { useState, useEffect } from 'react';
export default function useDebounce(value, delay) {
  // 디바운스 이용
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 딜레이 기다렸다가 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
