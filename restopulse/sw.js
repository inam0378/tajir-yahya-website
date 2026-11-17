/* RestoPulse service worker: makes the app installable. The app is online-only, so data always comes from the server;
   when there is no connection the user sees a clear message instead of a browser error page. */
const OFFLINE = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>RestoPulse</title><body style="margin:0;background:#0c0b09;color:#f5f1e3;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;padding:16px">
<div><h1 style="color:#ffc800;margin:0 0 8px">RestoPulse</h1><p>Internet nahi hai. RestoPulse sirf online chalta hai.<br>Internet check kar ke dobara kholen.</p>
<button onclick="location.reload()" style="background:#ffc800;border:0;border-radius:8px;padding:10px 18px;font-weight:700">Dobara try karein</button></div></body>`;
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return; // API calls and assets go straight to the network
  e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } })));
});
