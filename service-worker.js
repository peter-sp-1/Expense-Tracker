const CACHE_NAME = 'expense-tracker-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './img/budget_781760.png',
    './icons-512.png'
];

// Installing the service worker
self.addEventListener('install', event => {
    event.waitUntil (
        caches.open(CACHE_NAME).then(
            cache => {
                return cache.addAll(urlsToCache);
            }
        )
    );
});

// Fetching resources from cache/network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Updating the cache when new resources are available
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});