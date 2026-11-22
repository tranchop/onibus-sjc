// Guarda a página e os ícones para o app abrir sem internet. A página vem da rede quando houver sinal
// (até 3,5 s); sem resposta, usa a cópia salva.
const CACHE = 'onibus-sjc-v2';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './favicon.svg', './favicon.ico',
  './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function pageFromNetwork(req) {
  return new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => caches.match('./index.html').then(finish), 3500);
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
      clearTimeout(timer); finish(res);
    }).catch(() => {
      clearTimeout(timer);
      caches.match('./index.html').then(m => finish(m || Response.error()));
    });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') { e.respondWith(pageFromNetwork(req)); return; }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
