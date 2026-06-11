import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGrid } from '../hooks/useGrid.js';
import { usePalette } from '../hooks/usePalette.js';
import { usePattern } from '../hooks/usePattern.js';
import ColorPalette from '../components/ColorPalette.jsx';
import GridSizeControls from '../components/GridSizeControls.jsx';
import PixelGrid from '../components/PixelGrid.jsx';
import PatternDisplay from '../components/PatternDisplay.jsx';
import PublishModal from '../components/PublishModal.jsx';
import Button from '../components/Button.jsx';
import { exportCurrentToPDF } from '../lib/pdfExport.js';
import './CreatePage.css';

export default function CreatePage({ onPublish }) {
  const { grid, setCell, clearGrid, fillAll, resizeGrid } = useGrid();
  const { colors, activeColorId, setActiveColorId, addColor, updateColor, removeColor } = usePalette();
  const { pattern, generate, isStale, markStale } = usePattern();
  const [publishOpen, setPublishOpen] = React.useState(false);

  const prevCellsRef = useRef(grid.cells);
  useEffect(() => {
    if (grid.cells !== prevCellsRef.current) {
      prevCellsRef.current = grid.cells;
      markStale(grid);
    }
  }, [grid, markStale]);

  function handleGenerate() {
    generate(grid, colors);
  }

  function handlePublish(meta) {
    if (!pattern) {
      alert('Generate a pattern first before posting.');
      return;
    }
    const post = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      meta,
      grid,
      palette: colors,
      pattern,
    };
    onPublish(post);
  }

  function handleExportPDF() {
    if (!pattern) {
      alert('Generate a pattern first before exporting.');
      return;
    }
    exportCurrentToPDF(grid, colors, pattern, {
      name: 'Untitled',
      description: 'No Description',
      artist: 'Anonymous',
    });
  }

  return (
    <div className="create-page">
      <aside className="create-sidebar">
        <ColorPalette
          colors={colors}
          activeColorId={activeColorId}
          onSelectColor={setActiveColorId}
          onUpdateColor={updateColor}
          onAddColor={() => addColor()}
          onRemoveColor={removeColor}
        />
        <div className="sidebar-divider" />
        <GridSizeControls
          rows={grid.rows}
          cols={grid.cols}
          onResize={resizeGrid}
        />
        <Button variant="secondary" onClick={clearGrid}>Clear grid</Button>
        <Button
          variant="secondary"
          onClick={() => activeColorId && fillAll(activeColorId)}
          disabled={!activeColorId}
          title={!activeColorId ? 'Select a color first' : 'Fill entire canvas with selected color'}
        >
          Fill canvas
        </Button>
      </aside>

      <section className="create-canvas">
        <PixelGrid
          grid={grid}
          palette={colors}
          activeColorId={activeColorId}
          onCellChange={setCell}
        />
      </section>

      <aside className="create-pattern">
        <div className="pattern-actions">
          <Button onClick={handleGenerate}>Generate Pattern</Button>
          <Button
            variant="secondary"
            onClick={() => setPublishOpen(true)}
            disabled={!pattern}
            title={!pattern ? 'Generate a pattern first' : ''}
          >
            Post pattern
          </Button>
          <Button
            variant="secondary"
            onClick={handleExportPDF}
            disabled={!pattern}
            title={!pattern ? 'Generate a pattern first' : ''}
          >
            Export PDF
          </Button>
        </div>
        <PatternDisplay pattern={pattern} isStale={isStale} />
      </aside>

      {publishOpen && (
        <PublishModal
          onConfirm={handlePublish}
          onClose={() => setPublishOpen(false)}
        />
      )}
    </div>
  );
}
