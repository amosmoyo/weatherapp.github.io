const casheData = [
  "./", "./index.html", "./src/style.css", "./images/beautiful-young-girl-yellow-raincoat-600w-1276224355.jpg",
  "./images/weather.png", "./apms/jpg", "./src/index.js"
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