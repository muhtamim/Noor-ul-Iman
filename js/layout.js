// ====== Shared Navbar + Footer Layout ======
// Auto-injected into pages with <div id="navbar-mount"> and <div id="footer-mount">

const navItems = [
  // Main features (always visible)
  { href: 'quran.html', label: 'Quran', icon: 'book', primary: true },
  { href: 'ai.html', label: 'Noor AI', icon: 'sparkle', primary: true, badge: 'NEW' },
  { href: 'learn.html', label: 'Learn', icon: 'sparkle', primary: true },
  { href: 'prayer.html', label: 'Prayer', icon: 'mosque', primary: true },
  { href: 'ramadan.html', label: 'Ramadan', icon: 'moonStar', primary: true },
  { href: 'live.html', label: 'Live Makkah', icon: 'mosque', primary: true },
  // Secondary features (in "More" dropdown)
  { href: 'duas.html', label: 'Daily Duas', icon: 'hands', primary: false },
  { href: 'qibla.html', label: 'Qibla', icon: 'compass', primary: false },
  { href: 'hadith.html', label: 'Hadith', icon: 'scroll', primary: false },
  { href: 'tasbih.html', label: 'Tasbih', icon: 'beads', primary: false },
  { href: 'names.html', label: '99 Names of Allah', icon: 'sparkle', primary: false },
  { href: 'zakat.html', label: 'Zakat Calculator', icon: 'coin', primary: false },
  // Info pages (in "More" dropdown)
  { href: 'upgrade.html', label: 'Upgrade AI ⚡', icon: 'sparkle', primary: false, section: 'info' },
  { href: 'about.html', label: 'About Us', icon: 'crescent', primary: false, section: 'info' },
  { href: 'contact.html', label: 'Contact', icon: 'phone', primary: false, section: 'info' },
  { href: 'privacy.html', label: 'Privacy Policy', icon: 'shield', primary: false, section: 'info' }
];

function buildNavbar(activePage) {
  const isPagesDir = window.location.pathname.includes('/pages/');
  const homeHref = isPagesDir ? '../index.html' : 'index.html';
  const prefix = isPagesDir ? '' : 'pages/';

  // Primary nav items
  const primaryItems = navItems.filter(i => i.primary);
  const secondaryFeatures = navItems.filter(i => !i.primary && i.section !== 'info');
  const infoItems = navItems.filter(i => i.section === 'info');

  const primaryHtml = primaryItems.map(item => {
    const active = activePage === item.href ? ' class="active"' : '';
    const badge = item.badge ? ` <span style="background:var(--gold); color:white; padding:0.1rem 0.4rem; border-radius:999px; font-size:0.6rem; font-weight:800; margin-left:0.2rem;">${item.badge}</span>` : '';
    return `<li><a href="${prefix}${item.href}"${active}>${item.label}${badge}</a></li>`;
  }).join('');

  const moreFeaturesHtml = secondaryFeatures.map(item => {
    const active = activePage === item.href ? ' class="active"' : '';
    return `<a href="${prefix}${item.href}"${active} class="dropdown-item">
      <i data-icon="${item.icon}" data-size="18"></i>
      <span>${item.label}</span>
    </a>`;
  }).join('');

  const moreInfoHtml = infoItems.map(item => {
    const active = activePage === item.href ? ' class="active"' : '';
    return `<a href="${prefix}${item.href}"${active} class="dropdown-item">
      <i data-icon="${item.icon}" data-size="18"></i>
      <span>${item.label}</span>
    </a>`;
  }).join('');

  return `
    <nav class="navbar">
      <div class="nav-container">
        <a href="${homeHref}" class="nav-logo">
          <div class="nav-logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </div>
          <span class="nav-logo-text">Noor-ul-Iman</span>
        </a>
        <ul class="nav-links" id="navLinks">
          <li><a href="${homeHref}"${activePage === 'index.html' ? ' class="active"' : ''}>Home</a></li>
          ${primaryHtml}
          <li class="nav-dropdown">
            <button class="nav-dropdown-trigger" onclick="toggleNavDropdown(event)">
              <span>More</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="nav-dropdown-menu">
              <div class="dropdown-section-label">More Features</div>
              ${moreFeaturesHtml}
              <div class="dropdown-divider"></div>
              <div class="dropdown-section-label">About Us</div>
              ${moreInfoHtml}
              <div class="dropdown-divider"></div>
              <a href="${prefix}support.html"${activePage === 'support.html' ? ' class="active"' : ''} class="dropdown-item dropdown-item-cta">
                <i data-icon="heart" data-size="18"></i>
                <span>Support Us ❤</span>
              </a>
            </div>
          </li>
          <li><a href="${prefix}support.html" class="nav-cta ${activePage === 'support.html' ? 'active' : ''}">
            <i data-icon="heart" data-size="14"></i>
            <span>Support</span>
          </a></li>
        </ul>
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme"><i data-icon="moon"></i></button>
          <button class="menu-toggle" id="menuToggle" aria-label="Menu"><i data-icon="menu"></i></button>
        </div>
      </div>
    </nav>
  `;
}

