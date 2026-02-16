const CACHE_NAME = "pwa-cache-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png"
];

// INSTALL
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching app shell");
            return cache.addAll(urlsToCache);
        })
    );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
    console.log("Service Worker activated");
});

// FETCH (most important)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // return cached version
            }
            return fetch(event.request); // else fetch from network
        })
    );
});
