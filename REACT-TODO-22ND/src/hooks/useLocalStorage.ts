import { useState } from 'react';

// localStorage와 동기화되는 state를 제공하는 커스텀 훅
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // state 초기화 시 localStorage에서 값 읽어오기
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`localStorage key 읽어오기 오류 "${key}":`, error);
      return initialValue;
    }
  });

  // 값을 설정하는 함수
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(storedValue) : value;
      setStoredValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`localStorage key 값 설정 오류 "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;