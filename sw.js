var cacheName = "kasperWPA"
var DataCacheName = "kasper-WPA-Data"
var filesToCache = []
var kasperUrl = "https://xmosalahx.github.io/Kasper/"

self.addEventListener("install", function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener("activate", function(e) {
    e.waitUntil(
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== DataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key)
                }
            }))
        })
    )
})



self.addEventListener('fetch', function(e) {
    if (e.request.url.startsWith(kasperUrl)) {
        e.respondWith(
            fetch(e.request)
            .then(function(response) {
                return caches.open(DataCacheName).then(function(cache) {
                    cache.put(e.request.url, response.clone());
                    console.log('[ServiceWorker] Fetched & Cached', e.request.url);
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                console.log('[ServiceWorker] Fetch Only', e.request.url);
                return response || fetch(e.request);
            })
        );
    }
});