import React, { useEffect, useRef } from 'react';
import { gridToImageData } from '../lib/gridToImageData.js';

export default function PostThumbnail({ grid, palette, size = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = gridToImageData(grid, palette, size * 2);
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = dataUrl;
  }, [grid, palette, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', borderRadius: 4, border: '1px solid #e5e5e5' }}
      aria-label="Pixel art thumbnail"
    />
  );
}