function buildFooter() {
  const isPagesDir = window.location.pathname.includes('/pages/');
  const prefix = isPagesDir ? '' : 'pages/';
  const homeHref = isPagesDir ? '../index.html' : 'index.html';

  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3 style="display:inline-flex; align-items:center; gap:0.5rem;">
            <i data-icon="crescent" data-size="28"></i>
            <span>Noor-ul-Iman</span>
          </h3>
          <p>The most beautifully designed Islamic app for the modern Muslim. Quran, prayer, and remembrance — all in one place. Free forever, made with love for the Ummah.</p>
          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <a href="${prefix}contact.html" style="background:rgba(255,255,255,0.1); padding:0.5rem; border-radius:50%; color:white; transition:all 0.2s;" title="Contact"><i data-icon="phone" data-size="16"></i></a>
            <a href="https://github.com/muhtamim/Noor-ul-Iman" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.1); padding:0.5rem; border-radius:50%; color:white;" title="GitHub"><i data-icon="book" data-size="16"></i></a>
            <a href="${prefix}support.html" style="background:rgba(245, 158, 11, 0.3); padding:0.5rem; border-radius:50%; color:var(--gold-light);" title="Support"><i data-icon="heart" data-size="16"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Features</h4>
          <ul>
            <li><a href="${prefix}quran.html">Quran</a></li>
            <li><a href="${prefix}learn.html">Learn</a></li>
            <li><a href="${prefix}prayer.html">Prayer Times</a></li>
            <li><a href="${prefix}ramadan.html">Ramadan</a></li>
            <li><a href="${prefix}live.html">Live Makkah</a></li>
            <li><a href="${prefix}qibla.html">Qibla</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>More</h4>
          <ul>
            <li><a href="${prefix}duas.html">Duas</a></li>
            <li><a href="${prefix}hadith.html">Hadith</a></li>
            <li><a href="${prefix}tasbih.html">Tasbih</a></li>
            <li><a href="${prefix}names.html">99 Names</a></li>
            <li><a href="${prefix}zakat.html">Zakat</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="${prefix}about.html">About Us</a></li>
            <li><a href="${prefix}contact.html">Contact</a></li>
            <li><a href="${prefix}privacy.html">Privacy Policy</a></li>
            <li><a href="${prefix}support.html">Support Us ❤</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Noor-ul-Iman — Made with love for the Ummah</p>
        <p class="quote">"And whoever relies upon Allah — then He is sufficient for him." — Quran 65:3</p>
      </div>
    </footer>
  `;
}

function toggleNavDropdown(e) {
  e.stopPropagation();
  const dropdown = e.currentTarget.closest('.nav-dropdown');
  dropdown.classList.toggle('open');
  // Close other dropdowns
  document.querySelectorAll('.nav-dropdown.open').forEach(d => {
    if (d !== dropdown) d.classList.remove('open');
  });
}

// Close dropdown on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
});

// Inject navbar & footer
document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('navbar-mount');
  const footerMount = document.getElementById('footer-mount');

  // Detect active page from URL
  const pathname = window.location.pathname;
  const activePage = pathname.split('/').pop() || 'index.html';

  if (navMount) {
    navMount.outerHTML = buildNavbar(activePage);
  }
  if (footerMount) {
    footerMount.outerHTML = buildFooter();
  }

  // Re-inject icons in the newly added markup
  if (window.injectIcons) window.injectIcons();

  // Wire up theme toggle on injected navbar
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (window.Icons) {
      const iconName = savedTheme === 'dark' ? 'sun' : 'moon';
      themeToggle.innerHTML = window.Icons[iconName].replace('<svg', '<svg width="20" height="20" class="icon"');
    }
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (window.Icons) {
        const iconName = next === 'dark' ? 'sun' : 'moon';
        themeToggle.innerHTML = window.Icons[iconName].replace('<svg', '<svg width="20" height="20" class="icon"');
      }
    });
  }

  // Wire up mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});

window.toggleNavDropdown = toggleNavDropdown;
