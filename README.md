# Stitch Studio

A pixel art studio that generates crochet patterns from your drawings. Draw pixel art on a grid, label your colors, and export a ready-to-use crochet pattern. Share your work publicly or save it as a PDF.

See the full [project spec](SPEC.md) for design goals and technical decisions.

## Using the app

### Create a pattern

1. Open the **Create** page.
2. Draw on the grid by clicking cells and selecting colors from the palette.
3. Label each color in the palette so your pattern is easy to follow (e.g. "white", "navy").
4. Click **Generate Pattern** — the crochet pattern appears to the right of the grid. Each grid row becomes a pattern row, and each cell is one single crochet (sc).
5. Keep editing and regenerating until you're happy with the result.

### Export as PDF

Click **Export PDF** on the Create page to download the pattern as a PDF.

### Post your art

Click **Post** to share your pixel art and pattern (currently not public). You'll be prompted to add:
- **Name** — what to call the pattern (defaults to `Untitled`)
- **Description** — optional notes about the pattern (defaults to `No Description`)
- **Artist name** — your name or handle (defaults to `Anonymous`)

### Browse posts

Open the **Posts** page to see all published patterns. Click any post to view the full pattern and export it as a PDF.

## Running locally

```bash
npm install
npm run dev
```

## Running tests

```bash
npm test
```
