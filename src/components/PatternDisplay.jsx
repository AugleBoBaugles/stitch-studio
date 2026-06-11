import React from 'react';
import { formatPatternRow } from '../lib/patternGenerator.js';
import './PatternDisplay.css';

export default function PatternDisplay({ pattern, isStale }) {
  if (!pattern) {
    return (
      <div className="pattern-display pattern-empty">
        <p>Click <strong>Generate Pattern</strong> to see your crochet pattern here.</p>
      </div>
    );
  }

  return (
    <div className="pattern-display">
      {isStale && (
        <p className="pattern-stale-warning">⚠ Grid changed — regenerate to update pattern.</p>
      )}
      <pre className="pattern-text">
        {pattern.rows.map(row => (
          <span key={row.rowNumber} className="pattern-row">
            <span className="pattern-row-dots">
              {row.segments.map((seg, i) => (
                <span
                  key={i}
                  className="pattern-dot"
                  style={{ background: seg.hex }}
                  title={seg.label}
                />
              ))}
            </span>
            {formatPatternRow(row)}{'\n'}
          </span>
        ))}
      </pre>
    </div>
  );
}
