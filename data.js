/**
 * ═══════════════════════════════════════════════════════════════
 *  Impressify3D  ·  Shared Content Layer  ·  data.js
 *  Single source of truth for all pages.
 *
 *  HOW TO ADD A NEW PRODUCT — just copy the template below and
 *  fill in your values. Every field is documented inline.
 *  Then save the file. All three pages update automatically.
 * ═══════════════════════════════════════════════════════════════
 */

// ── SITE CONFIG ──────────────────────────────────────────────
const SITE_CONFIG = {
  whatsapp_number: '+16022148109',          // ← e.g. '919876543210' (no + or spaces)
  quote_form_url:  'https://docs.google.com/forms/d/1dwelCNUBreJLfpcdp6720Z2w5Ib5FjjMwWMVLIKl73s/edit',
  email:           'impressify3d@gmail.com',
  instagram:       '',                       // ← e.g. 'https://instagram.com/impressify3d'
  facebook:        '',
  youtube:         '',
};

// ── GOOGLE SHEET (optional, advanced) ────────────────────────
const SHEET_ID  = 'YOUR_GOOGLE_SHEET_ID_HERE'; // ← paste your Sheet ID
const USE_SHEET = false;                         // ← set true when ready

// ── VALID CATEGORIES (controls filter bar) ────────────────────
// Only use these exact strings in the `categories` array below.
// Add new ones here if you need a new filter tab.
const VALID_CATEGORIES = ['spiritual', 'heritage', 'architecture', 'decor', 'custom'];

// ── VALID MATERIALS (for product badges) ─────────────────────
const VALID_MATERIALS = ['PLA+', 'PETG', 'Resin', 'Nylon', 'ABS', 'Wood PLA'];

// ── PRICE TIERS ───────────────────────────────────────────────
// '₹'   = budget-friendly  (under ₹500)
// '₹₹'  = mid-range        (₹500 – ₹2000)
// '₹₹₹' = premium          (above ₹2000)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ★  PRODUCT TEMPLATE — copy this block to add a new product
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
  {
    // ── IDENTITY ──────────────────────────────────────────────
    id:           'my-product-01',          // unique slug, lowercase-hyphen, no spaces
    title:        'My Product Name',        // shown as heading on gallery + wallpapers
    is_new:       false,                    // true = shows "New" badge for 60 days
    sort_order:   99,                       // lower number = appears first (0 = top)
    featured:     false,                    // true = gets large hero card on gallery page

    // ── IMAGE ─────────────────────────────────────────────────
    image_drive_id: 'PASTE_DRIVE_FILE_ID', // from Google Drive share link (see guide)

    // ── CATEGORISATION ────────────────────────────────────────
    categories:  ['spiritual'],             // array — pick from VALID_CATEGORIES above
    tag_label:   'Spiritual',               // short label shown on cards (e.g. 'Spiritual · Heritage')
    materials:   ['PLA+'],                  // array — pick from VALID_MATERIALS above
    price_tier:  '₹₹',                     // '₹', '₹₹', or '₹₹₹'

    // ── COPY ──────────────────────────────────────────────────
    gallery_desc:   'One or two sentences shown on the gallery card.',
    wallpaper_desc: 'Short line shown under the wallpaper image.',

    // ── WALLPAPER ─────────────────────────────────────────────
    wallpaper_res:  '4K · 3840×2160',      // resolution label shown on wallpaper page
    wallpaper_tags: 'Tag1,Tag2,Tag3',       // comma-separated style tags

    // ── OPTIONAL OVERRIDES ────────────────────────────────────
    enquiry_note:  '',                      // pre-fills WhatsApp/quote with a note, optional
    added_date:    '2026-06-29',            // YYYY-MM-DD — used to auto-expire "New" badge
  },
*/

