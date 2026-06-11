import React, { memo } from 'react';

const GridCell = memo(function GridCell({ colorHex, onPointerDown, onPointerEnter }) {
  return (
    <div
      className="grid-cell"
      style={{ background: colorHex || '#ffffff' }}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
    />
  );
});

export default GridCell;
