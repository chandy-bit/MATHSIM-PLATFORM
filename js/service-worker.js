

const CACHE_NAME = 'mathsim-v3';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install
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


self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (only cache same origin)
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Skip analytics and tracking requests
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
          // Try to get from cache
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
          if (request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
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


self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ 
      version: '3.0.0', 
      cacheName: CACHE_NAME 
    });
  }
});


self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'sync-game-progress') {
    event.waitUntil(syncGameProgress());
  }
});

async function syncGameProgress() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('/api/progress')) {
        const response = await cache.match(request);
        if (response) {
          const data = await response.json();
          // Attempt to send to server
          await fetch('/api/progress', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
          });
          // Remove from cache after successful sync
          await cache.delete(request);
        }
      }
    }
    
    console.log('Service Worker: Game progress synced');
  } catch (error) {
    console.log('Service Worker: Sync failed', error);
  }
}

self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      { action: 'explore', title: 'Explore Now' },
      { action: 'close', title: 'Close' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('MathSim Update', options)
  );
});


self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        if (windowClients.length > 0) {
          windowClients[0].focus();
        } else {
          clients.openWindow('/');
        }
      })
  );
});

self.addEventListener('periodicsync', event => {
  console.log('Service Worker: Periodic sync', event.tag);
  
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const offlineResponse = await cache.match(OFFLINE_URL);
    
    // Fetch fresh offline page
    const freshResponse = await fetch(OFFLINE_URL);
    if (freshResponse && freshResponse.status === 200) {
      await cache.put(OFFLINE_URL, freshResponse.clone());
      console.log('Service Worker: Offline page updated');
    }
  } catch (error) {
    console.log('Service Worker: Cache update failed', error);
  }
}