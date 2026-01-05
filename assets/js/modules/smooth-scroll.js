export class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    globalThis.history?.pushState(null, null, href);
                }
            });
        });
    }
}
