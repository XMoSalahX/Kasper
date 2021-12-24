var cacheName = "kasperWPA"
var DataCacheName = "kasper-WPA-Data"
var filesToCache = [

    'index.html',
    'CSS/main.css',
    'js/app.js',
    'CSS/all.min.css',
    'CSS/main-now.css',
    'CSS/media.css',
    'sw.js',
    "Images/about.png",
    "Images/awesome-video.mp4",
    "Images/design-features.webp",
    "Images/Icon.png",
    "Images/landing.webp",
    "Images/logo.png",
    "Images/mobile.png",
    "Images/quote.webp",
    "Images/shuffle-01.webp",
    "Images/shuffle-02.webp",
    "Images/shuffle-03.webp",
    "Images/shuffle-04.webp",
    "Images/shuffle-05.webp",
    "Images/shuffle-06.jpg",
    "Images/shuffle-07.webp",
    "Images/shuffle-08.webp",
    "Images/skills-01.jpg",
    "Images/skills-02.jpg",
    "Images/stats.webp",
    "Images/subscribe.webp",
    "webfonts/fa-brands-400.eot",
    "webfonts/fa-brands-400.svg",
    "webfonts/fa-brands-400.ttf",
    "webfonts/fa-brands-400.woff",
    "webfonts/fa-brands-400.woff2",
    "webfonts/fa-regular-400.eot",
    "webfonts/fa-regular-400.svg",
    "webfonts/fa-regular-400.ttf",
    "webfonts/fa-regular-400.woff",
    "webfonts/fa-regular-400.woff2",
    "webfonts/fa-solid-900.eot",
    "webfonts/fa-solid-900.svg",
    "webfonts/fa-solid-900.ttf",
    "webfonts/fa-solid-900.woff",
    "webfonts/fa-solid-900.woff2",
]


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






self.addEventListener('fetch', (e) => {
    e.respondWith((async() => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
            return r;
        }
        fetch(e.request)
            .then(function(response) {

                return caches.open(cacheName).then(function(cache) {

                    cache.put(e.request.url, response.clone());

                    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
                    return response;
                });
            })




    })());
});