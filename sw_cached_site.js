const cacheName = 'v2';

// Install service worker
self.addEventListener('install', (event)=>{
  console.log('Service worker : installed');
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
    .then((response)=>{
      // Make copy/clone of response
      const resClone = response.clone();

      // Open cache
      caches
      .open(cacheName)
      .then((cache)=> {
        // Add response to cache
        cache.put(e.request, resClone);
      })

      return response;
    })
    .catch((err)=>caches.match(e.request).then(res=>res))
  )
})
