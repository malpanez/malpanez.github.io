/* eslint-env serviceworker */
/* global Headers */
/**
 * HomelabForge Service Worker
 * Optimized for performance and offline capabilities
 */

const CACHE_VERSION = 'v2.1.0';
const CACHE_NAME = `homelabforge-${CACHE_VERSION}`;

// Assets to cache on install - keep minimal for fast SW install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/assets/css/styles.min.css',
    '/assets/js/main.js',
    '/assets/img/hero-logo-512.webp',
    '/assets/img/hero-logo-256.webp',
    '/assets/icons/favicon-32x32.png',
    '/assets/icons/icon-192x192.png',
    '/manifest.json'
];

// Cache strategies by file extension.
// CSS/JS use stale-while-revalidate: served instantly from cache, refreshed in the
// background, so a deploy lands on the next visit even though filenames are not
// content-hashed (see follow-up: build-time fingerprinting).
const CACHE_STRATEGIES = {
    staleWhileRevalidate: ['css', 'js'],
    cacheFirst: ['woff2', 'woff', 'ttf', 'eot', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'ico'],
    networkFirst: ['html']
};

/**
 * Install Event - Cache static assets
 */
globalThis.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => globalThis.skipWaiting()) // Activate immediately
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

/**
 * Activate Event - Clean up old caches
 */
globalThis.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('homelabforge-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => globalThis.clients.claim()) // Take control immediately
    );
});

/**
 * Fetch Event - Serve from cache with network fallback
 */
globalThis.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin and non-GET requests
    if (url.origin !== location.origin || request.method !== 'GET') {
        return;
    }

    // Navigations (e.g. "/", "/books/advanced-pam-course") have no file extension;
    // route them by request mode so the offline fallback actually works.
    if (request.mode === 'navigate') {
        event.respondWith(networkFirstStrategy(request));
        return;
    }

    const fileExtension = url.pathname.split('.').pop();

    if (CACHE_STRATEGIES.staleWhileRevalidate.includes(fileExtension)) {
        event.respondWith(staleWhileRevalidateStrategy(event));
    } else if (CACHE_STRATEGIES.cacheFirst.includes(fileExtension)) {
        event.respondWith(cacheFirstStrategy(request));
    } else if (CACHE_STRATEGIES.networkFirst.includes(fileExtension)) {
        event.respondWith(networkFirstStrategy(request));
    }
    // Everything else falls through to the network with no SW involvement.
});

/**
 * Stale-While-Revalidate - return cache immediately, refresh in background.
 * Best for: CSS/JS that are not content-hashed.
 */
async function staleWhileRevalidateStrategy(event) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);

    const fetchPromise = fetch(event.request)
        .then((response) => {
            if (response?.status === 200) {
                cache.put(event.request, response.clone());
            }
            return response;
        })
        .catch(() => cached);

    if (cached) {
        // Keep the SW alive long enough to finish the background refresh.
        event.waitUntil(fetchPromise);
        return cached;
    }

    return (await fetchPromise) || offlineResponse('text/plain');
}

/**
 * Cache First Strategy - Try cache, fallback to network.
 * Best for: images and fonts.
 */
async function cacheFirstStrategy(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }

        const response = await fetch(request);
        if (response?.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('[SW] Cache-first strategy failed:', error);
        const offlinePage = await cache.match('/offline.html');
        return offlinePage || offlineResponse('text/plain');
    }
}

/**
 * Network First Strategy - Try network, fallback to cache, then offline page.
 * Best for: HTML documents and navigations.
 */
async function networkFirstStrategy(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await fetch(request);
        if (response?.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        console.log('[SW] Network failed, serving from cache:', request.url);

        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }

        const offlinePage = await cache.match('/offline.html');
        return offlinePage || offlineResponse('text/html');
    }
}

/**
 * Minimal offline response used when nothing is cached.
 */
function offlineResponse(contentType) {
    return new Response('Offline - Content not available', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({ 'Content-Type': contentType })
    });
}

/**
 * Message Handler - allow the page to trigger an immediate SW update.
 */
globalThis.addEventListener('message', (event) => {
    const verifyMessageOrigin = async () => {
        if (event.origin) {
            return event.origin === globalThis.location.origin;
        }

        if (event.source?.id) {
            const client = await clients.get(event.source.id);
            if (!client?.url) {
                return false;
            }
            return new URL(client.url).origin === globalThis.location.origin;
        }

        return false;
    };

    event.waitUntil((async () => {
        if (!(await verifyMessageOrigin())) {
            return;
        }

        if (event.data?.type === 'SKIP_WAITING') {
            globalThis.skipWaiting();
        }
    })());
});
