import { OPEN_MENU, ACCOUNT_MENU, PRACTICUMS } from '/focus/focus.config.js';

function renderLayout() {
  const mode = document.body.dataset.layout || 'public';
  const practicum = getCurrentPracticum();

  renderTopbar(mode, practicum);
  renderLeftPanel(mode, practicum);
  renderPracticumDropdown(mode, practicum);
  renderRightPanel(mode);
  initControls(mode);
}

function getCurrentPracticum() {
  const path = window.location.pathname.toLowerCase();
  const parts = path.split('/').filter(Boolean);

  const focusIndex = parts.indexOf('focus');
  if (focusIndex === -1) return null;

  const slug = parts[focusIndex + 1];
  if (!slug || !PRACTICUMS[slug]) return null;

  return PRACTICUMS[slug];
}

// ======================
// TOPBAR
// ======================

function renderTopbar(mode, practicum) {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

if (mode === 'open') {
  topbar.innerHTML = `
    <div class="topbar-inner account-mode">
      <div class="topbar-brand">
        <a href="/focus/open/index.html" class="logo-link">
          <div class="logo-text">HABI FOCUS SYSTEM™</div>
        </a>
      </div>

      <div class="topbar-right">
        <button class="menu-icon-btn" id="right-menu-toggle" aria-label="Открыть меню сайта">
          ☰
        </button>
      </div>
    </div>
  `;
  return;
}

if (mode === 'account') {
  topbar.innerHTML = `
    <div class="topbar-inner account-mode">
      <div class="topbar-brand">
        <div class="logo-text">HABI FOCUS SYSTEM™</div>
      </div>

      <div class="topbar-right">
        <button class="menu-icon-btn" id="right-menu-toggle" aria-label="Открыть меню пользователя">
          ☰
        </button>
      </div>
    </div>
  `;
  return;
}

  if (mode === 'practicum' && practicum) {
    topbar.innerHTML = `
      <div class="topbar-inner practicum-mode">
        <div class="topbar-left">
          <button class="menu-icon-btn" id="left-menu-toggle" aria-label="Открыть меню практикума">
            ☰
          </button>
        </div>

        <div class="topbar-center">
          <button class="practicum-switcher" id="practicum-switcher-toggle" aria-label="Выбрать практикум">
            <span class="practicum-switcher-text">${escapeHtml(practicum.shortTitle)}</span>
            <span class="practicum-switcher-arrow">▾</span>
          </button>
        </div>

        <div class="topbar-right">
          <button class="menu-icon-btn" id="right-menu-toggle" aria-label="Открыть меню пользователя">
            ☰
          </button>
        </div>
      </div>
    `;
    return;
  }

  topbar.innerHTML = '';
}

// ======================
// LEFT PANEL
// ======================

function renderLeftPanel(mode, practicum) {
  const panel = document.getElementById('left-panel');
  if (!panel) return;

  if (mode !== 'practicum' || !practicum) {
    panel.innerHTML = '';
    return;
  }

  panel.innerHTML = `
    <div class="left-panel-inner">
      <div class="left-panel-title">${escapeHtml(practicum.title)}</div>

      <nav class="practicum-menu">
        <ul class="practicum-menu-list">
          ${renderMenuItems(practicum.menu)}
        </ul>
      </nav>
    </div>
  `;

  highlightActiveLeftMenu();
}

function highlightActiveLeftMenu() {
  let currentPath = location.pathname.toLowerCase();
  if (currentPath === '/') currentPath = '/index.html';

  document.querySelectorAll('.practicum-menu a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const hrefPath = new URL(a.href, location.origin).pathname.toLowerCase();
    a.classList.toggle('is-active', hrefPath === currentPath);
  });
}

// ======================
// PRACTICUM DROPDOWN
// ======================

function renderPracticumDropdown(mode, practicum) {
  const dropdown = document.getElementById('practicum-dropdown');
  if (!dropdown) return;

  if (mode !== 'practicum' || !practicum) {
    dropdown.innerHTML = '';
    return;
  }

  const relatedLinks = Array.isArray(practicum.related) ? practicum.related : [];

  dropdown.innerHTML = `
    <div class="practicum-dropdown-card">
      <div class="practicum-dropdown-section">
        <div class="practicum-dropdown-label">Текущий практикум</div>
        <div class="practicum-dropdown-current">✓ ${escapeHtml(practicum.shortTitle)}</div>
      </div>

      ${
        relatedLinks.length
          ? `
      <div class="practicum-dropdown-section">
        <div class="practicum-dropdown-label">Другие</div>
        <div class="practicum-dropdown-links">
          ${relatedLinks.map(item => `
            <a href="${item.href}" class="practicum-dropdown-link">
              ${escapeHtml(item.label)}
            </a>
          `).join('')}
        </div>
      </div>
      `
          : ''
      }

      <div class="practicum-dropdown-section">
        <a href="/focus/focus_index.html" class="practicum-dropdown-link practicum-dropdown-all">
          Перейти к выбору
        </a>
      </div>
    </div>
  `;
}

