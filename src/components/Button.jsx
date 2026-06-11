import React from 'react';
import './Button.css';

export default function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button', title }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
