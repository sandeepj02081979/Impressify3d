# ✅ How to Add a New Product to Impressify3D

**Time needed:** ~2 minutes  
**File to edit:** `data.js` only — all three pages update automatically.

---

## Step 1 — Get your Google Drive image ID

1. Upload your image to Google Drive
2. Right-click the file → **Share** → set to "Anyone with the link"
3. Copy the share link. It looks like:  
   `https://drive.google.com/file/d/`**`1yD0Gfm_zYe1nFTgD9WetmmljOkqDy4SD`**`/view`
4. The bold part is your `image_drive_id`

---

## Step 2 — Copy the template into `data.js`

Open `data.js` and find the `FALLBACK_ITEMS` array.  
Add a new entry **at the top** (or set `sort_order` to control position).

```js
{
  id:             'my-product-01',          // unique, lowercase, hyphens only
  title:          'My Product Title',
  is_new:         true,                     // shows "New" badge for 60 days
  sort_order:     1,                        // 1 = first, 99 = last
  featured:       false,                    // true = gets large hero layout

  image_drive_id: 'PASTE_YOUR_ID_HERE',    // from Step 1

  categories:     ['spiritual'],            // pick from: spiritual, heritage, architecture, decor, custom
  tag_label:      'Spiritual',              // short label on card
  materials:      ['PLA+'],                 // pick from: PLA+, PETG, Resin, Nylon, ABS, Wood PLA
  price_tier:     '₹₹',                    // ₹ / ₹₹ / ₹₹₹

  gallery_desc:   'One or two sentences about the product for the gallery page.',
  wallpaper_desc: 'Short line for the wallpaper page.',

  wallpaper_res:  '4K · 3840×2160',
  wallpaper_tags: 'Tag1,Tag2,Tag3',

  added_date:     '2026-06-29',            // today's date — auto-expires New badge after 60 days
},
```

---

## Step 3 — Save and done

No build step. No server restart. Open any page in a browser and your product appears.

---

## Reference: Field Cheat Sheet

| Field | Required | Notes |
|---|---|---|
| `id` | ✅ | Unique slug, e.g. `ganesh-idol-01` |
| `title` | ✅ | Full display name |
| `image_drive_id` | ✅ | From Google Drive share link |
| `categories` | ✅ | Array from `VALID_CATEGORIES` |
| `tag_label` | ✅ | Short label on card |
| `gallery_desc` | ✅ | 1–2 sentences |
| `wallpaper_desc` | ✅ | 1 sentence |
| `sort_order` | ✅ | Controls display order |
| `featured` | ✅ | `true` = hero layout |
| `is_new` | — | `true` forces New badge |
| `added_date` | — | Auto New badge for 60 days |
| `materials` | — | Shown as badges on cards |
| `price_tier` | — | `₹` / `₹₹` / `₹₹₹` |
| `wallpaper_res` | — | Default: `4K · 3840×2160` |
| `wallpaper_tags` | — | Comma-separated style tags |

---

## Adding a new category (filter tab)

Edit `VALID_CATEGORIES` at the top of `data.js`:

```js
const VALID_CATEGORIES = ['spiritual', 'heritage', 'architecture', 'decor', 'custom', 'gifting'];
```

The filter bar on the Gallery page rebuilds itself automatically.

---

## Adding a new material

Edit `VALID_MATERIALS` at the top of `data.js`:

```js
const VALID_MATERIALS = ['PLA+', 'PETG', 'Resin', 'Nylon', 'ABS', 'Wood PLA', 'Carbon Fiber'];
```

---

## Changing display order

Set `sort_order` on each item — lower = appears first:

```
sort_order: 1   → first
sort_order: 2   → second
sort_order: 99  → last
```

---

## Connecting Google Sheets (optional, for team use)

If you want to manage products from a spreadsheet instead of editing `data.js`:

1. Create a Google Sheet with columns in this order:  
   `id, title, categories, tag_label, image_drive_id, gallery_desc, wallpaper_desc, featured, wallpaper_res, wallpaper_tags, materials, price_tier, sort_order, is_new, added_date`
2. Publish the sheet: **File → Share → Publish to web → CSV**
3. Copy the Sheet ID from the URL
4. In `data.js`, set:
   ```js
   const SHEET_ID  = 'your-sheet-id-here';
   const USE_SHEET = true;
   ```

---

## WhatsApp enquiry button

In `data.js`, set your number:
```js
const SITE_CONFIG = {
  whatsapp_number: '919876543210',   // country code + number, no spaces
  ...
};
```

Each product card will then get a WhatsApp button pre-filled with the product name.
