// Elegant rain effect using Canvas with impact ripples.
// Subtle by default, responsive, DPR aware, and respects reduced motion.

const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)');
let running = !PRM.matches;

function onPRMChange() {
  running = !PRM.matches;
  if (running) start();
}
PRM.addEventListener?.('change', onPRMChange);

let raindrops = [];
let ripples = [];
let dpr = Math.max(1, window.devicePixelRatio || 1);
let w = 0, h = 0;
let groundY = 0; // y coordinate of the water plane

function resize() {
  dpr = Math.max(1, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  w = Math.floor(rect.width * dpr);
  h = Math.floor(rect.height * dpr);
  canvas.width = w;
  canvas.height = h;
  groundY = Math.floor(h * 0.84); // plane near bottom
}

function rand(min, max){ return Math.random() * (max - min) + min; }

function resetDrop(d) {
  d.x = rand(-w * 0.05, w * 1.05);
  d.y = rand(-h * 0.1, -10);
  d.len = rand(8, 18) * dpr; // line length
  d.speed = rand(320, 520) * dpr; // px/s
  d.thick = rand(0.6, 1.1) * dpr; // thickness
  d.wind = rand(-80, 80) * dpr; // drift per second
  d.alpha = rand(0.08, 0.16);
}

function createDrops(count){
  raindrops = new Array(count).fill(0).map(() => {
    const d = {}; resetDrop(d); d.y = rand(0, h); return d;
  });
}

let last = 0;
function frame(ts){
  if (!running) return; // stop drawing
  if (!last) last = ts; const dt = Math.min(50, ts - last) / 1000; last = ts;

  ctx.clearRect(0, 0, w, h);

  // Slight glassy layer to soften
  // ctx.fillStyle = 'hsla(210, 40%, 8%, 0.02)';
  // ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < raindrops.length; i++){
    const d = raindrops[i];
    d.y += d.speed * dt;
    d.x += d.wind * dt;
    // spawn ripple on impact with ground plane
    if (d.y >= groundY) {
      spawnRipple(d.x, groundY);
      resetDrop(d);
      continue;
    }
    if (d.y - d.len > h || d.x < -20*dpr || d.x > w + 20*dpr) { resetDrop(d); continue; }

    ctx.strokeStyle = `hsla(199, 90%, 60%, ${d.alpha})`;
    ctx.lineWidth = d.thick;
    ctx.beginPath();
    // draw at a slight angle
    const dx = d.len * 0.25; // angle component
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - dx, d.y - d.len);
    ctx.stroke();
  }

  // Draw ripples (expanding ellipses with fade)
  ctx.globalCompositeOperation = 'screen';
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    r.radius += r.grow * dt;
    r.alpha *= Math.pow(r.fade, dt);
    r.line *= Math.pow(r.thin, dt);
    if (r.radius > r.max || r.alpha < 0.01) { ripples.splice(i, 1); continue; }

    ctx.beginPath();
    ctx.strokeStyle = `hsla(199, 90%, 70%, ${r.alpha})`;
    ctx.lineWidth = Math.max(0.6 * dpr, r.line);
    // perspective-flattened ellipse
    ctx.ellipse(r.x, r.y, r.radius, r.radius * r.flatten, 0, 0, Math.PI * 2);
    ctx.stroke();

    // impact glow
    const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius * 0.7);
    g.addColorStop(0, `hsla(199, 90%, 60%, ${r.alpha * 0.08})`);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(Math.floor(r.x - r.radius), Math.floor(r.y - r.radius), Math.ceil(r.radius * 2), Math.ceil(r.radius * 2));
  }

  ctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(frame);
}

function start(){
  resize();
  // density tuned for subtle effect across sizes
  const density = Math.round((w * h) / (90000 * dpr * dpr));
  createDrops(Math.max(40, Math.min(220, density)));
  ripples.length = 0;
  last = 0;
  requestAnimationFrame(frame);
}

// Handle resize
let resizeRaf = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    if (!running) { resize(); return; }
    start();
  });
});

// Initialize
resize();
if (running) start();

// --- Ripple helpers ---
function spawnRipple(x, y){
  // comfort: clamp within bounds
  x = Math.max(12*dpr, Math.min(w - 12*dpr, x));
  // perspective flatten factor: stronger on wider screens
  const flatten = Math.max(0.18, Math.min(0.32, (w / Math.max(h, 1)) * 0.12));
  const max = rand(60, 140) * dpr;
  ripples.push({
    x, y,
    radius: rand(2, 6) * dpr,
    max,
    alpha: rand(0.06, 0.12),
    line: rand(0.8, 1.6) * dpr,
    grow: rand(120, 220) * dpr, // px/s
    fade: rand(0.2, 0.45),      // exponential fade factor per second (applied via pow)
    thin: rand(0.35, 0.65),     // linewidth decay per second
    flatten,
  });
}
