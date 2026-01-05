export class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        if ('PerformanceObserver' in globalThis) {
            this.observeLCP();
            this.observeFID();
            this.observeCLS();
        }

        globalThis.addEventListener('beforeunload', () => this.report());
    }

    observeLCP() {
        const observer = new globalThis.PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries.at(-1);
            this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    observeFID() {
        const observer = new globalThis.PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                this.metrics.fid = entry.processingStart - entry.startTime;
            });
        });
        observer.observe({ entryTypes: ['first-input'] });
    }

    observeCLS() {
        let clsValue = 0;
        const observer = new globalThis.PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    this.metrics.cls = clsValue;
                }
            }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
    }

    report() {
        if (globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1') {
            console.log('⚡ Core Web Vitals:', {
                LCP: this.metrics.lcp ? `${Math.round(this.metrics.lcp)}ms` : 'N/A',
                FID: this.metrics.fid ? `${Math.round(this.metrics.fid)}ms` : 'N/A',
                CLS: this.metrics.cls ? this.metrics.cls.toFixed(3) : 'N/A'
            });
        }
    }
}
