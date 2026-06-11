import React from 'react';
import ColorSwatch from './ColorSwatch.jsx';
import Button from './Button.jsx';
import './ColorPalette.css';

export default function ColorPalette({ colors, activeColorId, onSelectColor, onUpdateColor, onAddColor, onRemoveColor }) {
  return (
    <div className="color-palette">
      <div className="palette-header">
        <h3 className="palette-title">Colors</h3>
        <Button variant="ghost" onClick={onAddColor} title="Add a new color">+ Add</Button>
      </div>
      <div className="palette-list">
        {colors.map(color => (
          <ColorSwatch
            key={color.id}
            color={color}
            isActive={color.id === activeColorId}
            onSelect={() => onSelectColor(color.id)}
            onLabelChange={label => onUpdateColor(color.id, { label })}
            onColorChange={hex => onUpdateColor(color.id, { hex })}
            onRemove={() => onRemoveColor(color.id)}
          />
        ))}
      </div>
      {activeColorId && (
        <p className="palette-hint">
          Active: <strong>{colors.find(c => c.id === activeColorId)?.label || '—'}</strong>
        </p>
      )}
      {!activeColorId && (
        <p className="palette-hint">Click a color circle to select it</p>
      )}
    </div>
  );
}
