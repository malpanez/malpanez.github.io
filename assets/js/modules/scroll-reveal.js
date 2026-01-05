export class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.js-reveal');
        this.observer = null;
        this.init();
    }

    init() {
        if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.elements.forEach((el) => {
                el.style.opacity = '1';
            });
            return;
        }

        this.elements.forEach((el) => el.classList.add('reveal'));

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach((el) => this.observer.observe(el));
    }
}
