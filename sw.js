const CACHE = "nervous-glossary-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./src/styles/app.css",
  "./src/index.mjs",
  "./src/modules/deps.mjs",
  "./src/modules/content/terms.mjs",
  "./src/modules/content/icons.mjs",
  "./src/modules/content/diagrams.mjs",
  "./src/modules/services/data.mjs",
  "./src/modules/components/App.mjs",
  "./src/modules/components/NeuralHero.mjs",
  "./src/modules/components/TermRow.mjs",
  "./src/modules/components/AddTermForm.mjs",
  "./src/modules/components/TermBubble.mjs",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Network-first for same-origin app files, falling back to cache when offline.
// Third-party CDN requests (fonts, Vue, goober, Tabler) pass straight through.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
