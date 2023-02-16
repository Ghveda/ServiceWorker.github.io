// Register service worker
if('serviceWorker' in navigator){
  console.log('Service worker supported');
  window.addEventListener('load', ()=>{
    navigator.serviceWorker
    .register('./sw_cached_site.js')
    .then((reg)=> console.log(reg, 'service worker registered'))
    .catch((err)=> console.log(`Service worker Error: ${err}`))
  })
}