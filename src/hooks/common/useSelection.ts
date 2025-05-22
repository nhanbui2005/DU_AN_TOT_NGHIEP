import { useState, useCallback } from 'react';

type SelectionMode = 'single' | 'multiple';

interface UseSelectionOptions<T> {
  initialSelected?: T[];
  mode?: SelectionMode;
  maxSelections?: number;
}

export function useSelection<T>({
  initialSelected = [],
  mode = 'single',
  maxSelections,
}: UseSelectionOptions<T> = {}) {
  const [selected, setSelected] = useState<T[]>(initialSelected);

  const toggle = useCallback((item: T) => {
    setSelected((prev) => {
      if (mode === 'single') {
        return prev.includes(item) ? [] : [item];
      }

      // Multiple selection mode
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }

      // Check max selections limit
      if (maxSelections && prev.length >= maxSelections) {
        return prev;
      }

      return [...prev, item];
    });
  }, [mode, maxSelections]);

  const select = useCallback((item: T) => {
    setSelected((prev) => {
      if (mode === 'single') {
        return [item];
      }

      if (prev.includes(item)) {
        return prev;
      }

      if (maxSelections && prev.length >= maxSelections) {
        return prev;
      }

      return [...prev, item];
    });
  }, [mode, maxSelections]);

  const deselect = useCallback((item: T) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  }, []);

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  const isSelected = useCallback((item: T) => {
    return selected.includes(item);
  }, [selected]);

  return {
    selected,
    toggle,
    select,
    deselect,
    clear,
    isSelected,
  };
} 