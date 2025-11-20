// Service Worker for CivicVoice Et
const CACHE_NAME = 'civicvoice-et-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/login',
  '/listings',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - network first, then cache
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response before caching
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone);
            });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets - cache first, then network
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response before caching
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });

            return response;
          });
      }
    )
  );
});

// Background sync for offline feedback submission
self.addEventListener('sync', event => {
  if (event.tag === 'feedback-sync') {
    event.waitUntil(syncFeedback());
  }
});

async function syncFeedback() {
  // Get pending feedback from IndexedDB
  const db = await openDB();
  const transaction = db.transaction(['pendingFeedback'], 'readonly');
  const store = transaction.objectStore('pendingFeedback');
  const pendingFeedback = await store.getAll();

  for (const feedback of pendingFeedback) {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback.data),
      });

      if (response.ok) {
        // Remove from pending queue
        const deleteTransaction = db.transaction(['pendingFeedback'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('pendingFeedback');
        await deleteStore.delete(feedback.id);
      }
    } catch (error) {
      console.error('Failed to sync feedback:', error);
    }
  }
}

// Utility function to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CivicVoiceDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingFeedback')) {
        db.createObjectStore('pendingFeedback', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}