const CACHE_NAME = 'checkin-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/checkin.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/logo-icon-192.png',
    '/logo-icon-512.png',
    'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=450,fit=crop,q=95/YKb6JqwEKrh8bXzQ/logo-topo-site-m7VbqxOj0LSozK7v.png' // A URL da sua logo
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
