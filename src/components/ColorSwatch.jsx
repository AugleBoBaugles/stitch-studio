import React, { useState } from 'react';
import ColorPickerModal from './ColorPickerModal.jsx';
import './ColorSwatch.css';

export default function ColorSwatch({ color, isActive, onSelect, onLabelChange, onColorChange, onRemove }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className={`color-swatch ${isActive ? 'active' : ''}`}>
      <button
        className="swatch-circle"
        style={{ background: color.hex }}
        onClick={onSelect}
        title={`Select ${color.label}`}
        aria-label={`Select color ${color.label}`}
      />
      <input
        className="swatch-label"
        type="text"
        value={color.label}
        onChange={e => onLabelChange(e.target.value)}
        placeholder="color name"
        aria-label="Color label"
      />
      <button
        className="swatch-edit"
        onClick={() => setPickerOpen(true)}
        title="Change color"
        aria-label="Edit color"
      >
        ✎
      </button>
      <button
        className="swatch-remove"
        onClick={onRemove}
        title="Remove color"
        aria-label="Remove color"
      >
        ✕
      </button>
      {pickerOpen && (
        <ColorPickerModal
          initialHex={color.hex}
          onConfirm={onColorChange}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
