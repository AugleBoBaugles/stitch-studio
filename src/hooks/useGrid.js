import { useState, useCallback } from 'react';

const DEFAULT_ROWS = 28;
const DEFAULT_COLS = 28;

function makeEmptyCells(rows, cols) {
  return Array(rows * cols).fill(null);
}

export function useGrid() {
  const [grid, setGrid] = useState({
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    cells: makeEmptyCells(DEFAULT_ROWS, DEFAULT_COLS),
  });

  const setCell = useCallback((index, colorId) => {
    setGrid(prev => {
      const cells = [...prev.cells];
      cells[index] = colorId;
      return { ...prev, cells };
    });
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(prev => ({
      ...prev,
      cells: makeEmptyCells(prev.rows, prev.cols),
    }));
  }, []);

  const resizeGrid = useCallback((rows, cols) => {
    setGrid({ rows, cols, cells: makeEmptyCells(rows, cols) });
  }, []);

  return { grid, setCell, clearGrid, resizeGrid };
}
