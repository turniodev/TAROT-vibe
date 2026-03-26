// js/float-cards.js — Floating tarot card backs around the landing screen
(function () {
  const layer = document.getElementById('floatingCards');
  const CARD_COUNT = 14;
  const cards = [];

  // Back image path — preload once to get natural dimensions
  // Admin page is in subfolder, so we check path
  const BACK_IMG = window.location.pathname.includes('/admin') ? '../cards/back.png' : 'cards/back.png';

  function rand(min, max) { return min + Math.random() * (max - min); }

  // Preload image to get real aspect ratio
  const probe = new Image();
  probe.src = BACK_IMG;
  probe.onload = () => startFloating(probe.naturalWidth, probe.naturalHeight);
  probe.onerror = () => startFloating(63, 110); // fallback ratio

  function startFloating(nw, nh) {
    for (let i = 0; i < CARD_COUNT; i++) {
      cards.push(createCard(nw, nh));
    }
    animate();
  }

  function createCard(nw, nh) {
    const el = document.createElement('div');
    el.className = 'float-card';

    // Width random, height derived from REAL image aspect ratio
    const w = rand(60, 95);
    const h = (nh / nw) * w;

    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.background = 'none';
    el.style.border = '1px solid rgba(201,168,76,0.25)';
    el.style.boxShadow = '0 4px 24px rgba(107,0,204,0.35)';

    // Image fills exactly — no crop, no distort
    const img = document.createElement('img');
    img.src = BACK_IMG;
    img.alt = '';
    img.style.cssText = [
      'display:block',
      'width:100%',
      'height:100%',
      'object-fit:fill',   // exact fill since ratio is already correct
      'border-radius:7px'
    ].join(';');

    el.appendChild(img);
    layer.appendChild(el);

    // Random starting position near edges (off-screen)
    const zone = Math.floor(Math.random() * 4);
    const vw = window.innerWidth, vh = window.innerHeight;
    let startX, startY;
    switch (zone) {
      case 0: startX = rand(-100, vw + 100); startY = rand(-h - 40, -20); break;
      case 1: startX = rand(-100, vw + 100); startY = rand(vh + 20, vh + h + 40); break;
      case 2: startX = rand(-w - 40, -20); startY = rand(-100, vh + 100); break;
      default: startX = rand(vw + 20, vw + w + 40); startY = rand(-100, vh + 100);
    }

    return {
      el,
      x: startX, y: startY,
      vx: rand(-0.35, 0.35),
      vy: rand(-0.35, 0.35),
      rot: rand(-25, 25),            // gentler tilt range
      vrot: rand(-0.15, 0.15),
      opacity: rand(0.15, 0.35),
      scale: rand(0.8, 1.15),
      driftPhase: rand(0, Math.PI * 2),
      driftAmp: rand(0.1, 0.35),
      driftSpeed: rand(0.003, 0.007)
    };
  }

  function wrapAround(card) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const m = 140;
    if (card.x < -m) card.x = vw + 80;
    if (card.x > vw + m) card.x = -80;
    if (card.y < -m) card.y = vh + 80;
    if (card.y > vh + m) card.y = -80;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentParallaxX = 0;
  let currentParallaxY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let t = 0;
  function animate() {
    t += 0.016;

    // Smooth lerp for parallax
    const targetPx = (mouseX - window.innerWidth / 2) * 0.08;
    const targetPy = (mouseY - window.innerHeight / 2) * 0.08;
    currentParallaxX += (targetPx - currentParallaxX) * 0.05;
    currentParallaxY += (targetPy - currentParallaxY) * 0.05;

    cards.forEach((c, i) => {
      c.x += c.vx + Math.sin(t * c.driftSpeed + c.driftPhase) * c.driftAmp;
      c.y += c.vy + Math.cos(t * c.driftSpeed + c.driftPhase + 1) * c.driftAmp;
      c.rot += c.vrot;
      wrapAround(c);

      const opacityPulse = c.opacity + 0.05 * Math.sin(t * 0.5 + i);

      // Depth perception: cards that are "closer" (larger scale) move more
      const px = c.x - (currentParallaxX * c.scale * 1.5);
      const py = c.y - (currentParallaxY * c.scale * 1.5);

      c.el.style.transform = `translate(${px}px, ${py}px) rotate(${c.rot}deg) scale(${c.scale})`;
      c.el.style.opacity = opacityPulse.toFixed(3);
    });
    requestAnimationFrame(animate);
  }
})();
