# Grid &amp; Letters

A typographic exploration of the two foundations of visual design:  
**the grid** (structure, space, proportion) and **the letter** (form, rhythm, voice).

Built as a scroll-driven, interactive web experience.

---

## Chapters

| # | Chapter | What it does |
|---|---|---|
| 0 | **Manifesto** | Full-bleed hero, word-by-word GSAP stagger reveal |
| 1 | **Anatomy** | 7 massive letterforms with gradient-highlighted anatomical zones (ascender, x-height, descender, serif, bowl, counter, terminal) |
| 2 | **History** | Pinned horizontal timeline — 2,000 years of type scrolls sideways across 6 eras. Grid tightens from manuscript to digital |
| 3 | **The Grid** | Interactive grid pattern switcher — same content rearranged across Manuscript, Column, Modular, and Hierarchical layouts |
| 4 | **Grid × Type** | Drag a type scale slider (1.067–1.618) to recalculate all `--text-N` CSS properties in real time. 3-column measure comparison |
| 5 | **Breaking Rules** | 5 deliberate typographic transgressions — Bleed, Overlap, Asymmetry, Scale Jump, Out of Bounds — each annotated |
| 6 | **Resources** | Foundries, books, tools, and inspiration. Click `[End]` to smooth-scroll back to top |

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **GSAP** (ScrollTrigger, `containerAnimation`)
- **Lenis** (smooth scroll, GSAP ticker integration)
- **Inter Variable**, EB Garamond, Poppins, JetBrains Mono, Cinzel, UnifrakturMaguntia, Bodoni Moda (Google Fonts)

## Development

```bash
npm run dev      # start dev server
npm run build    # typecheck + production build → dist/
npm run preview  # preview production build
```

## Responsive

- Desktop: 12-column grid, horizontal history scroll, alternating anatomy layout
- Mobile (≤768px): single-column stack, vertical history with peak-at-center highlighting, floating `[#]` grid toggle

## Deployment

Build output goes to `dist/`. Deploy via:

- **Cloudflare Pages** — connect Git repo or drag `dist/` into the dashboard
- **Netlify** / **Vercel** — zero-config Git-based deploy

---

Built with [Claude Code](https://claude.ai/code).
