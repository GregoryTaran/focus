function renderFocusTopbar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  topbar.innerHTML = `
    <div class="topbar-inner account-mode">
      <div></div>

      <div class="logo">
        <img src="/assets/logo400.jpg" alt="FOCUS" />
      </div>

      <button class="right-menu-toggle" id="right-menu-toggle">☰</button>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  renderFocusTopbar();
});