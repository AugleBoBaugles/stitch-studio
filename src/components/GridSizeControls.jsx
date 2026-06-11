import React, { useState } from 'react';
import Button from './Button.jsx';
import './GridSizeControls.css';

export default function GridSizeControls({ rows, cols, onResize }) {
  const [newRows, setNewRows] = useState(rows);
  const [newCols, setNewCols] = useState(cols);

  function handleApply() {
    const r = Math.min(100, Math.max(4, Number(newRows)));
    const c = Math.min(100, Math.max(4, Number(newCols)));
    if (r === rows && c === cols) return;
    if (window.confirm(`Resize to ${c}×${r}? This will clear the current drawing.`)) {
      onResize(r, c);
      setNewRows(r);
      setNewCols(c);
    }
  }

  return (
    <div className="grid-size-controls">
      <span className="size-label">Grid size</span>
      <input
        type="number"
        min={4}
        max={100}
        value={newCols}
        onChange={e => setNewCols(e.target.value)}
        aria-label="Columns"
        title="Columns"
      />
      <span className="size-x">×</span>
      <input
        type="number"
        min={4}
        max={100}
        value={newRows}
        onChange={e => setNewRows(e.target.value)}
        aria-label="Rows"
        title="Rows"
      />
      <Button variant="secondary" onClick={handleApply}>Apply</Button>
    </div>
  );
}
