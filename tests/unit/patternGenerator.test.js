import { describe, it, expect } from 'vitest';
import { generatePattern, formatPatternRow } from '../../src/lib/patternGenerator.js';

const WHITE = { id: 'w', hex: '#ffffff', label: 'white' };
const BLACK = { id: 'b', hex: '#000000', label: 'black' };
const RED   = { id: 'r', hex: '#ff0000', label: 'red' };

function makeGrid(rows, cols, cells) {
  return { rows, cols, cells };
}

describe('generatePattern', () => {
  it('produces one segment per solid-color row', () => {
    const grid = makeGrid(3, 3, [
      'w','w','w',
      'w','w','w',
      'w','w','w',
    ]);
    const pattern = generatePattern(grid, [WHITE]);
    expect(pattern.rows).toHaveLength(3);
    pattern.rows.forEach(row => {
      expect(row.segments).toHaveLength(1);
      expect(row.segments[0].count).toBe(3);
      expect(row.segments[0].label).toBe('white');
    });
  });

  it('run-length encodes a multi-color row correctly', () => {
    // 2 white, 3 black, 1 white — bottom visual row = pattern row 1
    const grid = makeGrid(1, 6, ['w','w','b','b','b','w']);
    const pattern = generatePattern(grid, [WHITE, BLACK]);
    const row = pattern.rows[0];
    expect(row.rowNumber).toBe(1);
    expect(row.segments).toHaveLength(3);
    expect(row.segments[0]).toMatchObject({ count: 2, label: 'white' });
    expect(row.segments[1]).toMatchObject({ count: 3, label: 'black' });
    expect(row.segments[2]).toMatchObject({ count: 1, label: 'white' });
  });

  it('labels null cells as "white"', () => {
    const grid = makeGrid(1, 3, [null, null, null]);
    const pattern = generatePattern(grid, []);
    expect(pattern.rows[0].segments[0].label).toBe('white');
    expect(pattern.rows[0].segments[0].hex).toBe('#ffffff');
  });

  it('orders rows bottom-to-top (last visual row = pattern row 1)', () => {
    // top visual row is all white, bottom is all black
    const grid = makeGrid(2, 2, [
      'w','w',  // visual row 0 (top) → pattern row 2
      'b','b',  // visual row 1 (bottom) → pattern row 1
    ]);
    const pattern = generatePattern(grid, [WHITE, BLACK]);
    expect(pattern.rows[0].rowNumber).toBe(1);
    expect(pattern.rows[0].segments[0].label).toBe('black');
    expect(pattern.rows[1].rowNumber).toBe(2);
    expect(pattern.rows[1].segments[0].label).toBe('white');
  });

  it('totalStitches always equals cols', () => {
    const grid = makeGrid(4, 7, Array(4 * 7).fill('w'));
    const pattern = generatePattern(grid, [WHITE]);
    pattern.rows.forEach(row => {
      expect(row.totalStitches).toBe(7);
    });
  });

  it('uses the palette label at generation time', () => {
    const color = { id: 'c1', hex: '#aabbcc', label: 'sky blue' };
    const grid = makeGrid(1, 2, ['c1', 'c1']);
    const pattern = generatePattern(grid, [color]);
    expect(pattern.rows[0].segments[0].label).toBe('sky blue');
  });

  it('falls back gracefully for a color id not in palette', () => {
    const grid = makeGrid(1, 1, ['missing-id']);
    const pattern = generatePattern(grid, []);
    expect(pattern.rows[0].segments[0].label).toBe('unknown');
  });
});

describe('formatPatternRow', () => {
  it('formats a row as the expected string', () => {
    const row = {
      rowNumber: 2,
      totalStitches: 10,
      segments: [
        { count: 5, label: 'white', hex: '#fff' },
        { count: 5, label: 'black', hex: '#000' },
      ],
    };
    expect(formatPatternRow(row)).toBe(
      'Row 2 (10 sts): 5 sc (white), 5 sc (black)'
    );
  });
});
