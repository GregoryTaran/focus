function renderAccountMenu() {
  const rightPanel = document.getElementById('right-panel');
  if (!rightPanel) return;

  rightPanel.innerHTML = `
    <nav class="account-menu">
      <ul class="account-menu-list">
        <li><a href="/focus/focus_index.html">Главная</a></li>
        <li><a href="/profile/profile.html">Мой профиль</a></li>
        <li><a href="/focus/focus_index.html">Выбор практикума</a></li>
        <li><a href="#" id="account-logout-link">Выйти</a></li>
      </ul>
    </nav>
  `;
}

function initAccountMenu() {
  const body = document.body;
  const openBtn = document.getElementById('right-menu-toggle');
  const rightOverlay = document.getElementById('right-overlay');
  const rightPanel = document.getElementById('right-panel');

  if (!openBtn || !rightOverlay || !rightPanel) {
    console.warn('Account menu init failed: elements not found');
    return;
  }

  renderAccountMenu();

  openBtn.addEventListener('click', () => {
    body.classList.toggle('right-open');
  });

  rightOverlay.addEventListener('click', () => {
    body.classList.remove('right-open');
  });

  rightPanel.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    if (link.id === 'account-logout-link') {
      e.preventDefault();

      if (window.SV_LOGOUT) {
        window.SV_LOGOUT();
      } else {
        location.href = '/index.html';
      }
      return;
    }

    body.classList.remove('right-open');
  });

  console.log('Account menu initialized');
}

window.addEventListener('DOMContentLoaded', () => {
  initAccountMenu();
});