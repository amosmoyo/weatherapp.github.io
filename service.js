self.addEventListener('install', (e) => {
  console.log('install');
  e.waitUntil(
    caches.open('static').then((cache) => {
      return cache.addAll(["./", "./src/style.css", "./images/beautiful-young-girl-yellow-raincoat-600w-1276224355.jpg", "./src/index.js"])
    })
  )
})

self.skipWaiting();

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
});