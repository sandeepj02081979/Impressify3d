# Maintaining Impressify3D content

Everything lives in two files. No code editing required.

## Add or edit a product
Edit `data/products.json` — copy an existing block, paste at the end, change the fields:

- `id` — unique slug, lowercase-hyphen (e.g. `mandir-02`). Used to find the image/model.
- `title`, `gallery_desc`, `wallpaper_desc` — the copy.
- `categories` — pick from `spiritual`, `heritage`, `architecture`, `decor`, `custom`.
- `materials` — pick from `PLA+`, `PETG`, `Resin`, `Nylon`, `ABS`, `Wood PLA`.
- `price_tier` — `₹` (under ₹500), `₹₹` (₹500–2000), `₹₹₹` (above ₹2000).
- `featured` — `true` shows it large on the gallery.
- `sort_order` — lower = appears first.
- `has_model` — `true` if you're adding a `.glb` for the 3D viewer.

## Add the image
Save a photo as `assets/images/<id>.jpg` — same id as in the JSON. 1200px wide, under 300KB, JPEG or WebP.

## Add a 3D model (optional)
Save the file as `assets/models/<id>.glb`, and set `has_model: true` in the JSON.

## Site-wide settings
Edit `data/site.json` for WhatsApp number, quote form link, email, and social links.

## What changed from before
- `data.js` and `datamodel.js` are merged into one `data.js` that just loads the JSON — delete `datamodel.js`.
- Google Drive image links are replaced with files committed to the repo (faster, never break).
- Unused Google Sheets sync code was removed to keep things simple; ask if you'd rather edit from a spreadsheet instead of JSON.
