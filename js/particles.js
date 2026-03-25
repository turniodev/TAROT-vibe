// js/particles.js — Particle & star field system
(function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], stars = [], shootingStars = [], fireflies = [];

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

  function spawnShootingStar() {
    // start from random top or left edge
    const isTop = Math.random() > 0.5;
    shootingStars.push({
      x: isTop ? Math.random() * W : -50,
      y: isTop ? -50 : Math.random() * (H / 2),
      length: Math.random() * 150 + 100,
      vx: Math.random() * 5 + 6,    // moving right fast
      vy: Math.random() * 3 + 3,    // moving down fast
      life: 1.5,                    // longer life
      decay: Math.random() * 0.015 + 0.008,
      width: Math.random() * 1.5 + 1.2
    });
  }

  function spawnFirefly() {
    fireflies.push({
      x: Math.random() * W,
      y: H + 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 1.2 - 0.3,
      size: Math.random() * 2.5 + 1.2,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      swayCenter: Math.random() * W,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.015 + 0.005,
      swayAmp: Math.random() * 40 + 15,
      color: Math.random() > 0.7 ? '201, 168, 76' : '155, 48, 255'
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

  function drawShootingStars() {
    shootingStars.forEach((s, i) => {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;
      if (s.life <= 0 || s.x > W || s.y > H) {
        shootingStars.splice(i, 1);
        return;
      }
      const endX = s.x - (s.vx * s.length * 0.1);
      const endY = s.y - (s.vy * s.length * 0.1);
      
      const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
      grad.addColorStop(0.2, `rgba(200, 160, 255, ${s.life * 0.8})`);
      grad.addColorStop(1, 'rgba(155, 48, 255, 0)');
      
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(255, 255, 255, ${s.life * 0.6})`;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  }

  function drawFireflies(t) {
    for (let i = fireflies.length - 1; i >= 0; i--) {
      const f = fireflies[i];
      f.life++;
      if (f.life > f.maxLife || f.y < -20) { fireflies.splice(i, 1); continue; }
      
      f.x = f.swayCenter + Math.sin(f.life * f.swaySpeed + f.swayPhase) * f.swayAmp;
      f.swayCenter += f.vx;
      f.y += f.vy;

      const progress = f.life / f.maxLife;
      // Parabola opacity (fades in and out)
      const alpha = Math.sin(progress * Math.PI) * 0.85;
      
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${f.color}, ${alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${f.color}, ${alpha})`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;
    drawStars(t);
    if (Math.random() < 0.15) spawnParticle();
    if (Math.random() < 0.008) spawnShootingStar();
    if (Math.random() < 0.02) spawnFirefly(); // ~1 per second
    
    drawParticles();
    drawFireflies();
    drawShootingStars();
    
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  loop();
})();
