/**
 * Impressify3D — Shared Content Layer
 * Loads /data/site.json + /data/products.json. To add a product:
 *   1. Drop image at  /assets/images/<id>.jpg  (1200px wide, <300KB)
 *   2. Drop model at  /assets/models/<id>.glb   (optional, set has_model: true)
 *   3. Copy a block in /data/products.json and fill it in.
 * No code changes needed — every page reads from here.
 */

let SITE_CONFIG = {};
let PRODUCTS = [];

async function loadSiteData() {
  const [site, products] = await Promise.all([
    fetch('data/site.json').then(r => r.json()),
    fetch('data/products.json').then(r => r.json()),
  ]);
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
