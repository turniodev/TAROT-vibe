// js/form.js — Multi-step form logic (uses window.FX for animations)
(function () {
  const overlay     = document.getElementById('formOverlay');
  const panel       = overlay.querySelector('.form-panel');
  const progressBar = document.getElementById('formProgressBar');
  const stepDots    = document.querySelectorAll('.step-dot');
  const stepEls     = document.querySelectorAll('.form-step');
  const charCount   = document.getElementById('charCount');
  const inputQ      = document.getElementById('inputQuestion');

  let currentStep = 1;
  const TOTAL = 4;

  /* ── Helpers ──────────────────────────────────────── */
  function getStep(n) { return document.getElementById(`step${n}`); }

  function updateProgress(n) {
    const pct = ((n - 1) / (TOTAL - 1)) * 100;
    progressBar.style.width = Math.max(8, pct) + '%';

    stepDots.forEach((d, i) => {
      const wasActive = d.classList.contains('active');
      d.classList.toggle('active', i + 1 === n);
      d.classList.toggle('done',   i + 1 < n);
      if (i + 1 === n && !wasActive) {
        window.FX?.activateDot(d);
      }
    });
  }

  /* ── Go to step with slide animation ─────────────── */
  function goToStep(next, direction = 'forward') {
    const outEl = getStep(currentStep);
    const inEl  = getStep(next);
    currentStep = next;

    updateProgress(next);

    if (window.FX?.slideStep) {
      window.FX.slideStep(outEl, inEl, direction);
    } else {
      outEl.classList.remove('active');
      inEl.classList.add('active');
    }

    // Focus first input in new step
    setTimeout(() => {
      const firstInput = inEl.querySelector('input, textarea');
      if (firstInput && firstInput.type !== 'radio') firstInput.focus();
    }, 460);
  }

  /* ── Open / Close ─────────────────────────────────── */
  function openForm() {
    // Reset to step 1
    stepEls.forEach((s, i) => s.classList.toggle('active', i === 0));
    currentStep = 1;
    updateProgress(1);

    if (window.FX?.modalOpen) {
      window.FX.modalOpen(overlay, panel);
    } else {
      overlay.classList.add('visible');
    }
  }

  function closeForm() {
    if (window.FX?.modalClose) {
      window.FX.modalClose(overlay, panel);
    } else {
      overlay.classList.remove('visible');
    }
  }

  /* ── Event: open ──────────────────────────────────── */
  document.getElementById('btnOpenForm').addEventListener('click', (e) => {
    window.FX?.ripple(e.currentTarget, e, 'rgba(200,121,255,0.35)');
    setTimeout(openForm, 80);
  });

  /* ── Event: close ─────────────────────────────────── */
  document.getElementById('btnCloseForm').addEventListener('click', closeForm);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeForm(); });

  /* ── Event delegation: Next / Prev ───────────────── */
  document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.btn-next');
    const prevBtn = e.target.closest('.btn-prev');

    if (nextBtn) {
      const next = parseInt(nextBtn.dataset.next);
      if (validateStep(currentStep, e)) {
        window.FX?.ripple(nextBtn, e, 'rgba(200,121,255,0.4)');
        setTimeout(() => goToStep(next, 'forward'), 60);
      }
    }

    if (prevBtn) {
      const prev = parseInt(prevBtn.dataset.prev);
      window.FX?.ripple(prevBtn, e, 'rgba(155,48,255,0.3)');
      setTimeout(() => goToStep(prev, 'backward'), 60);
    }
  });

  /* ── Validation ───────────────────────────────────── */
  function validateStep(n, e) {
    if (n === 1) {
      const name = document.getElementById('inputName').value.trim();
      if (!name) {
        const el = document.getElementById('inputName');
        window.FX?.shake(el);
        window.FX?.glowPulse(el, 'rgba(255,80,80,0.6)');
        return false;
      }
    }
    if (n === 2) {
      const sel = document.querySelector('.theme-card.selected');
      if (!sel) {
        window.FX?.shake(document.getElementById('themeOptions'));
        // Flash all cards red briefly
        document.querySelectorAll('.theme-card').forEach(c => {
          c.style.borderColor = 'rgba(255,80,80,0.5)';
          setTimeout(() => { c.style.borderColor = ''; }, 600);
        });
        return false;
      }
    }
    if (n === 3) {
      const q = inputQ.value.trim();
      if (q.length < 5) {
        window.FX?.shake(inputQ);
        window.FX?.glowPulse(inputQ, 'rgba(255,80,80,0.6)');
        return false;
      }
    }
    return true;
  }

  /* ── Theme card selection ─────────────────────────── */
  document.querySelectorAll('.theme-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Deselect all
      document.querySelectorAll('.theme-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      window.FX?.cardSelect(btn, e);
    });
  });

  /* ── Spread option selection ──────────────────────── */
  document.querySelectorAll('.spread-card-opt').forEach(opt => {
    opt.addEventListener('click', (e) => {
      const ui = opt.querySelector('.spread-card-ui');
      window.FX?.ripple(ui, e, 'rgba(200,121,255,0.3)');
      window.FX?.glowPulse(ui, 'rgba(155,48,255,0.5)');
    });
  });

  /* ── Char counter ─────────────────────────────────── */
  if (inputQ && charCount) {
    inputQ.addEventListener('input', () => {
      const len = Math.min(inputQ.value.length, 200);
      if (inputQ.value.length > 200) inputQ.value = inputQ.value.slice(0, 200);
      charCount.textContent = `${len} / 200`;
      charCount.style.color = len > 180 ? 'rgba(255,160,80,0.8)' : 'rgba(255,255,255,0.25)';
    });
  }

  /* ── Input focus sparkle ──────────────────────────── */
  document.querySelectorAll('.mystical-input').forEach(inp => {
    inp.addEventListener('focus', (e) => {
      const rect = inp.getBoundingClientRect();
      window.FX?.burst(
        rect.left + 20,
        rect.bottom,
        6, 'rgba(155,48,255,0.6)'
      );
    });
  });

  /* ── Begin reading btn ────────────────────────────── */
  const btnBegin = document.getElementById('btnBeginReading');
  if (btnBegin) {
    btnBegin.addEventListener('click', (e) => {
      if (!validateStep(4, e)) return;
      window.FX?.ripple(btnBegin, e, 'rgba(200,121,255,0.5)');
      const rect = btnBegin.getBoundingClientRect();
      window.FX?.burst(
        rect.left + rect.width / 2,
        rect.top  + rect.height / 2,
        16, 'rgba(201,168,76,0.9)'
      );
    });
  }

  /* ── Expose API ───────────────────────────────────── */
  window.FormModule = {
    open: openForm,
    close: closeForm,
    getData() {
      return {
        name:     document.getElementById('inputName').value.trim(),
        theme:    document.querySelector('.theme-card.selected')?.dataset?.value || 'general',
        question: inputQ.value.trim(),
        spread:   parseInt(document.querySelector('input[name="spread"]:checked')?.value || '3')
      };
    }
  };
})();
