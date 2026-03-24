// js/particles.js — Particle & star field system
(function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    const count = Math.floor((W * H) / 5000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function spawnParticle() {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      life: 1,
      decay: Math.random() * 0.004 + 0.002,
      r: Math.random() * 2.5 + 0.5,
      hue: Math.random() * 60 + 260  // purple to violet range
    });
  }

  function drawStars(t) {
    stars.forEach(s => {
      s.a = 0.4 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 160, 255, ${s.a})`;
      ctx.fill();
    });
  }

  function drawParticles() {
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); return; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      const alpha = p.life * 0.7;
      ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `hsla(${p.hue}, 90%, 75%, ${alpha * 0.5})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;
    drawStars(t);
    if (Math.random() < 0.15) spawnParticle();
    drawParticles();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  loop();
})();
