const cacheName = 'v3';

const cacheAssets = [
  'index.html',
  'main.html',
  'style.css',
  'app.js'
];

// Install service worker
self.addEventListener('install', (event)=>{
  console.log('Service worker : installed');
  event.waitUntil(
    caches
    .open(cacheName)
    .then((cache)=>{
      console.log('Service Worker caching files:',cache);
      cache.addAll(cacheAssets);
    })
    .then(()=>self.skipWaiting())
  )
});

// Call activate event
self.addEventListener('activate', (event)=>{
  console.log('Service worker activated');
  // Remove unwanted caches
  event.waitUntil(
    caches.keys()
    .then((cacheNames)=> {
      return Promise.all(
        cacheNames.map((cache)=>{
          if(cache!== cacheName){
            console.log('Service Worker: Clearing Old cache!');
            return caches.delete(cache);
          }
        })
      )
    })
  )
});

// Call fetch event
self.addEventListener('fetch', (e)=>{
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
    .catch(()=>caches.match(e.request))
  )
})
