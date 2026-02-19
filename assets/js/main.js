/**
 * HomelabForge - Main JavaScript
 * Modern ES6+ with progressive enhancement
 */
import { BackToTop } from './modules/back-to-top.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { ServiceWorkerManager } from './modules/service-worker-manager.js';
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
        new ServiceWorkerManager();
        new BackToTop();

        loadTallyEmbed();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
