const CACHE_NAME = 'mathsim-v2'; // Incremented version
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

  '/algebra.html',
  '/geometry.html',
  '/precalculus.html',
  '/calculus.html',
  '/probability.html',
  '/all-subjects.html',
  '/about.html',
  '/contact.html',
  '/consent.html',
  '/progress.html',
  '/tutorial.html',
  '/docs.html',
  '/faq.html',
  '/feedback.html',
  '/privacy.html',
  '/terms.html',

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
        // Cache each asset individually to avoid failing the whole install
        return Promise.allSettled(
          PRECACHE_ASSETS.map(asset => 
            cache.add(asset).catch(err => 
              console.log(`Failed to cache ${asset}:`, err)
            )
          )
        );
      })
      .then(() => {
        console.log('Service Worker: Install complete');
        return self.skipWaiting();
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
  
  // Notify clients of update
  event.waitUntil(
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'UPDATE_AVAILABLE',
          version: '2.0.0'
        });
      });
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests and cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }
  
  // Skip analytics and tracking requests
  if (url.pathname.includes('analytics') || url.pathname.includes('gtag')) {
    return;
  }

  // For HTML pages - network first, fallback to cache, then offline page
  if (request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the updated page if valid
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
            return cachedResponse;
          }
          // If not in cache, show offline page
          const offlineResponse = await caches.match(OFFLINE_URL);
          if (offlineResponse) {
            return offlineResponse;
          }
          // Return a basic offline response as last resort
          return new Response(
            '<html><body><h1>Offline</h1><p>You are offline. Please check your internet connection.</p></body></html>',
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            }
          );
        })
    );
    return;
  }

  // For assets - cache first, network fallback (Stale-While-Revalidate)
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        const fetchPromise = fetch(request)
          .then(networkResponse => {
            // Update cache with fresh response
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(error => {
            console.log(`Fetch failed for ${request.url}:`, error);
            // Return cached response if available
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return placeholder for images
            if (request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#ccc"/><text x="50" y="55" text-anchor="middle" font-size="14" fill="#666">Image</text></svg>',
                {
                  headers: new Headers({
                    'Content-Type': 'image/svg+xml'
                  })
                }
              );
            }
            // Return 404 for other assets
            return new Response('Not found', { status: 404 });
          });
        
        // Return cached response while fetching in background
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetchPromise;
      })
  );
});

// Handle offline page with dynamic response
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Special handling for offline.html
  if (request.url.includes('/offline.html')) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        // Create offline page dynamically
        return new Response(
          `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Offline - MathSim</title>
              <style>
                  body {
                      font-family: system-ui, -apple-system, sans-serif;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      margin: 0;
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                  }
                  .offline-container {
                      text-align: center;
                      padding: 2rem;
                  }
                  h1 { font-size: 3rem; margin-bottom: 1rem; }
                  p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
                  .retry-btn {
                      background: white;
                      color: #667eea;
                      border: none;
                      padding: 12px 24px;
                      font-size: 1rem;
                      border-radius: 8px;
                      cursor: pointer;
                      font-weight: bold;
                  }
                  .retry-btn:hover {
                      transform: scale(1.05);
                  }
              </style>
          </head>
          <body>
              <div class="offline-container">
                  <h1>📡 You're Offline</h1>
                  <p>Please check your internet connection and try again.</p>
                  <button class="retry-btn" onclick="location.reload()">🔄 Retry Connection</button>
              </div>
          </body>
          </html>`,
          {
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          }
        );
      })
    );
  }
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: '2.0.0', cacheName: CACHE_NAME });
  }
});

// Background sync for offline actions
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

// Push notifications (optional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
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

// Handle notification clicks
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