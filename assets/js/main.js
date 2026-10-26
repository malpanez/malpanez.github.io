/**
 * HomelabForge - Main JavaScript
 * Modern ES6+ with progressive enhancement
 */
import { ServiceWorkerManager } from './modules/service-worker-manager.js';
import { ThemeSwitch } from './modules/theme-switch.js';
import { loadTallyEmbed } from './modules/script-loader.js';
import { showLastPush, startClocks } from './modules/live.js';

function init() {
    try {
        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }

        new ThemeSwitch();
        new ServiceWorkerManager();

        startClocks();
        showLastPush();
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
