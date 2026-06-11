/**
 * Converts a grid + palette into a crochet pattern.
 * Rows are ordered bottom-to-top (row 1 = bottom visual row, matching crochet convention).
 * @param {object} grid - { rows, cols, cells: (string|null)[] }
 * @param {object[]} palette - [{ id, hex, label }]
 * @returns {{ rows: object[] }} - crochet pattern
 */
export function generatePattern(grid, palette) {
  const colorMap = new Map(palette.map(c => [c.id, c]));

  const patternRows = [];

  for (let v = grid.rows - 1; v >= 0; v--) {
    const rowNumber = grid.rows - v;
    const rowCells = grid.cells.slice(v * grid.cols, (v + 1) * grid.cols);

    const segments = [];
    let current = rowCells[0];
    let count = 1;

    for (let i = 1; i < rowCells.length; i++) {
      if (rowCells[i] === current) {
        count++;
      } else {
        segments.push(makeSegment(current, count, colorMap));
        current = rowCells[i];
        count = 1;
      }
    }
    segments.push(makeSegment(current, count, colorMap));

    patternRows.push({
      rowNumber,
      segments,
      totalStitches: grid.cols,
    });
  }

  return { rows: patternRows };
}

function makeSegment(colorId, count, colorMap) {
  if (colorId === null) {
    return { count, label: 'white', hex: '#ffffff' };
  }
  const color = colorMap.get(colorId);
  if (!color) {
    return { count, label: 'unknown', hex: '#cccccc' };
  }
  return { count, label: color.label || color.hex, hex: color.hex };
}

/**
 * Formats a pattern row as a human-readable string.
 * e.g. "Row 2 (28 sts): 9 sc (white), 10 sc (yellow), 9 sc (white)"
 */
export function formatPatternRow(row) {
  const segs = row.segments.map(s => `${s.count} sc (${s.label})`).join(', ');
  return `Row ${row.rowNumber} (${row.totalStitches} sts): ${segs}`;
}
