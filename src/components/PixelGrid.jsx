import React, { useRef, useCallback } from 'react';
import GridCell from './GridCell.jsx';
import './PixelGrid.css';

export default function PixelGrid({ grid, palette, activeColorId, onCellChange }) {
  const isDrawing = useRef(false);
  const colorMap = new Map(palette.map(c => [c.id, c.hex]));

  const handlePointerDown = useCallback((index) => {
    isDrawing.current = true;
    onCellChange(index, activeColorId);
  }, [activeColorId, onCellChange]);

  const handlePointerEnter = useCallback((index) => {
    if (isDrawing.current) {
      onCellChange(index, activeColorId);
    }
  }, [activeColorId, onCellChange]);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  return (
    <div
      className="pixel-grid-wrapper"
      onPointerUp={stopDrawing}
      onPointerLeave={stopDrawing}
    >
      <div
        className="pixel-grid"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
      >
        {grid.cells.map((colorId, index) => (
          <GridCell
            key={index}
            colorHex={colorId ? colorMap.get(colorId) : null}
            onPointerDown={() => handlePointerDown(index)}
            onPointerEnter={() => handlePointerEnter(index)}
          />
        ))}
      </div>
    </div>
  );
}
