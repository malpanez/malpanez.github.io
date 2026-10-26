export class ThemeSwitch {
    constructor() {
        this.root = document.documentElement;
        this.button = document.querySelector('.theme');
        if (!this.button) return;

        this.media = globalThis.matchMedia('(prefers-color-scheme: dark)');
        this.apply(this.stored() || (this.media.matches ? 'dark' : 'light'));
        this.button.setAttribute('aria-label', 'Dark theme');
        this.button.hidden = false;
        this.button.addEventListener('click', () => this.toggle());
        this.media.addEventListener('change', (event) => {
            if (!this.stored()) {
                this.apply(event.matches ? 'dark' : 'light');
            }
        });
    }

    stored() {
        try {
            const theme = localStorage.getItem('theme');
            return theme === 'dark' || theme === 'light' ? theme : null;
        } catch {
            return null;
        }
    }

    remember(theme) {
        try {
            localStorage.setItem('theme', theme);
            return true;
        } catch {
            return false;
        }
    }

    apply(theme) {
        const dark = theme === 'dark';
        this.root.dataset.theme = theme;
        this.button.setAttribute('aria-pressed', String(dark));

        const ground = globalThis.getComputedStyle(this.root).getPropertyValue('--bg').trim();
        document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
            meta.setAttribute('content', ground);
        });
    }

    toggle() {
        const next = this.root.dataset.theme === 'dark' ? 'light' : 'dark';
        this.remember(next);

        const still = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (still || typeof document.startViewTransition !== 'function') {
            this.apply(next);
            return;
        }

        const box = this.button.getBoundingClientRect();
        this.root.style.setProperty('--vt-x', `${box.left + box.width / 2}px`);
        this.root.style.setProperty('--vt-y', `${box.top + box.height / 2}px`);
        this.root.classList.add('theme-swap');
        const transition = document.startViewTransition(() => this.apply(next));
        void transition.finished.finally(() => {
            this.root.classList.remove('theme-swap');
        });
    }
}
