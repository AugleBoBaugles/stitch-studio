import { useState, useRef, useCallback } from 'react';
import { generatePattern } from '../lib/patternGenerator.js';

export function usePattern() {
  const [pattern, setPattern] = useState(null);
  const lastGridRef = useRef(null);
  const [isStale, setIsStale] = useState(false);

  const generate = useCallback((grid, palette) => {
    const result = generatePattern(grid, palette);
    setPattern(result);
    lastGridRef.current = grid.cells;
    setIsStale(false);
    return result;
  }, []);

  const markStale = useCallback((grid) => {
    if (lastGridRef.current && lastGridRef.current !== grid.cells) {
      setIsStale(true);
    }
  }, []);

  return { pattern, generate, isStale, markStale };
}
