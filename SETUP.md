# Impressify3D — Dynamic Content System
## Setup Guide

---

## Files in this folder

```
impressify3d/
├── data.js            ← THE ONLY FILE YOU EDIT for content/images
├── ProductGallery.html
├── Wallpapers.html
└── SETUP.md           ← this file
```

---

## How it works

`data.js` is your single source of truth. Both pages (`ProductGallery.html` and
`Wallpapers.html`) load it and render themselves from the same data — same images,
but different titles, descriptions, and layouts per page.

You can manage content in **two ways**:

---

## Option A — Edit data.js directly (simplest)

Open `data.js` and find the `FALLBACK_ITEMS` array. Each object is one product/piece.

Add a new item by copying this template:

```js
{
  id: 'your-item-slug',            // unique, no spaces (used internally)
  title: 'Your Piece Title',
  category: 'spiritual',           // or 'heritage,architecture' (comma-separated)
  tag_label: 'Spiritual',          // shown as the blue label on cards
  image_drive_id: 'ABC123XYZ',     // Google Drive file ID (see below)
  gallery_desc: 'Description shown on the Product Gallery page.',
  wallpaper_desc: 'Description shown on the Wallpapers page.',
  featured: false,                 // true = large hero card; max 2 featured items
  wallpaper_res: '4K · 3840×2160',
  wallpaper_tags: 'Heritage,Detailed', // comma-separated style tags on wallpaper cards
  wallpaper_url: '',               // optional: Cloudinary/CDN URL for wallpaper download
                                   // if blank, uses Drive thumbnail automatically
},
```

Commit & push — done.

---

## Option B — Use Google Sheets as a CMS (live updates, no code edits)

This lets you (or anyone) update content from a spreadsheet without touching code.

### Step 1 — Set up your Google Sheet

Create a new Google Sheet with these exact column headers in Row 1:

| A  | B     | C        | D         | E               | F            | G              | H        | I             | J             | K             |
|----|-------|----------|-----------|-----------------|--------------|----------------|----------|---------------|---------------|---------------|
| id | title | category | tag_label | image_drive_id  | gallery_desc | wallpaper_desc | featured | wallpaper_res | wallpaper_tags | wallpaper_url |

Fill in your items from Row 2 onward. You can copy the data from `FALLBACK_ITEMS`
in `data.js` as a starting point.

### Step 2 — Publish the sheet

1. Go to **File → Share → Publish to web**
2. Choose **Sheet1** and **CSV** format
3. Click **Publish** and confirm
4. The URL will look like:
   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?...`
5. Copy the long ID between `/d/` and `/pub` — that's your `SHEET_ID`

### Step 3 — Connect it to your pages

Open `data.js` and update these two lines near the top:

```js
const SHEET_ID = 'paste-your-sheet-id-here';
const USE_SHEET = true;
```

Commit & push. Your pages now fetch live from the sheet on every load.
Updates to the sheet go live within seconds — no deploys needed.

---

## How to get a Google Drive image ID

1. Upload your image to Google Drive
2. Right-click → **Share** → set to "Anyone with the link can view"
3. Copy the link: `https://drive.google.com/file/d/ABC123XYZ/view`
4. The ID is the part between `/d/` and `/view` → `ABC123XYZ`
5. Paste that into `image_drive_id`

The pages automatically generate thumbnail URLs at the right sizes:
- Gallery cards: `800px` wide
- Featured hero: `1200px` wide
- Wallpaper full-res: `3840px` wide (or uses `wallpaper_url` if provided)

---

## Deploying to GitHub Pages

1. Push all files to a GitHub repo (e.g. `impressify3d/`)
2. Go to **Settings → Pages → Source → main branch / root folder**
3. Your pages will be live at `https://yourusername.github.io/impressify3d/`

If hosting at the root, the `<script src="data.js">` references work as-is.

---

## Adding a new piece — checklist

- [ ] Upload image to Google Drive, get the file ID
- [ ] Set sharing to "Anyone with the link"
- [ ] Add a row to your Google Sheet (or add to `FALLBACK_ITEMS` in data.js)
- [ ] Fill: `id`, `title`, `category`, `tag_label`, `image_drive_id`, `gallery_desc`, `wallpaper_desc`
- [ ] Optionally: upload a hi-res version to Cloudinary/CDN and paste the URL in `wallpaper_url`
- [ ] Refresh the page — the new piece appears on both Gallery and Wallpapers automatically

---

## Category values (used for filter buttons)

Current categories — add new ones freely, filter buttons generate automatically:

| Value          | Shown as          |
|----------------|-------------------|
| `spiritual`    | Spiritual         |
| `heritage`     | Heritage          |
| `architecture` | Architecture      |
| `decor`        | Decor             |

---

## Wallpaper image sources

The Wallpapers page supports two image sources per item:

| Field           | Used for                                      |
|-----------------|-----------------------------------------------|
| `image_drive_id`| Gallery card thumbnails + wallpaper fallback  |
| `wallpaper_url` | Cloudinary/CDN URL for full-res download link |

If `wallpaper_url` is filled in, the Wallpapers page uses it for preview and download.
If it's blank, Drive thumbnails are used for both. Your current Cloudinary URLs
(`res.cloudinary.com/dfornki2u/...`) go in `wallpaper_url`.