// ── PRODUCT DATA ──────────────────────────────────────────────
const FALLBACK_ITEMS = [
  {
    id:             'mandir-01',
    title:          'Wall-Mounted Mandir – Divine Elegance',
    is_new:         false,
    sort_order:     1,
    featured:       true,
    image_drive_id: '1yD0Gfm_zYe1nFTgD9WetmmljOkqDy4SD',
    categories:     ['spiritual'],
    tag_label:      'Spiritual · Featured',
    materials:      ['PLA+'],
    price_tier:     '₹₹',
    gallery_desc:   'A perfect blend of tradition, craftsmanship, and spirituality. Intricate carvings with a sacred aura — wall-mounted for convenience without sacrificing beauty or devotion. Ideal for daily prayers or meditation.',
    wallpaper_desc: 'A serene wall-mounted mandir with intricate carvings — perfect as a spiritual desktop backdrop.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Heritage,Detailed',
    added_date:     '2025-01-01',
  },
  {
    id:             'jharokha-01',
    title:          'Jharokha – The Royal Balcony',
    is_new:         false,
    sort_order:     2,
    featured:       false,
    image_drive_id: '1NaY_dSSJKdX_iXInt6TPlI4jpTdb-K3e',
    categories:     ['heritage'],
    tag_label:      'Heritage',
    materials:      ['PLA+'],
    price_tier:     '₹₹',
    gallery_desc:   'Intricate carvings inspired by Rajasthani and Mughal architecture — ornate jali work, floral motifs, and geometric patterns reflecting royal elegance.',
    wallpaper_desc: 'Royal Rajasthani jali patterns rendered in stunning 3D — a regal addition to any screen.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Heritage,Royal,Geometric',
    added_date:     '2025-01-01',
  },
  {
    id:             'circular-temple-01',
    title:          'Eternal Harmony – The Circular Temple',
    is_new:         false,
    sort_order:     3,
    featured:       false,
    image_drive_id: '1lTfanT9BYS1eEApfkr1L7Odho8-sDmwc',
    categories:     ['spiritual'],
    tag_label:      'Spiritual',
    materials:      ['Resin'],
    price_tier:     '₹₹₹',
    gallery_desc:   'A stunning representation of spiritual unity. Every curve symbolizes balance, inviting a sense of peace and devotion in its flawless architectural form.',
    wallpaper_desc: 'The harmony of a circular temple form — meditative, balanced, and beautiful on any display.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Minimal,Serene',
    added_date:     '2025-01-01',
  },
  {
    id:             'heritage-home-01',
    title:          'Maharashtrian Heritage Home – Timeless Tradition',
    is_new:         false,
    sort_order:     4,
    featured:       false,
    image_drive_id: '1KiVVEh7SwR1MV9mahCYX6ditEnlHPcTR',
    categories:     ['architecture', 'heritage'],
    tag_label:      'Architecture · Heritage',
    materials:      ['PLA+'],
    price_tier:     '₹₹₹',
    gallery_desc:   "A stunning embodiment of timeless tradition — intricate woodwork, spacious courtyards, and classical architectural elements honoring Maharashtra's rich heritage.",
    wallpaper_desc: 'Classic Maharashtrian architecture in precise 3D — courtyard charm as your wallpaper.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Heritage,Architecture,Warm',
    added_date:     '2025-01-01',
  },
  {
    id:             'jharokha-temple-01',
    title:          'Majestic Temple – Jharokha Elegance',
    is_new:         false,
    sort_order:     5,
    featured:       false,
    image_drive_id: '1b0uLBqI0047Ik8KEPd8W5OfPIqsfsJ6V',
    categories:     ['spiritual', 'heritage'],
    tag_label:      'Spiritual · Heritage',
    materials:      ['PLA+'],
    price_tier:     '₹₹',
    gallery_desc:   "Intricate lattice work and ornate arch designs elevate this temple's grandeur. A symbol of divine craftsmanship, ideal for adding a majestic presence to any space.",
    wallpaper_desc: 'Majestic temple arches and lattice — a wallpaper that brings grandeur to your workspace.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Heritage,Ornate',
    added_date:     '2025-01-01',
  },
  {
    id:             'round-temple-01',
    title:          'Divine Circle – The Sacred Round Temple',
    is_new:         false,
    sort_order:     6,
    featured:       false,
    image_drive_id: '1TCGafas8hgwym5yam_k-hZbOgbPGDIM_',
    categories:     ['spiritual'],
    tag_label:      'Spiritual',
    materials:      ['Resin'],
    price_tier:     '₹₹₹',
    gallery_desc:   'A masterpiece of spiritual architecture — gracefully curved structure radiating a serene atmosphere. Its harmonious round form symbolizes wholeness and divine grace.',
    wallpaper_desc: 'Sacred circular geometry in 3D — calming and perfect for a focused work environment.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Geometric,Serene',
    added_date:     '2025-01-01',
  },
  {
    id:             'text-decor-01',
    title:          '3D Text Decor – Personalized Elegance',
    is_new:         false,
    sort_order:     7,
    featured:       true,
    image_drive_id: '11WB2Lx_R2e-hJutKc4MS6XMjMmgG1qL4',
    categories:     ['decor', 'custom'],
    tag_label:      'Decor · Custom',
    materials:      ['PLA+', 'PETG'],
    price_tier:     '₹',
    gallery_desc:   'Bold, eye-catching lettering crafted with precision — your name, a meaningful word, or an inspiring quote transformed into a stylish desk piece.',
    wallpaper_desc: 'Custom 3D typography art — make your name or a power word the centerpiece of your screen.',
    wallpaper_res:  '4K · 3840×2160',
    wallpaper_tags: 'Decor,Typography,Custom',
    added_date:     '2025-01-01',
  },
];

