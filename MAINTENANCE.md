# Maintaining Impressify3D content

Content lives in two CSV files in the repo — `data/products.csv` and `data/site.csv`. No JSON editing, no external service. Images and 3D models still live on GitHub.

## How to edit
On GitHub, open `data/products.csv` (or `data/site.csv`) → click the pencil (Edit) icon → GitHub renders it as a simple spreadsheet grid you can edit cell-by-cell → commit. Changes go live immediately (same-origin file, no cache delay, no extra network hop).

## Add or edit a product
Edit a row in **`data/products.csv`**:

- `id` — unique slug, lowercase-hyphen (e.g. `mandir-02`). Used to find the image/model.
- `title`, `gallery_desc`, `wallpaper_desc` — the copy.
- `categories` — comma-separated, pick from `spiritual`, `heritage`, `architecture`, `decor`, `custom`.
- `materials` — comma-separated, pick from `PLA+`, `PETG`, `Resin`, `Nylon`, `ABS`, `Wood PLA`.
- `price_tier` — `₹` (under ₹500), `₹₹` (₹500–2000), `₹₹₹` (above ₹2000).
- `featured` — `TRUE` shows it large on the gallery.
- `sort_order` — lower number = appears first.
- `has_model` — `TRUE` if you've added a `.glb` for the 3D viewer.
- `is_new` — `TRUE` forces the "New" badge regardless of `added_date`.

## Add the image
Save a photo as `assets/images/<id>.jpg` on GitHub — same id as the Sheet row. 1200px wide, under 300KB, JPEG or WebP.

## Add a 3D model (optional)
Save the file as `assets/models/<id>.glb` on GitHub, and set `has_model` to `TRUE` in the Sheet row.

## Site-wide settings
Edit **`data/site.csv`** — WhatsApp number, quote form link, email, social links, valid categories/materials.

## If a CSV is ever broken
The site automatically falls back to `data/products.json` + `data/site.json` so it never goes blank. Those files aren't the live source anymore — just a safety net. You don't need to keep them in sync.
