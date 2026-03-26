// js/particles.js — Particle & star field system
(function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], stars = [], shootingStars = [], fireflies = [], wisps = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createStars();
    createWisps();
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

  function createWisps() {
    wisps = [];
    // Tăng số lượng wisp mây mờ
    const count = Math.max(5, Math.floor(W / 200));
    for (let i = 0; i < count; i++) {
      wisps.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 400 + 250, 
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        hue: Math.random() > 0.4 ? (Math.random() * 20 + 265) : (Math.random() * 40 + 30), // Deep Purple or Gold
        baseAlpha: Math.random() * 0.05 + 0.03, // Tăng opacity nền
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.008
      });
    }
  }

  function drawWisps(t) {
    wisps.forEach(w => {
      w.x += w.vx;
      w.y += w.vy;
      if (w.x > W + w.r) w.x = -w.r;
      if (w.x < -w.r) w.x = W + w.r;
      if (w.y > H + w.r) w.y = -w.r;
      if (w.y < -w.r) w.y = H + w.r;

      const alpha = w.baseAlpha + Math.sin(t * w.pulseSpeed + w.phase) * (w.baseAlpha * 0.5);
      const grad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r);
      grad.addColorStop(0, `hsla(${w.hue}, 90%, 65%, ${alpha})`);
      grad.addColorStop(1, `hsla(${w.hue}, 90%, 65%, 0)`);
      
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
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
      vx: (Math.random() - 0.5) * 0.6,
      vy: -Math.random() * 1.5 - 0.4, // Bay lượn nhanh hơn xíu
      size: Math.random() * 3.5 + 1.5, // To hơn, sáng hơn
      life: 0,
      maxLife: Math.random() * 400 + 200, // Sống lâu hơn
      swayCenter: Math.random() * W,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.005,
      swayAmp: Math.random() * 50 + 20,
      color: Math.random() > 0.6 ? '220, 180, 90' : '180, 80, 255' // Rực rỡ hơn
    });
  }

  // ── MOUSE TRAIL EFFECT ────────────────────
  function spawnMouseParticle(mx, my) {
    particles.push({
      x: mx + (Math.random() - 0.5) * 16,
      y: my + (Math.random() - 0.5) * 16,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * -2.0 - 0.4, // Bay lên cao hơn
      life: 1.2, // Tồn tại lâu hơn
      decay: Math.random() * 0.015 + 0.01, // Lâu tàn hơn
      r: Math.random() * 3.5 + 1.0, // To hơn
      hue: Math.random() > 0.5 ? (Math.random() * 30 + 270) : (Math.random() * 30 + 40) // Bright Purple or Bright Gold
    });
  }

  window.addEventListener('mousemove', (e) => {
    // Spawn particles on mouse move with a random chance to avoid overcrowding
    if (Math.random() < 0.7) {
      spawnMouseParticle(e.clientX, e.clientY);
      if (Math.random() < 0.4) {
        spawnMouseParticle(e.clientX, e.clientY);
      }
    }
  });
  // ──────────────────────────────────────────

  let isWarping = false;
  let warpFactor = 0;

  function drawStars(t) {
    if (isWarping) {
      if (warpFactor < 2.5) warpFactor += 0.06; // Gradual acceleration up to max speed
    }

    stars.forEach((s, index) => {
      ctx.beginPath();
      if (isWarping) {
        // Giảm thiểu đến 80% hạt bị hút vào để tránh rối mắt
        if (index % 5 !== 0) return;

        const dx = s.x - W / 2;
        const dy = s.y - H / 2;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        
        // Push outward
        const speed = warpFactor * dist * 0.035;
        s.x += (dx / dist) * speed;
        s.y += (dy / dist) * speed;
        s.r += warpFactor * 0.005;

        // Respawn in center if out of bounds (Creates infinite tunnel)
        if (s.x < -50 || s.x > W + 50 || s.y < -50 || s.y > H + 50) {
          s.x = W / 2 + (Math.random() - 0.5) * 80;
          s.y = H / 2 + (Math.random() - 0.5) * 80;
          s.r = Math.random() * 0.5 + 0.2; // reset size
        }

        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 255, ${0.4 + warpFactor * 0.15})`;
        ctx.fill();

        // Starlight trail
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - dx * warpFactor * 0.04, s.y - dy * warpFactor * 0.04);
        ctx.strokeStyle = `rgba(155, 80, 255, ${0.5 + warpFactor * 0.1})`;
        ctx.lineWidth = s.r * 1.5;
        ctx.stroke();
      } else {
        s.a = 0.4 + 0.5 * Math.sin(t * s.speed + s.phase);
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 160, 255, ${s.a})`;
        ctx.fill();
      }
    });

    if (isWarping && Math.random() < 0.1) {
      spawnShootingStar();
    }
  }

  function drawParticles() {
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); return; }
      ctx.beginPath();
      const r = p.r * p.life;
      const alpha = p.life * 0.7;

      // Glow layer (Replaces expensive shadowBlur)
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha * 0.25})`;
      ctx.fill();

      // Core layer
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha})`;
      ctx.fill();
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
      
      // Glow trail (Replaces expensive shadowBlur)
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `rgba(200, 160, 255, ${s.life * 0.3})`;
      ctx.lineWidth = s.width * 3;
      ctx.stroke();

      // Core trail
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.stroke();
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
      
      // Glow layer (Replaces expensive shadowBlur)
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${f.color}, ${alpha * 0.25})`;
      ctx.fill();

      // Core layer
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${f.color}, ${alpha})`;
      ctx.fill();
    }
  }

  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;
    drawWisps(t);
    drawStars(t);
    // Tăng cường mật độ các hạt
    if (Math.random() < 0.25) spawnParticle();
    if (Math.random() < 0.01) spawnShootingStar();
    if (Math.random() < 0.05) spawnFirefly(); // Xuất hiện nhiều đom đóm hơn (~2.5/s)
    
    drawParticles();
    drawFireflies();
    drawShootingStars();
    
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  loop();

  window.Particles = {
    triggerWarp: function(duration = 800) {
      isWarping = true;
      warpFactor = 0;
      for (let i = 0; i < 4; i++) spawnShootingStar(); // Initial burst
      setTimeout(() => {
        isWarping = false;
        warpFactor = 0;
        createStars(); // Reset stars to random positions after warp
      }, duration);
    }
  };

})();
