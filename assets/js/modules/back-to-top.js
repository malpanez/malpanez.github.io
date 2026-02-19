export class BackToTop {
    button = null;

    constructor() {
        this.init();
    }

    init() {
        this.createButton();
        this.attachListeners();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.innerHTML = '↑';
        document.body.appendChild(this.button);
    }

    attachListeners() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 500) {
                    this.button.classList.add('visible');
                } else {
                    this.button.classList.remove('visible');
                }
                scrollTimeout = null;
            }, 100);
        }, { passive: true });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
