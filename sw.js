// ====== Service Worker for Noor-ul-Iman ======
// Provides offline support and caching

const CACHE_VERSION = 'noor-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // CSS
  '/css/style.css',
  '/css/pages.css',
  // Core JS
  '/js/app.js',
  '/js/icons.js',
  '/js/layout.js',
  '/js/azan.js',
  '/js/quran.js',
  '/js/ramadan.js',
  '/js/tasbih.js',
  '/js/qibla.js',
  '/js/duas.js',
  '/js/names.js',
  '/js/zakat.js',
  // Data files
  '/data/daily.js',
  '/data/duas.js',
  '/data/names.js',
  '/data/hadith.js',
  '/data/azan-dua.js',
  '/data/translations.js',
  '/data/learn.js',
  '/data/monetization.js',
  // Feature pages
  '/pages/quran.html',
  '/pages/learn.html',
  '/pages/prayer.html',
  '/pages/qibla.html',
  '/pages/tasbih.html',
  '/pages/duas.html',
  '/pages/names.html',
  '/pages/zakat.html',
  '/pages/ramadan.html',
  '/pages/live.html',
  '/pages/hadith.html',
  // Info pages
  '/pages/support.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/privacy.html'
];

// Install: cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.log('SW: Some assets failed to cache', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => !k.startsWith(CACHE_VERSION))
            .map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache-first for static, network-first for API
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other schemes
  if (!url.protocol.startsWith('http')) return;

  // API calls (aladhan, alquran.cloud) — network-first
  if (url.hostname.includes('aladhan.com') ||
      url.hostname.includes('alquran.cloud') ||
      url.hostname.includes('islamic.network') ||
      url.hostname.includes('nominatim')) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(DYNAMIC_CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets — cache-first
  e.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).then(res => {
        if (res.ok && url.origin === location.origin) {
          const clone = res.clone();
          caches.open(DYNAMIC_CACHE).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => {
        // Fallback for HTML
        if (request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