// ── IMAGE URL HELPER ──────────────────────────────────────────
function driveUrl(fileId, size = 'w1200') {
  if (!fileId || fileId.startsWith('REPLACE') || fileId === 'PASTE_DRIVE_FILE_ID') {
    return `https://via.placeholder.com/1200x900/f5f5f7/0071e3?text=Image+pending`;
  }
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
}

// ── "NEW" BADGE HELPER ────────────────────────────────────────
// Returns true if the item was added within the last 60 days,
// OR if is_new is explicitly set to true.
function isNewItem(item) {
  if (item.is_new === true) return true;
  if (!item.added_date) return false;
  const added = new Date(item.added_date);
  const now   = new Date();
  const days  = (now - added) / (1000 * 60 * 60 * 24);
  return days <= 60;
}

// ── WHATSAPP ENQUIRY LINK ─────────────────────────────────────
function whatsappLink(item) {
  const num  = SITE_CONFIG.whatsapp_number;
  if (!num || num.includes('X')) return SITE_CONFIG.quote_form_url;
  const msg  = encodeURIComponent(
    `Hi! I'm interested in "${item.title}"${item.enquiry_note ? ' — ' + item.enquiry_note : ''}. Please share more details.`
  );
  return `https://wa.me/${num}?text=${msg}`;
}

// ── NORMALIZE ITEMS ────────────────────────────────────────────
// Converts old-format items (category string) to new format (categories array)
// so existing pages work even if you mix old and new entries.
function normalizeItem(item) {
  if (!item.categories) {
    item.categories = (item.category || '').split(',').map(c => c.trim()).filter(Boolean);
  }
  item.category = item.categories.join(','); // keep backward compat
  item.sort_order = item.sort_order ?? 999;
  return item;
}

// ── SHEET FETCHER ─────────────────────────────────────────────
async function loadItems() {
  let items;

  if (!USE_SHEET || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    items = FALLBACK_ITEMS;
  } else {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Sheet fetch failed');
      const csv = await res.text();
      const rows = csv.trim().split('\n').slice(1);
      items = rows.map(row => {
        const cols = row.match(/(".*?"|[^,]+)(?=,|$)/g)?.map(c => c.replace(/^"|"$/g, '').trim()) ?? [];
        return {
          id:             cols[0]  || '',
          title:          cols[1]  || '',
          categories:     (cols[2] || '').split(',').map(c => c.trim()).filter(Boolean),
          tag_label:      cols[3]  || '',
          image_drive_id: cols[4]  || '',
          gallery_desc:   cols[5]  || '',
          wallpaper_desc: cols[6]  || '',
          featured:       cols[7]?.toLowerCase() === 'true',
          wallpaper_res:  cols[8]  || '4K · 3840×2160',
          wallpaper_tags: cols[9]  || '',
          materials:      (cols[10] || '').split(',').map(m => m.trim()).filter(Boolean),
          price_tier:     cols[11] || '',
          sort_order:     parseInt(cols[12]) || 999,
          is_new:         cols[13]?.toLowerCase() === 'true',
          added_date:     cols[14] || '',
        };
      }).filter(item => item.id);
    } catch (err) {
      console.warn('Google Sheet unavailable, using fallback data.', err);
      items = FALLBACK_ITEMS;
    }
  }

  // Normalize + sort by sort_order
  return items.map(normalizeItem).sort((a, b) => a.sort_order - b.sort_order);
}

// ── NAVIGATION INJECTOR ───────────────────────────────────────
function initGlobalNavigation() {
  const navLinksContainer = document.querySelector('.nav-links');
  if (!navLinksContainer) return;

  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('index.html') || path.endsWith('home') ||
                     (!path.includes('ProductGallery') && !path.includes('Wallpapers'));

  const homeBase      = isHomePage ? '' : 'index.html';
  const galleryUrl    = 'ProductGallery.html';
  const wallpapersUrl = 'Wallpapers.html';

  const isGalleryActive    = path.includes('ProductGallery');
  const isWallpapersActive = path.includes('Wallpapers');

  navLinksContainer.innerHTML = `
    <li><a href="${homeBase}#services">Services</a></li>
    <li><a href="${homeBase}#about">About</a></li>
    <li><a href="${galleryUrl}" class="${isGalleryActive    ? 'active' : ''}">Gallery</a></li>
    <li><a href="${wallpapersUrl}" class="${isWallpapersActive ? 'active' : ''}">Wallpapers</a></li>
    <li><a href="mailto:${SITE_CONFIG.email}">Contact</a></li>
  `;
}

document.addEventListener('DOMContentLoaded', initGlobalNavigation);
