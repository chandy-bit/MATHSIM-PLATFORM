const CACHE_NAME = 'mathsim-v1';
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
  '/js/theme.js',
  '/js/language.js',
  '/js/accessibility.js',
  '/js/main.js',
  '/js/plotter.js',
  '/js/game.js',
  '/js/pwa.js',
  '/manifest.json',

  '/algebra.html',
  '/geometry.html',
  '/precalculus.html',
  '/calculus.html',
  '/probability.html',
  '/all-subjects.html',

  '/algebra-game.html',
  '/geometry-game.html',
  '/probability-game.html',
  '/slope-game.html',

  '/graphing-calculator.html',
  '/equation-solver.html',
  '/planner.html',

  '/js/simulation-core.js',
  '/js/simulation-types.js',
  '/js/dashboard.js',
  '/js/geometry.js',
  '/js/planner.js',
  '/js/probability.js',
  '/js/calculus.js',

];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
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
            console.log('Service Worker: Clearing old cache', cache);
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For HTML pages - network first, fallback to cache, then offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the updated page
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cached => {
              if (cached) return cached;
              // If page not in cache, show offline page
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // For assets - cache first, network fallback
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }
        
        return fetch(event.request)
          .then(response => {
            // Cache valid responses
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(error => {
            console.log('Fetch failed:', error);
            // Return a simple offline response
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle offline page
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


// Notify clients of update
self.addEventListener('activate', (event) => {
    event.waitUntil(
        clients.claim().then(() => {
            clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'UPDATE_AVAILABLE',
                        version: '2.0.0'
                    });
                });
            });
        })
    );
});