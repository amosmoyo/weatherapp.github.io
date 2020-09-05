const casheData = [
  "./", "./src/style.css", "./images/beautiful-young-girl-yellow-raincoat-600w-1276224355.jpg", "./src/index.js",
  "./images/weather.png", "./apms/jpg"
]
self.addEventListener('install', (e) => {
  console.log('install');
  e.waitUntil(
    caches.open('static').then((cache) => {
      return cache.addAll(casheData);
    })
  )
})

self.skipWaiting();

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => {
    return res || fetch(e.request)
  }))
});