// js/lightning.js — Mystical lightning / energy bolt effects
(function () {
  const canvas = document.getElementById('lightningCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // Draw a single lightning bolt recursively
  function drawBolt(x1, y1, x2, y2, spread, depth) {
    if (depth <= 0) return;
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * spread;
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * spread;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(mx, my);
    ctx.strokeStyle = `rgba(200,100,255, ${depth * 0.18})`;
    ctx.lineWidth = depth * 0.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(180,80,255,0.6)';
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    drawBolt(x1, y1, mx, my, spread / 1.8, depth - 1);
    drawBolt(mx, my, x2, y2, spread / 1.8, depth - 1);

    // occasional branch
    if (Math.random() < 0.35 && depth > 2) {
      const bx = mx + (Math.random() - 0.5) * spread * 2;
      const by = my + (Math.random() - 0.5) * spread * 2;
      drawBolt(mx, my, bx, by, spread / 2.5, depth - 2);
    }
  }

  function flashLightning() {
    // Pick random start near top-center area, end near bottom or sides
    const startX = W * 0.3 + Math.random() * W * 0.4;
    const startY = Math.random() * H * 0.2;
    const endX   = Math.random() * W;
    const endY   = H * 0.5 + Math.random() * H * 0.5;

    ctx.clearRect(0, 0, W, H);
    drawBolt(startX, startY, endX, endY, 80, 8);

    // fade out
    setTimeout(() => {
      ctx.clearRect(0, 0, W, H);
    }, 140);
  }

  function scheduleNext() {
    const delay = 3000 + Math.random() * 7000; // every 3–10 seconds
    setTimeout(() => {
      flashLightning();
      scheduleNext();
    }, delay);
  }

  window.addEventListener('resize', resize);
  resize();
  scheduleNext();

  // Expose for manual trigger (e.g., on button click)
  window.triggerLightning = flashLightning;
})();