// ======================
// RIGHT PANEL
// ======================

function renderRightPanel(mode) {
  const panel = document.getElementById('right-panel');
  if (!panel) return;

  let menuItems = [];
  let navClass = 'account-menu';

  if (mode === 'open') {
    menuItems = OPEN_MENU;
    navClass = 'account-menu open-menu';
  } else if (mode === 'account' || mode === 'practicum') {
    menuItems = ACCOUNT_MENU;
    navClass = 'account-menu account-nav-menu';
  }

  if (!menuItems.length) {
    panel.innerHTML = '';
    return;
  }

  panel.innerHTML = `
    <nav class="${navClass}">
      <ul class="account-menu-list">
        ${renderMenuItems(menuItems)}
      </ul>
    </nav>
  `;

  highlightRightMenu();
}

function highlightRightMenu() {
  let currentPath = location.pathname.toLowerCase();
  if (currentPath === '/') currentPath = '/index.html';

  document.querySelectorAll('#right-panel .account-menu-list a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const hrefPath = new URL(a.href, location.origin).pathname.toLowerCase();
    a.classList.toggle('is-active', hrefPath === currentPath);
  });
}

function renderMenuItems(items) {
  return items.map(item => {
    const actionAttr = item.action ? ` data-action="${escapeHtml(item.action)}"` : '';
    return `
      <li>
        <a href="${item.href}"${actionAttr}>
          ${escapeHtml(item.label)}
        </a>
      </li>
    `;
  }).join('');
}

// ======================
// CONTROLS
// ======================

function initControls(mode) {
  const body = document.body;

  const leftBtn = document.getElementById('left-menu-toggle');
  const rightBtn = document.getElementById('right-menu-toggle');
  const switcherBtn = document.getElementById('practicum-switcher-toggle');
  const leftOverlay = document.getElementById('left-overlay');
  const rightOverlay = document.getElementById('right-overlay');
  const dropdownOverlay = document.getElementById('practicum-dropdown-overlay');
  const rightPanel = document.getElementById('right-panel');

  if (leftBtn && mode === 'practicum') {
    leftBtn.addEventListener('click', () => {
      body.classList.remove('right-open', 'practicum-dropdown-open');
      body.classList.toggle('left-open');
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      body.classList.remove('left-open', 'practicum-dropdown-open');
      body.classList.toggle('right-open');
    });
  }

  if (switcherBtn && mode === 'practicum') {
    switcherBtn.addEventListener('click', () => {
      body.classList.remove('left-open', 'right-open');
      body.classList.toggle('practicum-dropdown-open');
    });
  }

  if (leftOverlay) {
    leftOverlay.addEventListener('click', () => {
      body.classList.remove('left-open');
    });
  }

  if (rightOverlay) {
    rightOverlay.addEventListener('click', () => {
      body.classList.remove('right-open');
    });
  }

  if (dropdownOverlay) {
    dropdownOverlay.addEventListener('click', () => {
      body.classList.remove('practicum-dropdown-open');
    });
  }

  if (rightPanel) {
    rightPanel.addEventListener('click', async (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const action = link.dataset.action;

      if (action === 'logout') {
        e.preventDefault();
        await handleLogout();
        return;
      }

      body.classList.remove('right-open');
    });

    initRightPanelSwipe(rightPanel, body);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      body.classList.remove('left-open', 'right-open', 'practicum-dropdown-open');
    }
  });
}

async function handleLogout() {
  try {
    if (window.SV_LOGOUT) {
      await window.SV_LOGOUT();
      return;
    }

    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.warn('Logout error:', err);
  }

  location.href = '/index.html';
}

function initRightPanelSwipe(panel, body) {
  let startX = 0;
  let startY = 0;
  let isTracking = false;

  panel.addEventListener('touchstart', (e) => {
    if (!body.classList.contains('right-open')) return;
    if (!e.touches || !e.touches.length) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isTracking = true;
  }, { passive: true });

  panel.addEventListener('touchmove', (e) => {
    if (!isTracking || !e.touches || !e.touches.length) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = currentX - startX;
    const diffY = currentY - startY;

    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
    const isSwipeLeft = diffX < -40;

    if (isHorizontalSwipe && isSwipeLeft) {
      body.classList.remove('right-open');
      isTracking = false;
    }
  }, { passive: true });

  panel.addEventListener('touchend', () => {
    isTracking = false;
  }, { passive: true });

  panel.addEventListener('touchcancel', () => {
    isTracking = false;
  }, { passive: true });
}

// ======================
// HELPERS
// ======================

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ======================
// INIT
// ======================

window.addEventListener('DOMContentLoaded', () => {
  renderLayout();
});