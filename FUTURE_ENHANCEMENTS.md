# Future Enhancements — Impressify3D

Running list so nothing discussed in chat gets lost. Not in priority order except where noted.

## High priority
- **Product detail page** — cards currently jump straight to WhatsApp; buyers need a page to build desire first (bigger photos, full description, related products).
- **Real product photography** — current images are placeholder-quality; single biggest conversion lever.
- **Real customer testimonials** — replace fabricated quotes with real customer photos/quotes.
- **More `.glb` 3D models** — only `mandir-01` has one; 2-3 more would make the 3D Viewer feel finished.

## Site / UX
- Extend `RoomShowcase.html` with more room scenes (bedroom, pooja room, office) — same clickable-hotspot pattern, more products get the interactive treatment.
- "Related products" strip (use existing `categories` field) once the detail page exists.
- Menu rename/reorder — edit the `<li>` list inside `initGlobalNavigation()` in `data.js` (shared across all pages).

## Growth / marketing
- Basic SEO: per-page titles/meta descriptions, `sitemap.xml`, Open Graph tags (so WhatsApp/social link previews look right).
- Analytics (Google Analytics or Plausible) to see which products get clicked.

## Blender / 3D pipeline (tracked in a separate chat)
- One template `.blend` file: fixed studio lighting + camera framing, reused per product for consistent renders.
- Export `.glb` with Draco compression to keep ModelViewer files small/fast.
- Decimate modifier before export on high-poly models.
- Batch turntable render setup (static photo + rotating GIF/video from one pass).
- Texture atlas per model to cut draw calls.

## Data / maintenance (done, reference only)
- Product content now lives in `data/products.csv` + `data/site.csv` (edit directly on GitHub's CSV grid view) — no more JSON editing.
- `data/products.json` + `data/site.json` kept only as an automatic fallback if a CSV ever breaks — don't need to stay in sync.
