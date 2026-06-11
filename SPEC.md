# Stitch Studio — Project Spec

*Pixel to Pattern, remade*

## What is it?

Stitch Studio is a pixel art tool that converts drawn pixel art into crochet patterns, where each pixel is a single crochet stitch. It's built for both pixel artists and crocheters who want to create, share, and use patterns.

A generated pattern looks like this:

```
(sc = single crochet)

Row 1: 28 sc (white)
Row 2: 9 sc (white), 10 sc (yellow), 9 sc (white)
Row 3: 8 sc (white), 10 sc (yellow), 9 sc (white)
```

## How it works

1. The user draws on a grid by changing the color of individual cells.
2. Each color in the palette can be labeled before generating a pattern.
3. The user clicks **Generate Pattern** and a crochet pattern appears next to the grid — each row of the grid becomes a row of the pattern, and each cell is one single crochet.
4. The user can continue editing and regenerating until satisfied.
5. When ready, the user can post the art to the site or export the pattern as a PDF.

### Posting

When a user posts their art, they can add:
- **Name** — defaults to `Untitled`
- **Description** — defaults to `No Description`
- **Artist name** — defaults to `Anonymous`

Posted art and patterns are publicly visible on the **Posts** page.

### Exporting

Patterns can be exported as PDFs from:
- The **Create** page
- Any post on the **Posts** page

## Stack

- **Framework:** React
- **Deployment:** GitHub Pages (frontend only)
- **Persistence:** Pixel art and patterns are saved to files within the project
- **Testing:** End-to-end tests covering posting a pattern and viewing it on the Posts page, and PDF export from both pages
