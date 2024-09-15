import { useState } from 'react';

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = window.localStorage.getItem(keyName);

    if (value) {
      return JSON.parse(value);
    } else {
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));

      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    window.localStorage.setItem(keyName, JSON.stringify(newValue));

    setStoredValue(newValue);
  }

  return [storedValue, setValue] as const;
}