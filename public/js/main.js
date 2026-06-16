// ============================================
// CRAFTHOUSE KITCHEN — Global JS
// ============================================

// Format currency
function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

// Toast notification
function showToast(msg, type = 'success', duration = 3500) {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success'
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
        : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'}
    </svg>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function createToastContainer() {
  const el = document.createElement('div');
  el.id = 'toast-container';
  el.className = 'toast-container';
  document.body.appendChild(el);
  return el;
}

// Update cart badge
function updateCartBadge(count) {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Add to cart
async function addToCart(productId, qty = 1) {
  try {
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, qty })
    });
    const data = await res.json();
    if (data.success) {
      updateCartBadge(data.count);
      showToast('Added to cart');
    }
  } catch (e) {
    showToast('Failed to add to cart', 'error');
  }
}

// Fetch cart count on load
async function fetchCartCount() {
  try {
    const res = await fetch('/api/cart');
    const data = await res.json();
    updateCartBadge(data.count);
  } catch {}
}

// Search overlay
function initSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const openBtn = document.getElementById('search-btn');
  const closeBtn = document.getElementById('search-close');

  if (!overlay) return;

  openBtn?.addEventListener('click', () => {
    overlay.classList.add('active');
    setTimeout(() => input?.focus(), 100);
  });
  closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(input.value.trim())}`;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('active');
  });
}

// Mobile nav
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mask = document.getElementById('overlay-mask');
  const closeBtn = document.getElementById('mobile-nav-close');

  function open() {
    mobileNav?.classList.add('open');
    mask?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    mobileNav?.classList.remove('open');
    mask?.classList.remove('active');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  mask?.addEventListener('click', close);
}

// Active nav link
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === path || (path.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/')) {
      a.classList.add('active');
    }
    if (path === '/' && a.getAttribute('href') === '/') a.classList.add('active');
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  fetchCartCount();
  initSearch();
  initMobileNav();
  setActiveNav();
});
