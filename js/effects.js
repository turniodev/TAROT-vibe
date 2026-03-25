// js/effects.js — Micro-animation & interaction effects engine
window.FX = (function () {

  /* ── Ripple on any element ─────────────────────────── */
  function ripple(el, e, color = 'rgba(200,121,255,0.35)') {
    const rect = el.getBoundingClientRect();
    const x = (e?.clientX ?? rect.left + rect.width / 2) - rect.left;
    const y = (e?.clientY ?? rect.top + rect.height / 2) - rect.top;
    const r = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2.2;
    r.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${x - size/2}px; top:${y - size/2}px;
      background:${color}; transform:scale(0); opacity:1;
      animation: fxRipple 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
      z-index:9999;
    `;
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }

  /* ── Particle burst at position ────────────────────── */
  function burst(x, y, count = 16, color = '#c9a84c') {
    const colors = ['#c9a84c', '#9b30ff', '#ffffff', '#e8b4ff'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const angle = Math.random() * Math.PI * 2;
      const dist  = 30 + Math.random() * 70;
      const size  = 2 + Math.random() * 4;
      const c = colors[Math.floor(Math.random() * colors.length)];
      const tx    = Math.cos(angle) * dist;
      const ty    = Math.sin(angle) * dist - (Math.random() * 20); // slight float up
      p.style.cssText = `
        position:fixed; border-radius:50%; pointer-events:none; z-index:9999;
        width:${size}px; height:${size}px;
        left:${x - size/2}px; top:${y - size/2}px;
        background:${c};
        box-shadow: 0 0 ${size*2}px ${c};
        animation: fxBurst 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        --tx:${tx}px; --ty:${ty}px;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  /* ── Glow pulse on element ──────────────────────────── */
  function glowPulse(el, color = 'rgba(155,48,255,0.8)') {
    el.style.transition = 'box-shadow 0.15s ease';
    el.style.boxShadow = `0 0 0 3px ${color}, 0 0 24px ${color}`;
    setTimeout(() => {
      el.style.boxShadow = '';
    }, 500);
  }

  /* ── Shake element ──────────────────────────────────── */
  function shake(el) {
    el.style.animation = 'none';
    void el.offsetWidth; // reflow
    el.style.animation = 'fxShake 0.45s ease';
    setTimeout(() => { el.style.animation = ''; }, 500);
  }

  /* ── Slide step panels ──────────────────────────────── */
  function slideStep(outEl, inEl, direction = 'forward') {
    const outX = direction === 'forward' ? '-120%' : '120%';
    const inX  = direction === 'forward' ?  '120%' : '-120%';

    // Animate out
    outEl.style.transition = 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s';
    outEl.style.transform  = `translateX(${outX})`;
    outEl.style.opacity    = '0';

    setTimeout(() => {
      outEl.classList.remove('active');
      outEl.style.transform = '';
      outEl.style.opacity   = '';
      outEl.style.transition = '';

      // Prep in
      inEl.style.transform  = `translateX(${inX})`;
      inEl.style.opacity    = '0';
      inEl.style.transition = 'none';
      inEl.classList.add('active');

      // Trigger in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inEl.style.transition = 'transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.42s';
          inEl.style.transform  = 'translateX(0)';
          inEl.style.opacity    = '1';
        });
      });

      setTimeout(() => {
        inEl.style.transition = '';
        inEl.style.transform  = '';
        inEl.style.opacity    = '';
      }, 450);
    }, 360);
  }

  /* ── Modal open ─────────────────────────────────────── */
  function modalOpen(overlay, panel) {
    overlay.classList.add('visible');
    panel.style.transform = 'scale(0.88) translateY(20px)';
    panel.style.opacity   = '0';
    panel.style.transition = 'none';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s';
        panel.style.transform = 'scale(1) translateY(0)';
        panel.style.opacity   = '1';
      });
    });

    // lightning flash
    if (window.triggerLightning) {
      setTimeout(() => window.triggerLightning(), 80);
    }

    setTimeout(() => {
      panel.style.transition = '';
      panel.style.transform  = '';
      panel.style.opacity    = '';
    }, 600);
  }

  /* ── Modal close ─────────────────────────────────────── */
  function modalClose(overlay, panel, cb) {
    panel.style.transition = 'transform 0.35s cubic-bezier(0.4,0,1,1), opacity 0.35s';
    panel.style.transform  = 'scale(0.93) translateY(10px)';
    panel.style.opacity    = '0';
    setTimeout(() => {
      overlay.classList.remove('visible');
      panel.style.transition = '';
      panel.style.transform  = '';
      panel.style.opacity    = '';
      if (cb) cb();
    }, 370);
  }

  /* ── Theme card select animation ────────────────────── */
  function cardSelect(el, e) {
    ripple(el, e, 'rgba(155,48,255,0.3)');
    glowPulse(el, 'rgba(155,48,255,0.6)');
    const rect = el.getBoundingClientRect();
    burst(
      rect.left + rect.width / 2,
      rect.top  + rect.height / 2,
      8, 'rgba(201,168,76,0.8)'
    );
  }

  /* ── Step dot activate ──────────────────────────────── */
  function activateDot(dot) {
    dot.style.animation = 'none';
    void dot.offsetWidth;
    dot.style.animation = 'fxDotPop 0.4s cubic-bezier(0.22,1,0.36,1) forwards';
  }

  /* ── Button hover particle trail ────────────────────── */
  function attachBtnHover(btn) {
    btn.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.8) {
        const p = document.createElement('div');
        const size = 2 + Math.random() * 3;
        p.style.cssText = `
          position:fixed; border-radius:50%; pointer-events:none; z-index:9999;
          width:${size}px; height:${size}px;
          left:${e.clientX}px; top:${e.clientY}px;
          background:rgba(200,121,255,0.7);
          box-shadow:0 0 8px rgba(200,121,255,0.5);
          animation:fxBtnTrail 0.7s ease forwards;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 750);
      }
    });

    btn.addEventListener('click', (e) => {
      ripple(btn, e, 'rgba(200,121,255,0.4)');
      burst(e.clientX, e.clientY, 8);
    });
  }

  /* ── Inject all keyframes ───────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fxRipple {
      to { transform: scale(1); opacity: 0; }
    }
    @keyframes fxBurst {
      0%   { transform: translate(0,0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0.2); opacity: 0; }
    }
    @keyframes fxShake {
      0%,100% { transform: translateX(0); }
      20%     { transform: translateX(-9px); }
      40%     { transform: translateX(9px); }
      60%     { transform: translateX(-5px); }
      80%     { transform: translateX(5px); }
    }
    @keyframes fxDotPop {
      0%   { transform: scale(0.5); }
      60%  { transform: scale(1.5); }
      100% { transform: scale(1.3); }
    }
    @keyframes fxBtnTrail {
      0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.8; }
      100% { transform: translate(-50%,-150%) scale(0); opacity: 0; }
    }
    #fxMagicalAura {
      position: fixed;
      top: 0; left: 0;
      width: 450px; height: 450px;
      margin-top: -225px; margin-left: -225px;
      background: radial-gradient(circle, rgba(155, 48, 255, 0.12) 0%, rgba(201, 168, 76, 0.05) 35%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998; 
      mix-blend-mode: screen;
      will-change: transform;
    }
    @keyframes fxOverlayIn {
      from { opacity:0; backdrop-filter: blur(0px); }
      to   { opacity:1; backdrop-filter: blur(10px); }
    }
    /* Override form-step animation to use JS-driven slideStep instead */
    .form-step { display: none; }
    .form-step.active { display: block; }
  `;
  document.head.appendChild(style);

  /* ── Init btn hover effects & Aura ─────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-begin, .btn-next, .btn-prev, .btn-begin-reading, .btn-control')
      .forEach(attachBtnHover);
      
    /* Spawn Global Magic Aura */
    const aura = document.createElement('div');
    aura.id = 'fxMagicalAura';
    document.body.appendChild(aura);
    
    let auraX = window.innerWidth / 2, auraY = window.innerHeight / 2;
    let mouseX = auraX, mouseY = auraY;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateAura() {
      auraX += (mouseX - auraX) * 0.08;
      auraY += (mouseY - auraY) * 0.08;
      aura.style.transform = `translate(${auraX}px, ${auraY}px)`;
      requestAnimationFrame(animateAura);
    }
    requestAnimationFrame(animateAura);

    /* Global Fairy Sparks on Click */
    document.addEventListener('click', (e) => {
      // Ignore input fields so typing isn't distracting
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      burst(e.clientX, e.clientY, 10);
    });
  });

  // Also attach after any dynamic renders
  window.FX_attachHover = attachBtnHover;

  return { ripple, burst, glowPulse, shake, slideStep, modalOpen, modalClose, cardSelect, activateDot, attachBtnHover };
})();
