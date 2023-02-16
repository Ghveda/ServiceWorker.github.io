

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

const img = "https://miro.medium.com/max/1400/1*W1nZrfSnlkDELSU8uFkZ2w.png";
const text = "Take a look at this brand new t-shirt!";
const title = "New Product Available";
const options = {
    body: text,
    icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
    vibrate: [200, 100, 200],
    tag: "new-product",
    image: img,
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
 };

navigator.serviceWorker.ready.then(function(serviceWorker) {
  serviceWorker.showNotification(title, options);
});


// Notification
const notification = Notification.permission;

const showNotification = ()=>{
  const img = "https://buildfire.com/wp-content/uploads/2018/03/what-is-a-push-notification-and-why-it-matters-1200x675.jpg";
  const text = "Take a look at this brand new t-shirt!";
  const title = "New Product Available";

  const option = {
      body: text,
      icon: "https://buildfire.com/wp-content/uploads/2018/03/what-is-a-push-notification-and-why-it-matters-1200x675.jpg",
      vibrate: [200, 100, 200],
      tag: "new-product",
      image: img,
      badge: "https://spyna.it/icons/android-icon-192x192.png",
      actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  }
  new Notification('New message from Document', {
  ...option
  })
};

  Notification.requestPermission()
  .then((permission)=>{
    if(permission === 'granted'){
      showNotification();
    }else{
      alert('We have no permission!');
    }
  })