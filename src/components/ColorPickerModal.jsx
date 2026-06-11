import React, { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import './ColorPickerModal.css';

export default function ColorPickerModal({ initialHex, onConfirm, onClose }) {
  const [hex, setHex] = useState(initialHex);

  function handleTextChange(e) {
    const val = e.target.value;
    setHex(val);
  }

  function handleConfirm() {
    const clean = hex.startsWith('#') ? hex : `#${hex}`;
    onConfirm(clean);
    onClose();
  }

  return (
    <Modal title="Pick a color" onClose={onClose}>
      <div className="color-picker-inner">
        <input
          type="color"
          value={hex.length === 7 ? hex : '#cccccc'}
          onChange={e => setHex(e.target.value)}
          className="color-picker-swatch-input"
        />
        <input
          type="text"
          value={hex}
          onChange={handleTextChange}
          placeholder="#rrggbb"
          maxLength={7}
          className="color-picker-hex-input"
          aria-label="Hex color value"
        />
        <div className="color-picker-actions">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Use this color</Button>
        </div>
      </div>
    </Modal>
  );
}
