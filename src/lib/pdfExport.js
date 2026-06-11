import { jsPDF } from 'jspdf';
import { gridToImageData } from './gridToImageData.js';
import { formatPatternRow } from './patternGenerator.js';

function slugify(text) {
  return (text || 'pattern')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function buildPDF(meta, grid, palette, pattern) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(meta.name, margin, y);
  y += 9;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'italic');
  pdf.text(`by ${meta.artist}`, margin, y);
  y += 7;

  if (meta.description && meta.description !== 'No Description') {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descLines = pdf.splitTextToSize(meta.description, contentWidth);
    pdf.text(descLines, margin, y);
    y += descLines.length * 5 + 3;
  }

  y += 3;

  // Grid image (left side, max 80mm wide)
  const imgDataUrl = gridToImageData(grid, palette, 560);
  const imgMaxW = 80;
  const aspectRatio = grid.rows / grid.cols;
  const imgW = imgMaxW;
  const imgH = imgMaxW * aspectRatio;
  pdf.addImage(imgDataUrl, 'PNG', margin, y, imgW, imgH);

  // Pattern text (right of image)
  const textX = margin + imgW + 8;
  const textWidth = contentWidth - imgW - 8;
  pdf.setFontSize(8);
  pdf.setFont('courier', 'normal');
  let textY = y;

  for (const row of pattern.rows) {
    const line = formatPatternRow(row);
    const lines = pdf.splitTextToSize(line, textWidth);
    if (textY + lines.length * 4 > pageHeight - margin) {
      pdf.addPage();
      textY = margin;
    }
    pdf.text(lines, textX, textY);
    textY += lines.length * 4.5;
  }

  // If pattern overflows the image area on first page, continue below image
  const bottomOfImage = y + imgH + 5;
  if (textY < bottomOfImage) {
    textY = bottomOfImage;
  }

  return pdf;
}

export async function exportPostToPDF(post) {
  const pdf = await buildPDF(post.meta, post.grid, post.palette, post.pattern);
  pdf.save(`${slugify(post.meta.name)}-pattern.pdf`);
}

export async function exportCurrentToPDF(grid, palette, pattern, meta) {
  const pdf = await buildPDF(meta, grid, palette, pattern);
  pdf.save(`${slugify(meta.name)}-pattern.pdf`);
}
