let casheData = [
  "./index.html",
  "./src/style.css",
  "./src/index.js",
  "./font/Rimouski.css",
  "./images/beautiful-young-girl-yellow-raincoat-600w-1276224355.jpg",
  "./images/weather.png",
  "./images/amps.jpg",
  "./icons/01d.png",
  "./icons/01n.png",
  "./icons/02d.png",
  "./icons/02n.png",
  "./icons/03d.png",
  "./icons/03n.png",
  "./icons/04d.png",
  "./icons/04n.png",
  "./icons/09d.png",
  "./icons/09n.png",
  "./icons/10d.png",
  "./icons/10n.png",
  "./icons/11d.png",
  "./icons/11n.png",
  "./icons/13d.png",
  "./icons/13n.png",
  "./icons/50d.png",
  "./icons/50n.png",
  "./icons/unknown.png"
];
self.addEventListener("install", (e) => {
  console.log("install");
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll(casheData);
    })
  );
});

self.skipWaiting();

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
