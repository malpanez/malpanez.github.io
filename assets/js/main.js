/**
 * HomelabForge - Main JavaScript
 * Modern ES6+ features with progressive enhancement
 */
/* global Tally */

(function() {
    'use strict';

    // ============================================
    // Theme Management (Dark/Light Mode)
    // ============================================
    class ThemeManager {
        constructor() {
            this.storageAvailable = this.checkStorage();
            this.theme = this.getStoredTheme() || 'auto';
            this.button = null;
            this.init();
        }

        init() {
            this.applyTheme();
            this.createToggleButton();
            this.watchSystemTheme();
        }

        checkStorage() {
            try {
                const key = '__theme_test__';
                localStorage.setItem(key, '1');
                localStorage.removeItem(key);
                return true;
            } catch {
                return false;
            }
        }

        getStoredTheme() {
            if (!this.storageAvailable) return null;
            try {
                return localStorage.getItem('theme');
            } catch {
                return null;
            }
        }

        setStoredTheme(theme) {
            if (!this.storageAvailable) return;
            try {
                localStorage.setItem('theme', theme);
            } catch {
                // Ignore storage errors (e.g., blocked cookies)
            }
        }

        applyTheme() {
            if (this.theme === 'light') {
                document.body.classList.add('light-mode');
            } else if (this.theme === 'dark') {
                document.body.classList.remove('light-mode');
            } else {
                // Auto mode - follow system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.body.classList.toggle('light-mode', !prefersDark);
            }
        }

        createToggleButton() {
            this.button = document.createElement('button');
            this.button.className = 'theme-toggle';
            this.button.setAttribute('aria-label', 'Toggle theme');
            this.button.innerHTML = this.getIcon();
            this.button.addEventListener('click', () => this.toggle());
            document.body.appendChild(this.button);
        }

        getIcon() {
            const isDark = !document.body.classList.contains('light-mode');
            return `<span class="theme-toggle-icon">${isDark ? '☀️' : '🌙'}</span>`;
        }

        toggle() {
            const isLight = document.body.classList.contains('light-mode');

            if (isLight) {
                this.theme = 'dark';
                document.body.classList.remove('light-mode');
            } else {
                this.theme = 'light';
                document.body.classList.add('light-mode');
            }

            this.setStoredTheme(this.theme);
            this.button.innerHTML = this.getIcon();
        }

        watchSystemTheme() {
            if (this.theme === 'auto') {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    document.body.classList.toggle('light-mode', !e.matches);
                });
            }
        }
    }

    // ============================================
    // Scroll Reveal Animations
    // ============================================
    class ScrollReveal {
        constructor() {
            this.elements = document.querySelectorAll('.js-reveal');
            this.observer = null;
            this.init();
        }

        init() {
            // Check if user prefers reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.elements.forEach(el => el.style.opacity = '1');
                return;
            }

            // Add reveal class to elements
            this.elements.forEach(el => el.classList.add('reveal'));

            // Create Intersection Observer
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, options);

            // Observe all elements
            this.elements.forEach(el => this.observer.observe(el));
        }
    }

    // ============================================
    // Smooth Scroll Enhancement
    // ============================================
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        // Update URL without jumping
                        if (window.history && window.history.pushState) {
                            window.history.pushState(null, null, href);
                        }
                    }
                });
            });
        }
    }

    // ============================================
    // Analytics Tracking (Privacy-First)
    // ============================================
    class Analytics {
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
            // Only track if analytics is enabled (respect DNT)
            const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
            if (dnt === '1' || dnt === 'yes') return;

            this.events.push({
                name: eventName,
                data: eventData,
                timestamp: new Date().toISOString()
            });

            // Send to analytics if configured (Plausible, Simple Analytics, etc.)
            if (window.plausible) {
                window.plausible(eventName, { props: eventData });
            }

            // Console log in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('📊 Analytics Event:', eventName, eventData);
            }
        }

        trackOutboundLinks() {
            document.querySelectorAll('a[href^="http"]').forEach(link => {
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
            document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href*="download"]').forEach(link => {
                link.addEventListener('click', () => {
                    this.track('File Download', {
                        file: link.href.split('/').pop(),
                        url: link.href
                    });
                });
            });
        }

        trackCTAClicks() {
            document.querySelectorAll('.cta-button, .project-button').forEach(button => {
                button.addEventListener('click', () => {
                    this.track('CTA Click', {
                        text: button.textContent.trim(),
                        url: button.href || 'inline'
                    });
                });
            });
        }
    }

    // ============================================
    // Performance Monitoring
    // ============================================
    class PerformanceMonitor {
        constructor() {
            this.metrics = {};
            this.init();
        }

        init() {
            if ('PerformanceObserver' in window) {
                this.observeLCP();
                this.observeFID();
                this.observeCLS();
            }

            // Report on page unload
            window.addEventListener('beforeunload', () => this.report());
        }

        observeLCP() {
            const observer = new window.PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        observeFID() {
            const observer = new window.PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                });
            });
            observer.observe({ entryTypes: ['first-input'] });
        }

        observeCLS() {
            let clsValue = 0;
            const observer = new window.PerformanceObserver((list) => {
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
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('⚡ Core Web Vitals:', {
                    LCP: this.metrics.lcp ? `${Math.round(this.metrics.lcp)}ms` : 'N/A',
                    FID: this.metrics.fid ? `${Math.round(this.metrics.fid)}ms` : 'N/A',
                    CLS: this.metrics.cls ? this.metrics.cls.toFixed(3) : 'N/A'
                });
            }
        }
    }

    // ============================================
    // Service Worker Registration
    // ============================================
    class ServiceWorkerManager {
        constructor() {
            this.init();
        }

        init() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('✅ Service Worker registered:', registration.scope);

                            // Listen for updates
                            registration.addEventListener('updatefound', () => {
                                const newWorker = registration.installing;
                                newWorker.addEventListener('statechange', () => {
                                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                        console.log('🔄 New Service Worker available, refresh to update');
                                    }
                                });
                            });
                        })
                        .catch(error => {
                            console.error('❌ Service Worker registration failed:', error);
                            // Continue without PWA capabilities - not critical
                        });
                });
            }
        }
    }

    // ============================================
    // External Script Loader (Lazy Load)
    // ============================================
    class ScriptLoader {
        static loadTally() {
            const iframe = document.querySelector('iframe[data-tally-src]');
            if (!iframe) return;

            const loadEmbed = () => {
                if (!iframe.src) {
                    iframe.src = iframe.dataset.tallySrc;
                }

                if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
                    if (typeof Tally !== 'undefined') {
                        Tally.loadEmbeds();
                    }
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://tally.so/widgets/embed.js';
                script.onload = () => {
                    if (typeof Tally !== 'undefined') {
                        Tally.loadEmbeds();
                    }
                };
                document.body.appendChild(script);
            };

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
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
    }

    // ============================================
    // Card Animation Order
    // ============================================
    function setAnimationOrder() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    class BackToTop {
        constructor() {
            this.button = null;
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
                    if (window.pageYOffset > 500) {
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

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        try {
            // Set animation orders
            setAnimationOrder();

            // Update copyright year
            const yearEl = document.getElementById('current-year');
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear();
            }

            // Initialize modules
            new ThemeManager();
            new ScrollReveal();
            new SmoothScroll();
            new Analytics();
            new PerformanceMonitor();
            new ServiceWorkerManager();
            new BackToTop();

            // Lazy load external scripts
            ScriptLoader.loadTally();

            // Log initialization
            console.log('%c🔥 HomelabForge', 'font-size: 20px; font-weight: bold; color: #FF9900;');
            console.log('%cWebsite initialized successfully', 'color: #8b949e;');
        } catch (error) {
            console.error('Failed to initialize website:', error);
            // Continue anyway - page should still be usable
        }
    }

    // ============================================
    // DOM Ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
