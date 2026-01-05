export class ThemeManager {
    constructor() {
        this.storageAvailable = this.checkStorage();
        this.theme = this.getStoredTheme() || 'auto';
        this.button = null;
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggleButton();
        this.watchSystemTheme();
    }

    checkStorage() {
        try {
            const key = '__theme_test__';
            localStorage.setItem(key, '1');
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    getStoredTheme() {
        if (!this.storageAvailable) return null;
        try {
            return localStorage.getItem('theme');
        } catch {
            return null;
        }
    }

    setStoredTheme(theme) {
        if (!this.storageAvailable) return;
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Ignore storage errors (e.g., blocked cookies)
        }
    }

    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-mode');
        } else if (this.theme === 'dark') {
            document.body.classList.remove('light-mode');
        } else {
            const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('light-mode', !prefersDark);
        }
    }

    createToggleButton() {
        this.button = document.createElement('button');
        this.button.className = 'theme-toggle';
        this.button.setAttribute('aria-label', 'Toggle theme');
        this.button.innerHTML = this.getIcon();
        this.button.addEventListener('click', () => this.toggle());
        document.body.appendChild(this.button);
    }

    getIcon() {
        const isDark = !document.body.classList.contains('light-mode');
        return `<span class="theme-toggle-icon">${isDark ? '☀️' : '🌙'}</span>`;
    }

    toggle() {
        const isLight = document.body.classList.contains('light-mode');

        if (isLight) {
            this.theme = 'dark';
            document.body.classList.remove('light-mode');
        } else {
            this.theme = 'light';
            document.body.classList.add('light-mode');
        }

        this.setStoredTheme(this.theme);
        this.button.innerHTML = this.getIcon();
    }

    watchSystemTheme() {
        if (this.theme !== 'auto') {
            return;
        }

        const media = globalThis.matchMedia('(prefers-color-scheme: dark)');
        if (typeof media.addEventListener !== 'function') {
            return;
        }

        media.addEventListener('change', (e) => {
            document.body.classList.toggle('light-mode', !e.matches);
        });
    }
}
