function getNavHTML() {
  const user = JSON.parse(localStorage.getItem('ch_user') || 'null');
  const accountDropdown = user
    ? `<div class="nav-account-wrap" id="account-wrap">
        <button class="nav-search-btn" onclick="toggleAccountMenu()" id="account-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <div class="account-dropdown" id="account-dropdown">
          <div style="padding:14px 16px;border-bottom:1px solid var(--border)">
            <div style="font-size:12px;color:var(--mid)">Signed in as</div>
            <div style="font-size:14px;font-weight:600;color:var(--black)">${user.firstName} ${user.lastName}</div>
          </div>
          <a href="/account">My Account</a>
          <a href="#" onclick="signOut()">Sign Out</a>
        </div>
      </div>`
    : `<div class="nav-account-wrap" id="account-wrap">
        <button class="nav-search-btn" onclick="toggleAccountMenu()" id="account-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <div class="account-dropdown" id="account-dropdown">
          <a href="/account?tab=login">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Sign In
          </a>
          <a href="/account?tab=register">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            Create Account
          </a>
          <div style="border-top:1px solid var(--border);margin:4px 0"></div>
          <a href="/admin/login" style="color:var(--gold)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Admin Login
          </a>
        </div>
      </div>`;

  return `
  <nav class="navbar">
    <div class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="/images/logo.png" alt="Crafthouse Kitchen">
      </a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li class="nav-dropdown">
          <a href="/shop">Shop</a>
          <div class="dropdown-menu">
            <a href="/category/Cooker%20Hoods">Cooker Hoods</a>
            <a href="/category/Cookers">Cookers</a>
            <a href="/category/Hobs">Hobs</a>
            <a href="/category/Ovens">Ovens</a>
            <a href="/category/Microwaves">Microwaves</a>
            <a href="/category/Dishwashers">Dishwashers</a>
            <a href="/category/Refrigeration">Refrigeration</a>
            <a href="/category/Sinks">Sinks</a>
            <a href="/category/Kitchen%20Taps">Kitchen Taps</a>
            <a href="/category/Storage%20%26%20Organizers">Storage &amp; Organizers</a>
            <a href="/category/Handles%20%26%20Accessories">Handles &amp; Accessories</a>
          </div>
        </li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-search-btn" id="search-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        ${accountDropdown}
        <a href="/cart" class="nav-cart-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-badge cart-count" style="display:none">0</span>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <div class="search-overlay" id="search-overlay">
    <div class="search-inner">
      <p style="color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px">Search Products</p>
      <input type="text" id="search-input" placeholder="Search cookers, hoods, sinks...">
      <p style="color:rgba(255,255,255,0.3);font-size:12px;margin-top:12px">Press Enter to search</p>
    </div>
    <button class="search-close" id="search-close">&times;</button>
  </div>
  <div class="mobile-nav" id="mobile-nav">
    <div class="mobile-nav-header">
      <img src="/images/logo.png" alt="Crafthouse">
      <button class="mobile-nav-close" id="mobile-nav-close">&times;</button>
    </div>
    <div class="mobile-nav-links">
      <a href="/">Home</a>
      <a href="/shop">All Products</a>
      <a href="/category/Cooker%20Hoods">Cooker Hoods</a>
      <a href="/category/Cookers">Cookers</a>
      <a href="/category/Hobs">Hobs</a>
      <a href="/category/Ovens">Ovens</a>
      <a href="/category/Microwaves">Microwaves</a>
      <a href="/category/Sinks">Sinks</a>
      <a href="/category/Kitchen%20Taps">Kitchen Taps</a>
      <a href="/cart">Cart</a>
      <a href="/account?tab=login">Sign In</a>
      <a href="/account?tab=register">Create Account</a>
      <a href="/admin/login" style="color:var(--gold)">Admin Login</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
  <div class="overlay-mask" id="overlay-mask"></div>
  `;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="background:white;display:inline-block;padding:8px 16px;border-radius:4px;margin-bottom:20px">
          <img src="/images/logo.png" alt="Crafthouse Kitchen" style="height:44px;display:block">
        </div>
        <p class="footer-tagline">Premium kitchen systems and appliances. Designed for those who believe the kitchen is the heart of the home. Design. Quality. Function.</p>
        <div class="footer-socials">
          <a href="#" style="width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" style="width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1877F2" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://wa.me/2348058262947" target="_blank" style="width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#25D366" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h4 class="footer-col-title">Shop</h4>
        <ul class="footer-links">
          <li><a href="/category/Cooker%20Hoods">Cooker Hoods</a></li>
          <li><a href="/category/Cookers">Cookers</a></li>
          <li><a href="/category/Hobs">Hobs</a></li>
          <li><a href="/category/Ovens">Ovens</a></li>
          <li><a href="/category/Microwaves">Microwaves</a></li>
          <li><a href="/category/Sinks">Sinks</a></li>
          <li><a href="/category/Kitchen%20Taps">Kitchen Taps</a></li>
          <li><a href="/shop">All Products</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-col-title">Account</h4>
        <ul class="footer-links">
          <li><a href="/account?tab=login">Sign In</a></li>
          <li><a href="/account?tab=register">Create Account</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-col-title">Contact</h4>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Plot 4, Honda Close, Off Kolawole Shonibare Street, Ajao Estate, Lagos
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <a href="https://wa.me/2348058262947" target="_blank" style="color:rgba(255,255,255,0.5)">08058262947</a>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          crafthouse.systems@gmail.com
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Crafthouse Kitchen Systems &amp; Appliances. All rights reserved.</span>
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Returns</a>
      </div>
    </div>
  </footer>
  `;
}

function toggleAccountMenu() {
  const dd = document.getElementById('account-dropdown');
  if (!dd) return;
  dd.classList.toggle('open');
}

function signOut() {
  localStorage.removeItem('ch_user');
  window.location.reload();
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('account-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const dd = document.getElementById('account-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.innerHTML = getNavHTML();
  if (footerMount) footerMount.innerHTML = getFooterHTML();

  if (!window.location.pathname.includes('/admin')) {
    const script = document.createElement('script');
    script.src = '/js/chatbot.js';
    document.body.appendChild(script);
  }
});
