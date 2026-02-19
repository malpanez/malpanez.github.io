/* eslint-env serviceworker */
/* global Headers */
/**
 * HomelabForge Service Worker
 * Optimized for performance and offline capabilities
 */

const CACHE_VERSION = 'v2.0.0';
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

// Cache strategies
const CACHE_STRATEGIES = {
    cacheFirst: ['css', 'js', 'woff2', 'woff', 'ttf', 'eot', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'ico'],
    networkFirst: ['html'],
    networkOnly: ['api']
};

const STATIC_CACHE_HEADER = 'public, max-age=31536000, immutable';

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

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Determine cache strategy based on file extension
    const fileExtension = url.pathname.split('.').pop();
    const strategy = getStrategy(fileExtension);

    event.respondWith(
        strategy(request)
    );
});

/**
 * Get appropriate cache strategy for file type
 */
function getStrategy(fileExtension) {
    if (CACHE_STRATEGIES.cacheFirst.includes(fileExtension)) {
        return cacheFirstStrategy;
    } else if (CACHE_STRATEGIES.networkFirst.includes(fileExtension)) {
        return networkFirstStrategy;
    } else {
        return networkOnlyStrategy;
    }
}

/**
 * Cache First Strategy - Try cache, fallback to network
 * Best for: CSS, JS, images, fonts
 */
async function cacheFirstStrategy(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);

        if (cached) {
            return addCacheHeaders(cached);
        }

        const response = await fetch(request);

        // Cache successful responses
        if (response?.status === 200) {
            cache.put(request, response.clone());
            return addCacheHeaders(response);
        }

        return response;
    } catch (error) {
        console.error('[SW] Cache-first strategy failed:', error);

        // Try to get from cache as fallback
        try {
            const cache = await caches.open(CACHE_NAME);
            const offlinePage = await cache.match('/offline.html');
            if (offlinePage) {
                return offlinePage;
            }
        } catch (cacheError) {
            console.error('[SW] Failed to retrieve offline page:', cacheError);
        }

        // Return basic offline response
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
    }
}

/**
 * Ensure cached assets carry long-lived cache headers
 */
function addCacheHeaders(response) {
    if (!response) return response;

    const headers = new Headers(response.headers);

    // Only add cache headers if not already present
    if (!headers.has('Cache-Control')) {
        headers.set('Cache-Control', STATIC_CACHE_HEADER);
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}

/**
 * Network First Strategy - Try network, fallback to cache
 * Best for: HTML pages
 */
async function networkFirstStrategy(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch(request);

        // Cache successful responses
        if (response?.status === 200) {
            cache.put(request, response.clone());
        }

        return response;
    } catch {
        console.log('[SW] Network failed, serving from cache:', request.url);

        try {
            const cache = await caches.open(CACHE_NAME);
            const cached = await cache.match(request);
            if (cached) {
                return cached;
            }

            // Return offline page if available
            const offlinePage = await cache.match('/offline.html');
            if (offlinePage) {
                return offlinePage;
            }
        } catch (cacheError) {
            console.error('[SW] Cache retrieval failed:', cacheError);
        }

        // Return basic offline response
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/html'
            })
        });
    }
}

/**
 * Network Only Strategy - Always fetch from network
 * Best for: API calls, dynamic content
 */
async function networkOnlyStrategy(request) {
    return fetch(request);
}

/**
 * Background Sync for offline form submissions (if needed)
 */
globalThis.addEventListener('sync', (event) => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncForms());
    }
});

async function syncForms() {
    // Placeholder for future implementation
    console.log('[SW] Syncing offline form submissions');
}

/**
 * Push Notifications (optional)
 */
globalThis.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};

    const options = {
        body: data.body || 'New update from HomelabForge',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-192x192.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        globalThis.registration.showNotification(data.title || 'HomelabForge', options)
    );
});

/**
 * Notification Click Handler
 */
globalThis.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

/**
 * Message Handler - Communicate with clients
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

        if (event.data?.type === 'CACHE_URLS' && Array.isArray(event.data.urls)) {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(event.data.urls);
        }
    })());
});
