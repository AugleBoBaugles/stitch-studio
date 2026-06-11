/**
 * Renders grid data to a PNG data URL using an offscreen canvas.
 * @param {object} grid - { rows, cols, cells }
 * @param {object[]} palette - [{ id, hex }]
 * @param {number} outputSize - pixel dimension of the square output image
 * @returns {string} PNG data URL
 */
export function gridToImageData(grid, palette, outputSize = 400) {
  const colorMap = new Map(palette.map(c => [c.id, c.hex]));
  const cellSize = Math.max(1, Math.floor(outputSize / Math.max(grid.rows, grid.cols)));
  const width = cellSize * grid.cols;
  const height = cellSize * grid.rows;

  let canvas;
  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const idx = row * grid.cols + col;
      const colorId = grid.cells[idx];
      if (colorId !== null) {
        ctx.fillStyle = colorMap.get(colorId) || '#cccccc';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  if (canvas instanceof OffscreenCanvas) {
    // OffscreenCanvas doesn't have toDataURL; convert synchronously via ImageData
    const imgData = ctx.getImageData(0, 0, width, height);
    const fallback = document.createElement('canvas');
    fallback.width = width;
    fallback.height = height;
    fallback.getContext('2d').putImageData(imgData, 0, 0);
    return fallback.toDataURL('image/png');
  }

  return canvas.toDataURL('image/png');
}
