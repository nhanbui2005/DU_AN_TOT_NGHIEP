import { useState, useCallback } from 'react';

interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export function useCounter({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}) {
  const [value, setValue] = useState(initialValue);

  const increment = useCallback(() => {
    setValue(prev => {
      const newValue = prev + step;
      return newValue > max ? max : newValue;
    });
  }, [max, step]);

  const decrement = useCallback(() => {
    setValue(prev => {
      const newValue = prev - step;
      return newValue < min ? min : newValue;
    });
  }, [min, step]);

  const setValueWithLimit = useCallback((newValue: number) => {
    if (newValue < min) {
      setValue(min);
    } else if (newValue > max) {
      setValue(max);
    } else {
      setValue(newValue);
    }
  }, [min, max]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    increment,
    decrement,
    setValue: setValueWithLimit,
    reset,
    isMin: value === min,
    isMax: value === max,
  };
} 