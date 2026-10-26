export function loadTallyEmbed() {
    const iframe = document.querySelector('iframe[data-tally-src]');
    if (!iframe) return;

    const startEmbed = () => {
        const tally = globalThis.Tally;
        if (tally) {
            tally.loadEmbeds();
        } else if (!iframe.src) {
            iframe.src = iframe.dataset.tallySrc;
        }
    };

    const loadEmbed = () => {
        iframe.addEventListener('load', () => {
            iframe.parentElement.dataset.loaded = 'true';
        }, { once: true });

        if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
            startEmbed();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = startEmbed;
        script.onerror = () => console.error('[script-loader] Failed to load Tally embed');
        document.body.appendChild(script);
    };

    if ('IntersectionObserver' in globalThis) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadEmbed();
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        observer.observe(iframe);
    } else {
        loadEmbed();
    }
}
