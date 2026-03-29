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
        const sentinel = document.createElement('span');
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.style.cssText = 'position:absolute;top:500px;height:1px;width:1px;pointer-events:none';
        document.body.prepend(sentinel);

        new IntersectionObserver(([entry]) => {
            this.button.classList.toggle('visible', !entry.isIntersecting);
        }).observe(sentinel);

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
