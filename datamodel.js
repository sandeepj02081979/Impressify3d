/**
 * ─────────────────────────────────────────────────────────────
 *  Impressify3D  ·  Shared Content Layer
 *  data.js — single source of truth for all pages
 * ─────────────────────────────────────────────────────────────
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';  // ← paste your Sheet ID
const USE_SHEET = false;                         // ← set to true when ready

// ── GITHUB REPO CONFIG ──────────────────────────────────────────
// Assets (images + .glb models) are served straight from the
// GitHub repo via raw.githubusercontent.com — no Google Drive needed.
const GITHUB_USER   = 'sandeepj02081979';
const GITHUB_REPO   = 'Impressify3d';
const GITHUB_BRANCH = 'main';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/`;

// ── FALLBACK DATA ─────────────────────────────────────────────
const FALLBACK_ITEMS = [
  {
    id: 'mandir-01',
    title: 'Mandir Lotus Shape',
    category: 'spiritual',
    tag_label: 'Spiritual · Featured',
    image_github_path: 'room_2x.jpeg',              // ← filename of the image as committed to the repo root
    model_github_path: 'TestModel-optimized.glb',    // ← filename of the .glb model as committed to the repo root
    gallery_desc: 'A perfect blend of tradition, craftsmanship, and spirituality. Intricate carvings with a sacred aura — wall-mounted for convenience without sacrificing beauty or devotion. Ideal for daily prayers or meditation.',
    wallpaper_desc: 'A serene wall-mounted mandir with intricate carvings — perfect as a spiritual desktop backdrop.',
    featured: true,
    wallpaper_res: '4K · 3840×2160',
    wallpaper_tags: 'Spiritual,Heritage,Detailed',
  },

];

// ── IMAGE / MODEL URL HELPER ────────────────────────────────────
// Builds a raw.githubusercontent.com URL for any file committed to
// the repo (images, .glb models, etc). `path` should be the file's
// path relative to the repo root, e.g. 'room_2x.jpeg' or
// 'models/TestModel-optimized.glb'.
function githubUrl(path) {
  if (!path || path.startsWith('REPLACE')) {
    return `https://via.placeholder.com/1200x900/f5f5f7/0071e3?text=Image+pending`;
  }
  return `${GITHUB_RAW_BASE}${path}`;
}

// Kept for backwards compatibility with any code still calling driveUrl().
// Now simply routes to the GitHub-based helper above.
function driveUrl(path) {
  return githubUrl(path);
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
        id:                 cols[0] || '',
        title:              cols[1] || '',
        category:           cols[2] || '',
        tag_label:          cols[3] || '',
        image_github_path:  cols[4] || '',
        gallery_desc:       cols[5] || '',
        wallpaper_desc:     cols[6] || '',
        featured:           cols[7]?.toLowerCase() === 'true',
        wallpaper_res:      cols[8] || '4K · 3840×2160',
        wallpaper_tags:     cols[9] || '',
        model_github_path:  cols[10] || '',
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
