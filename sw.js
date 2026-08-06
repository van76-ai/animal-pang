/* 터트리쥬 서비스 워커 — 네트워크 우선, 오프라인 시 캐시 사용
   (항상 최신 버전을 먼저 받아오므로 업데이트가 밀리지 않습니다) */
const CACHE = 'tteotrizoo-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match(e.request))
  );
});
