import { PRACTICUMS } from '/focus/focus.config.js';

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
          ${practicum.menu.map(item => `
            <li>
              <a href="${item.href}" data-key="${item.key}">
                ${escapeHtml(item.label)}
              </a>
            </li>
          `).join('')}
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

  dropdown.innerHTML = `
    <div class="practicum-dropdown-card">
      <div class="practicum-dropdown-section">
        <div class="practicum-dropdown-label">Текущий практикум</div>
        <div class="practicum-dropdown-current">✓ ${escapeHtml(practicum.shortTitle)}</div>
      </div>

      <div class="practicum-dropdown-section">
        <div class="practicum-dropdown-label">Другие</div>
        <div class="practicum-dropdown-links">
          ${practicum.related.map(item => `
            <a href="${item.href}" class="practicum-dropdown-link">
              ${escapeHtml(item.label)}
            </a>
          `).join('')}
        </div>
      </div>

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

  if (mode === 'account' || mode === 'practicum') {
    panel.innerHTML = `
      <nav class="account-menu">
        <ul class="account-menu-list">
          <li><a href="/focus/focus_index.html">Главная</a></li>
          <li><a href="/profile/profile.html">Мой профиль</a></li>
          <li><a href="#" id="logout-link">Выход</a></li>
        </ul>
      </nav>
    `;
    return;
  }

  panel.innerHTML = '';
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
  const logoutLink = document.getElementById('logout-link');

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
    rightPanel.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      if (link.id !== 'logout-link') {
        body.classList.remove('right-open');
      }
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();

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
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      body.classList.remove('left-open', 'right-open', 'practicum-dropdown-open');
    }
  });
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