/**
 * HomelabForge - Main JavaScript
 * Modern ES6+ features with progressive enhancement
 */
import { Analytics } from './modules/analytics.js';
import { BackToTop } from './modules/back-to-top.js';
import { PerformanceMonitor } from './modules/performance-monitor.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { ServiceWorkerManager } from './modules/service-worker-manager.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { ThemeManager } from './modules/theme-manager.js';
import { setAnimationOrder } from './modules/animation-order.js';
import { loadTallyEmbed } from './modules/script-loader.js';

function init() {
    try {
        setAnimationOrder();

        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }

        new ThemeManager();
        new ScrollReveal();
        new SmoothScroll();
        new Analytics();
        new PerformanceMonitor();
        new ServiceWorkerManager();
        new BackToTop();

        loadTallyEmbed();

        console.log('%c🔥 HomelabForge', 'font-size: 20px; font-weight: bold; color: #FF9900;');
        console.log('%cWebsite initialized successfully', 'color: #8b949e;');
    } catch (error) {
        console.error('Failed to initialize website:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
