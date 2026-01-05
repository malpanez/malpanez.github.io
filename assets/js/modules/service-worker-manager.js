export class ServiceWorkerManager {
    constructor() {
        this.init();
    }

    init() {
        if (!('serviceWorker' in navigator)) {
            return;
        }

        globalThis.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => this.handleRegistration(registration))
                .catch((error) => {
                    console.error('❌ Service Worker registration failed:', error);
                });
        });
    }

    handleRegistration(registration) {
        console.log('✅ Service Worker registered:', registration.scope);

        registration.addEventListener('updatefound', () => {
            this.handleUpdateFound(registration);
        });
    }

    handleUpdateFound(registration) {
        const newWorker = registration.installing;
        if (!newWorker) {
            return;
        }

        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 New Service Worker available, refresh to update');
            }
        });
    }
}
