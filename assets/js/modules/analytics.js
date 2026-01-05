export class Analytics {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.trackOutboundLinks();
        this.trackDownloads();
        this.trackCTAClicks();
    }

    track(eventName, eventData = {}) {
        const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
        if (dnt === '1' || dnt === 'yes') return;

        this.events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });

        if (window.plausible) {
            window.plausible(eventName, { props: eventData });
        }

        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('📊 Analytics Event:', eventName, eventData);
        }
    }

    trackOutboundLinks() {
        document.querySelectorAll('a[href^="http"]').forEach((link) => {
            if (!link.href.includes(window.location.hostname)) {
                link.addEventListener('click', () => {
                    this.track('Outbound Link', {
                        url: link.href,
                        text: link.textContent.trim()
                    });
                });
            }
        });
    }

    trackDownloads() {
        document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href*="download"]').forEach((link) => {
            link.addEventListener('click', () => {
                this.track('File Download', {
                    file: link.href.split('/').pop(),
                    url: link.href
                });
            });
        });
    }

    trackCTAClicks() {
        document.querySelectorAll('.cta-button, .project-button').forEach((button) => {
            button.addEventListener('click', () => {
                this.track('CTA Click', {
                    text: button.textContent.trim(),
                    url: button.href || 'inline'
                });
            });
        });
    }
}
