/**
 * ─────────────────────────────────────────────────────────────
 *  Impressify3D  ·  Shared Content Layer
 *  data.js — single source of truth for all pages
 * ─────────────────────────────────────────────────────────────
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';  // ← paste your Sheet ID
const USE_SHEET = false;                         // ← set to true when ready

// ── FALLBACK DATA ─────────────────────────────────────────────
const FALLBACK_ITEMS = [
  {
    id: 'mandir-01',
    title: 'Mandir Lotus Shape',
    category: 'spiritual',
    tag_label: 'Spiritual · Featured',
    image_drive_id: '1nYr1BErOkvfBg1RAJlPTzMkihgNCdVtw',
    gallery_desc: 'A perfect blend of tradition, craftsmanship, and spirituality. Intricate carvings with a sacred aura — wall-mounted for convenience without sacrificing beauty or devotion. Ideal for daily prayers or meditation.',
    wallpaper_desc: 'A serene wall-mounted mandir with intricate carvings — perfect as a spiritual desktop backdrop.',
    featured: true,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Heritage,Detailed',
  },
  
];

// ── IMAGE URL HELPER ──────────────────────────────────────────
function driveUrl(fileId, size = 'w1200') {
  if (!fileId || fileId.startsWith('REPLACE')) {
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

    const rows = csv.trim().split('\n').slice(1);
    return rows.map(row => {
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
    }).filter(item => item.id);
  } catch (err) {
    console.warn('Google Sheet unavailable, using fallback data.', err);
    return FALLBACK_ITEMS;
  }
}

// ── NAVIGATION INJECTOR ────────────────────────────────────────
function initGlobalNavigation() {
  const navLinksContainer = document.querySelector('.nav-links');
  if (!navLinksContainer) return;

  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('index.html') || path.endsWith('home') || (!path.includes('ProductGallery') && !path.includes('Wallpapers'));

  const homeBase = isHomePage ? '' : 'index.html';
  const galleryUrl = 'ProductGallery.html';
  const wallpapersUrl = 'Wallpapers.html';

  const isGalleryActive = path.includes('ProductGallery');
  const isWallpapersActive = path.includes('Wallpapers');

  navLinksContainer.innerHTML = `
    <li><a href="${homeBase}#services">Services</a></li>
    <li><a href="${homeBase}#about">About</a></li>
    <li><a href="${galleryUrl}" class="${isGalleryActive ? 'active' : ''}">Gallery</a></li>
    <li><a href="${wallpapersUrl}" class="${isWallpapersActive ? 'active' : ''}">Wallpapers</a></li>
    <li><a href="ModelViewer.html" class="${path.includes('ModelViewer') ? 'active' : ''}">3D Viewer</a></li>
    <li><a href="mailto:impressify3d@gmail.com">Contact</a></li>
  `;
}

document.addEventListener('DOMContentLoaded', initGlobalNavigation);