// BaroPlanner Service Worker
// Network-first: Updates kommen sofort an, der Cache ist nur das Offline-Netz.
// (Der alte Cache-first-Blob-SW hat App-Updates auf ewig festgehalten.)
const CACHE = 'baran-v3';
const ASSETS = ['./', './index.html', './style.css', './app.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // API, Fonts etc. nicht anfassen
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(() =>
      caches.match(e.request).then(r => r || caches.match('./index.html'))
    )
  );
});

// ── Web-Push (iOS 16.4+ für installierte PWAs) ──
// Payload kommt als JSON {title, body} von der Supabase-Function baro-push.
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; }
  catch (err) { data = { title: 'Baro Coach', body: (e.data && e.data.text()) || '' }; }
  e.waitUntil(self.registration.showNotification(data.title || 'Baro Coach', {
    body: data.body || '',
    tag: data.tag || 'baro',
    data: { url: './' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return clients.openWindow('./');
  }));
});
