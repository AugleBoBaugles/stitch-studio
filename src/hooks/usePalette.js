import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

function makeDefaultPalette() {
  return [
    { id: uuidv4(), hex: '#ffffff', label: 'white' },
    { id: uuidv4(), hex: '#000000', label: 'black' },
    { id: uuidv4(), hex: '#ef4444', label: 'red' },
    { id: uuidv4(), hex: '#fde047', label: 'yellow' },
    { id: uuidv4(), hex: '#3b82f6', label: 'blue' },
    { id: uuidv4(), hex: '#22c55e', label: 'green' },
  ];
}

export function usePalette() {
  const [colors, setColors] = useState(() => makeDefaultPalette());
  const [activeColorId, setActiveColorId] = useState(null);

  const addColor = useCallback((hex = '#cccccc', label = 'new color') => {
    const newColor = { id: uuidv4(), hex, label };
    setColors(prev => [...prev, newColor]);
    setActiveColorId(newColor.id);
    return newColor.id;
  }, []);

  const updateColor = useCallback((id, patch) => {
    setColors(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
  }, []);

  const removeColor = useCallback((id) => {
    setColors(prev => prev.filter(c => c.id !== id));
    setActiveColorId(prev => (prev === id ? null : prev));
  }, []);

  return { colors, activeColorId, setActiveColorId, addColor, updateColor, removeColor };
}
