/**
 * ─────────────────────────────────────────────────────────────
 *  Impressify3D  ·  Shared Content Layer
 *  data.js — single source of truth for all pages
 * ─────────────────────────────────────────────────────────────
 *
 *  HOW TO CONNECT YOUR GOOGLE SHEET
 *  ─────────────────────────────────
 *  1. Open your Google Sheet and go to File → Share → Publish to web
 *     → Sheet1 → CSV → Publish  (copy the URL, you only need the Sheet ID from it)
 *  2. Paste your Sheet ID into SHEET_ID below (the long string between /d/ and /edit)
 *  3. Set USE_SHEET = true
 *  4. Commit & push — the pages now read live from the sheet on every load.
 *
 *  SHEET COLUMN ORDER  (Row 1 = headers, data from Row 2 onward)
 *  ─────────────────────────────────────────────────────────────
 *  A: id              — unique slug, e.g. "mandir-01"
 *  B: title           — "Wall-Mounted Mandir – Divine Elegance"
 *  C: category        — comma-separated: "spiritual" or "heritage,architecture"
 *  D: tag_label       — short display tag: "Spiritual · Featured"
 *  E: image_drive_id  — Google Drive file ID (the part after /d/ in the share URL)
 *  F: gallery_desc    — description shown on the Product Gallery page
 *  G: wallpaper_desc  — description shown on the Wallpapers page (can differ)
 *  H: featured        — "true" or blank  → makes this item a hero/featured card
 *  I: wallpaper_res   — resolution label for wallpapers, e.g. "4K · 3840×2160"
 *  J: wallpaper_tags  — comma-separated style tags: "Heritage,Detailed,Dark"
 *
 * ─────────────────────────────────────────────────────────────
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';  // ← paste your Sheet ID
const USE_SHEET = false;                         // ← set to true when ready

// ── FALLBACK DATA ─────────────────────────────────────────────
// Used when USE_SHEET = false, or if the sheet fetch fails.
// Edit this directly while developing; the structure mirrors the sheet columns.

const FALLBACK_ITEMS = [
  {
    id: 'mandir-01',
    title: 'Wall-Mounted Mandir – Divine Elegance',
    category: 'spiritual',
    tag_label: 'Spiritual · Featured',
    image_drive_id: '1yD0Gfm_zYe1nFTgD9WetmmljOkqDy4SD',
    gallery_desc: 'A perfect blend of tradition, craftsmanship, and spirituality. Intricate carvings with a sacred aura — wall-mounted for convenience without sacrificing beauty or devotion. Ideal for daily prayers or meditation.',
    wallpaper_desc: 'A serene wall-mounted mandir with intricate carvings — perfect as a spiritual desktop backdrop.',
    featured: true,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Heritage,Detailed',
  },
  {
    id: 'jharokha-01',
    title: 'Jharokha – The Royal Balcony',
    category: 'heritage',
    tag_label: 'Heritage',
    image_drive_id: '1NaY_dSSJKdX_iXInt6TPlI4jpTdb-K3e',
    gallery_desc: 'Intricate carvings inspired by Rajasthani and Mughal architecture — ornate jali work, floral motifs, and geometric patterns reflecting royal elegance.',
    wallpaper_desc: 'Royal Rajasthani jali patterns rendered in stunning 3D — a regal addition to any screen.',
    featured: false,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Heritage,Royal,Geometric',
  },
  {
    id: 'circular-temple-01',
    title: 'Eternal Harmony – The Circular Temple',
    category: 'spiritual',
    tag_label: 'Spiritual',
    image_drive_id: '1lTfanT9BYS1eEApfkr1L7Odho8-sDmwc',
    gallery_desc: 'A stunning representation of spiritual unity. Every curve symbolizes balance, inviting a sense of peace and devotion in its flawless architectural form.',
    wallpaper_desc: 'The harmony of a circular temple form — meditative, balanced, and beautiful on any display.',
    featured: false,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Minimal,Serene',
  },
  {
    id: 'heritage-home-01',
    title: 'Maharashtrian Heritage Home – Timeless Tradition',
    category: 'architecture,heritage',
    tag_label: 'Architecture · Heritage',
    image_drive_id: '1KiVVEh7SwR1MV9mahCYX6ditEnlHPcTR',
    gallery_desc: 'A stunning embodiment of timeless tradition — intricate woodwork, spacious courtyards, and classical architectural elements honoring Maharashtra\'s rich heritage.',
    wallpaper_desc: 'Classic Maharashtrian architecture in precise 3D — courtyard charm as your wallpaper.',
    featured: false,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Heritage,Architecture,Warm',
  },
  {
    id: 'jharokha-temple-01',
    title: 'Majestic Temple – Jharokha Elegance',
    category: 'spiritual,heritage',
    tag_label: 'Spiritual · Heritage',
    image_drive_id: '1b0uLBqI0047Ik8KEPd8W5OfPIqsfsJ6V',
    gallery_desc: 'Intricate lattice work and ornate arch designs elevate this temple\'s grandeur. A symbol of divine craftsmanship, ideal for adding a majestic presence to any space.',
    wallpaper_desc: 'Majestic temple arches and lattice — a wallpaper that brings grandeur to your workspace.',
    featured: false,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Heritage,Ornate',
  },
  {
    id: 'round-temple-01',
    title: 'Divine Circle – The Sacred Round Temple',
    category: 'spiritual',
    tag_label: 'Spiritual',
    image_drive_id: '1TCGafas8hgwym5yam_k-hZbOgbPGDIM_',
    gallery_desc: 'A masterpiece of spiritual architecture — gracefully curved structure radiating a serene atmosphere. Its harmonious round form symbolizes wholeness and divine grace.',
    wallpaper_desc: 'Sacred circular geometry in 3D — calming and perfect for a focused work environment.',
    featured: false,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Geometric,Serene',
  },
  {
    id: 'text-decor-01',
    title: '3D Text Decor – Personalized Elegance',
    category: 'decor',
    tag_label: 'Decor · Custom',
    image_drive_id: '11WB2Lx_R2e-hJutKc4MS6XMjMmgG1qL4',
    gallery_desc: 'Bold, eye-catching lettering crafted with precision — your name, a meaningful word, or an inspiring quote transformed into a stylish desk piece.',
    wallpaper_desc: 'Custom 3D typography art — make your name or a power word the centerpiece of your screen.',
    featured: true,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Decor,Typography,Custom',
  },
];

// ── IMAGE URL HELPER ──────────────────────────────────────────
// Converts a Drive file ID into a usable thumbnail URL.
// sz=w1200 for gallery cards; sz=w1920 for wallpaper previews.
function driveUrl(fileId, size = 'w1200') {
  if (!fileId || fileId.startsWith('REPLACE')) {
    // Placeholder gradient while IDs aren't filled in yet
    return `https://via.placeholder.com/1200x900/f5f5f7/0071e3?text=Image+pending`;
  }
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
}

// ── SHEET FETCHER ─────────────────────────────────────────────
async function loadItems() {
  if (!USE_SHEET || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    return FALLBACK_ITEMS;
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Sheet fetch failed');
    const csv = await res.text();

    const rows = csv.trim().split('\n').slice(1); // skip header row
    return rows.map(row => {
      // Handle quoted CSV fields properly
      const cols = row.match(/(".*?"|[^,]+)(?=,|$)/g)?.map(c => c.replace(/^"|"$/g, '').trim()) ?? [];
      return {
        id:              cols[0] || '',
        title:           cols[1] || '',
        category:        cols[2] || '',
        tag_label:       cols[3] || '',
        image_drive_id:  cols[4] || '',
        gallery_desc:    cols[5] || '',
        wallpaper_desc:  cols[6] || '',
        featured:        cols[7]?.toLowerCase() === 'true',
        wallpaper_res:   cols[8] || '4K · 3840×2160',
        wallpaper_tags:  cols[9] || '',
      };
    }).filter(item => item.id); // skip empty rows
  } catch (err) {
    console.warn('Google Sheet unavailable, using fallback data.', err);
    return FALLBACK_ITEMS;
  }
}
