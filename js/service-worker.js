

const CACHE_NAME = 'mathsim-v3';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install - CORRECTED PATHS
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/simulation.html',
  '/game.html',
  '/accessibility.html',
  '/offline.html',
  '/css/style.css',
  '/css/upgrade.css',
  '/js/theme.js',
  '/js/language.js',
  '/js/accessibility.js',
  '/js/main.js',
  '/js/plotter.js',
  '/js/game.js',
  '/js/pwa.js',
  '/js/upgrade.js',
  '/js/analytics.js',
  '/manifest.json',

  // Subject pages
  '/algebra.html',
  '/geometry.html',
  '/precalculus.html',
  '/calculus.html',
  '/probability.html',
  '/progress.html',
  '/tutorial.html',
  '/docs.html',
  '/faq.html',
  '/feedback.html',
  '/privacy.html',
  '/terms.html',
  '/about.html',
  '/contact.html',
  '/consent.html',
  '/survey.html',
  '/survey-results.html',

  // JS files
  '/js/simulation-core.js',
  '/js/simulation-types.js',
  '/js/dashboard.js',
  '/js/geometry.js',
  '/js/planner.js',
  '/js/probability.js',
  '/js/calculus.js',
  '/js/algebra-topics.js'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing version', CACHE_NAME);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Install complete');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('Service Worker: Install failed', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Now ready to handle fetches');
      return self.clients.claim();
    })
  );
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests and cross-origin requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (only cache same origin)
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Skip analytics and tracking
  if (url.pathname.includes('analytics') || url.pathname.includes('gtag')) {
    return;
  }

  if (request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache a copy for offline use
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // Try cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            console.log('Service Worker: Serving from cache', request.url);
            return cachedResponse;
          }
          // Fallback to offline page
          const offlineResponse = await caches.match(OFFLINE_URL);
          if (offlineResponse) {
            return offlineResponse;
          }
          // Ultimate fallback
          return new Response(
            '<html><body><h1>Offline</h1><p>Please check your internet connection.</p></body></html>',
            { status: 503, headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }
        // Not in cache, fetch from network
        return fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Return placeholder for images
          if (request.url.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#ccc"/><text x="50" y="55" text-anchor="middle" fill="#666" font-size="14">Image</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
          return new Response('Not found', { status: 404 });
        });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push notifications (optional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: { url: '/' }
  };
  
  event.waitUntil(
    self.registration.showNotification('MathSim Update', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});