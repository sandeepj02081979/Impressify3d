/**
 * Impressify3D — Shared Content Layer
 * Content now lives in a Google Sheet (not JSON files) — see MAINTENANCE.md.
 * Images/models still live in /assets/ on GitHub, matched by the sheet's `id` column:
 *   1. Drop image at  /assets/images/<id>.jpg  (1200px wide, <300KB)
 *   2. Drop model at  /assets/models/<id>.glb   (optional, set has_model = TRUE)
 *   3. Add a row to the Products sheet.
 * If the sheet can't be reached (offline, URL not set yet), falls back to
 * /data/products.json + /data/site.json so the site never breaks.
 */

// Replace these with your own published-CSV links (see MAINTENANCE.md step 3).
const PRODUCTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/PASTE_YOUR_SHEET_ID/pub?gid=0&single=true&output=csv';
const SITE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/PASTE_YOUR_SHEET_ID/pub?gid=1&single=true&output=csv';

let SITE_CONFIG = {};
let PRODUCTS = [];

// Minimal CSV parser — handles quoted fields with commas/newlines.
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && next === '\n') i++;
        row.push(field); rows.push(row); row = []; field = '';
      } else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.some(v => v.trim() !== ''))
    .map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] || '').trim()])));
}

const toBool = v => /^(true|yes|1)$/i.test(v);
const toList = v => v ? v.split(',').map(s => s.trim()).filter(Boolean) : [];

async function fetchCSV(url) {
  const res = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now());
  if (!res.ok) throw new Error('CSV fetch failed: ' + res.status);
  return parseCSV(await res.text());
}

async function loadFromSheets() {
  const [siteRows, productRows] = await Promise.all([
    fetchCSV(SITE_CSV_URL),
    fetchCSV(PRODUCTS_CSV_URL),
  ]);
  const site = Object.fromEntries(siteRows.map(r => [r.key, r.value]));
  site.valid_categories = toList(site.valid_categories);
  site.valid_materials = toList(site.valid_materials);

  const products = productRows.map(r => ({
    id: r.id,
    title: r.title,
    is_new: toBool(r.is_new),
    sort_order: Number(r.sort_order) || 0,
    featured: toBool(r.featured),
    categories: toList(r.categories),
    tag_label: r.tag_label,
    materials: toList(r.materials),
    price_tier: r.price_tier,
    gallery_desc: r.gallery_desc,
    wallpaper_desc: r.wallpaper_desc,
    wallpaper_res: r.wallpaper_res,
    wallpaper_tags: r.wallpaper_tags,
    has_model: toBool(r.has_model),
    enquiry_note: r.enquiry_note,
    added_date: r.added_date,
  }));
  return { site, products };
}

async function loadFromJSONFallback() {
  const [site, products] = await Promise.all([
    fetch('data/site.json').then(r => r.json()),
    fetch('data/products.json').then(r => r.json()),
  ]);
  return { site, products };
}

async function loadSiteData() {
  let site, products;
  try {
    ({ site, products } = await loadFromSheets());
    if (!products.length) throw new Error('Sheet returned no products');
  } catch (err) {
    console.warn('Falling back to local JSON (Sheet unavailable):', err.message);
    ({ site, products } = await loadFromJSONFallback());
  }
  SITE_CONFIG = site;
  PRODUCTS = products
    .map(p => ({
      ...p,
      image: `assets/images/${p.id}.jpg`,
      model: p.has_model ? `assets/models/${p.id}.glb` : null,
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
  return PRODUCTS;
}

// Back-compat shim for pages still calling loadItems()
async function loadItems() {
  return PRODUCTS.length ? PRODUCTS : loadSiteData();
}

function imageUrl(product) {
  return product.image || 'assets/images/placeholder.jpg';
}

function isNewItem(item) {
  if (item.is_new === true) return true;
  if (!item.added_date) return false;
  const days = (new Date() - new Date(item.added_date)) / 86400000;
  return days <= 60;
}

function whatsappLink(item) {
  const num = SITE_CONFIG.whatsapp_number;
  if (!num) return SITE_CONFIG.quote_form_url;
  const msg = encodeURIComponent(
    `Hi! I'm interested in "${item.title}"${item.enquiry_note ? ' — ' + item.enquiry_note : ''}. Please share more details.`
  );
  return `https://wa.me/${num.replace('+', '')}?text=${msg}`;
}

function initGlobalNavigation() {
  const navLinksContainer = document.querySelector('.nav-links');
  if (!navLinksContainer) return;

  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('index.html') ||
    (!path.includes('ProductGallery') && !path.includes('Wallpapers') && !path.includes('ModelViewer'));
  const homeBase = isHomePage ? '' : 'index.html';

  navLinksContainer.innerHTML = `
    <li><a href="${homeBase}#services">Services</a></li>
    <li><a href="${homeBase}#about">About</a></li>
    <li><a href="ProductGallery.html" class="${path.includes('ProductGallery') ? 'active' : ''}">Gallery</a></li>
    <li><a href="Wallpapers.html" class="${path.includes('Wallpapers') ? 'active' : ''}">Wallpapers</a></li>
    <li><a href="ModelViewer.html" class="${path.includes('ModelViewer') ? 'active' : ''}">3D Viewer</a></li>
    <li><a href="mailto:${SITE_CONFIG.email}">Contact</a></li>
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteData();
  initGlobalNavigation();
});
