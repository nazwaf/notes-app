class HeaderBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initTheme();
  }

  render() {
    this.innerHTML = `
      <header class="main-header">
        <div class="header-logo">
          <span class="material-symbols-outlined">event_note</span>
          <span class="brand-name">Notes App</span>
        </div>
        
        <div class="header-actions">
          <div class="search-wrapper">
            <span class="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              id="search-input"
              placeholder="Cari catatan..."
            />
          </div>

          <nav class="nav-buttons">
            <button id="show-dashboard" class="btn-nav active" title="Dashboard">
              <span class="material-symbols-outlined">dashboard</span>
              <span class="btn-text">Dashboard</span>
            </button>
            <button id="show-archived" class="btn-nav" title="Arsip">
              <span class="material-symbols-outlined">archive</span>
              <span class="btn-text">Archived</span>
            </button>
            <button id="toggle-theme" class="btn-theme" title="Ganti Tema">
              <span class="material-symbols-outlined theme-icon">dark_mode</span>
            </button>
          </nav>
        </div>
      </header>
    `;
  }

  initTheme() {
    const toggleThemeButton = this.querySelector('#toggle-theme');
    const icon = toggleThemeButton.querySelector('.theme-icon');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      icon.textContent = 'light_mode';
    }

    toggleThemeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      icon.textContent = isDark ? 'light_mode' : 'dark_mode';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

customElements.define('header-bar', HeaderBar);