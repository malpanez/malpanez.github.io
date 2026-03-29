export function loadTallyEmbed() {
    const iframe = document.querySelector('iframe[data-tally-src]');
    if (!iframe) return;

    const loadEmbed = () => {
        if (!iframe.src) {
            iframe.src = iframe.dataset.tallySrc;
        }

        if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
            const tally = globalThis.Tally;
            if (tally) {
                tally.loadEmbeds();
            }
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
            const tally = globalThis.Tally;
            if (tally) {
                tally.loadEmbeds();
            }
        };
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
