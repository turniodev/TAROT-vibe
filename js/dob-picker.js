// js/dob-picker.js — Custom Mystical DOB Drum Picker
(function () {
  'use strict';

  const ITEM_H = 44; // px height per drum item

  const MONTHS_VI = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const currentYear = new Date().getFullYear();
  const MIN_YEAR = 1920;
  const MAX_YEAR = currentYear - 16;

  /* ── Build item lists ──────────────────────────────── */
  function daysInMonth(m, y) {
    return new Date(y, m, 0).getDate(); // m is 1-based
  }

  /* ── State ─────────────────────────────────────────── */
  const state = {
    day: 1,
    month: 1,
    year: 1990,
    open: false,
  };

  /* ── DOM refs ──────────────────────────────────────── */
  const wrap = document.getElementById('dobPickerWrap');
  const display = document.getElementById('dobDisplay');
  const displayText = document.getElementById('dobDisplayText');
  const hiddenInput = document.getElementById('inputDob');
  const panel = document.getElementById('dobPanel');
  const btnConfirm = document.getElementById('dobBtnConfirm');
  const btnClear = document.getElementById('dobBtnClear');

  const drums = {
    day: { el: document.getElementById('drumDay'), track: document.getElementById('drumDayTrack') },
    month: { el: document.getElementById('drumMonth'), track: document.getElementById('drumMonthTrack') },
    year: { el: document.getElementById('drumYear'), track: document.getElementById('drumYearTrack') },
  };

  // Backdrop — covers form-panel behind the picker
  const backdrop = document.createElement('div');
  backdrop.className = 'dob-backdrop';
  backdrop.addEventListener('click', () => closePicker());


  /* ── Render a drum track ───────────────────────────── */
  function getItems(type) {
    if (type === 'day') {
      const max = daysInMonth(state.month, state.year);
      return Array.from({ length: max }, (_, i) => ({ val: i + 1, label: String(i + 1).padStart(2, '0') }));
    }
    if (type === 'month') {
      return MONTHS_VI.map((label, i) => ({ val: i + 1, label }));
    }
    if (type === 'year') {
      const years = [];
      for (let y = MAX_YEAR; y >= MIN_YEAR; y--) years.push({ val: y, label: String(y) });
      return years;
    }
    return [];
  }

  function renderDrum(type) {
    const { track } = drums[type];
    const items = getItems(type);
    track.innerHTML = items.map(it => `
      <div class="dob-drum__item" data-val="${it.val}">${it.label}</div>
    `).join('');

    // Attach click handlers
    track.querySelectorAll('.dob-drum__item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const val = parseInt(itemEl.dataset.val);
        selectValue(type, val, true);
      });
    });
  }

  function renderAll() {
    renderDrum('day');
    renderDrum('month');
    renderDrum('year');
  }

  /* ── Scroll to active item ─────────────────────────── */
  function scrollToValue(type, val, animate = false) {
    const { el, track } = drums[type];
    const items = track.querySelectorAll('.dob-drum__item');
    let idx = -1;
    items.forEach((it, i) => {
      const active = parseInt(it.dataset.val) === val;
      it.classList.toggle('active', active);
      if (active) idx = i;
    });
    if (idx < 0) return;
    // scroll-snap-align:center + track padding:44px → scrollTop = idx * ITEM_H
    const offset = idx * ITEM_H;
    if (animate) {
      el.style.scrollBehavior = 'smooth';
    } else {
      el.style.scrollBehavior = 'auto';
    }
    el.scrollTop = offset;
    setTimeout(() => { el.style.scrollBehavior = 'smooth'; }, 100);
  }

  function scrollAll(animate = false) {
    scrollToValue('day', state.day, animate);
    scrollToValue('month', state.month, animate);
    scrollToValue('year', state.year, animate);
  }

  /* ── Select a value ────────────────────────────────── */
  function selectValue(type, val, scroll = false) {
    state[type] = val;
    // If month/year changed, clamp day
    if (type === 'month' || type === 'year') {
      const maxDay = daysInMonth(state.month, state.year);
      if (state.day > maxDay) state.day = maxDay;
      renderDrum('day');
      if (scroll) scrollToValue('day', state.day, true);
    }
    if (scroll) scrollToValue(type, val, true);

    // Highlight active items
    const { track } = drums[type];
    track.querySelectorAll('.dob-drum__item').forEach(it => {
      it.classList.toggle('active', parseInt(it.dataset.val) === val);
    });
  }

  /* ── Position panel — centered inside form-overlay ── */
  function positionPanel() {
    // Center horizontally relative to .form-panel, vertically in viewport
    const formPanel = document.querySelector('.form-panel');
    if (formPanel) {
      const pr = formPanel.getBoundingClientRect();
      const panelW = Math.min(pr.width - 32, 480);
      panel.style.width = panelW + 'px';
      panel.style.left = (pr.left + (pr.width - panelW) / 2) + 'px';
      panel.style.right = 'auto';
      panel.style.top = '50%';
      panel.style.bottom = 'auto';
      panel.style.transform = 'translateY(-50%)';
    } else {
      // Fallback: dead-center in viewport
      panel.style.width = 'min(480px, calc(100vw - 40px))';
      panel.style.left = '50%';
      panel.style.top = '50%';
      panel.style.transform = 'translate(-50%, -50%)';
    }
  }

  /* ── Align selection band to drum center ────────────── */
  function alignBand() {
    const drumsEl = document.querySelector('.dob-drums');
    const drumEl = drums.day.el;
    if (!drumsEl || !drumEl) return;
    const drumsRect = drumsEl.getBoundingClientRect();
    const drumRect = drumEl.getBoundingClientRect();
    // center of drum relative to .dob-drums top
    const bandTop = (drumRect.top - drumsRect.top) + (drumRect.height / 2) - 22 + 6;
    drumsEl.style.setProperty('--band-top', bandTop + 'px');
  }

  /* ── Open / Close ──────────────────────────────────── */
  function openPicker() {
    // Move panel + backdrop into .form-overlay (shares its stacking context)
    const formOverlay = document.getElementById('formOverlay') || document.body;
    if (panel.parentElement !== formOverlay) formOverlay.appendChild(panel);
    if (backdrop.parentElement !== formOverlay) formOverlay.appendChild(backdrop);

    state.open = true;
    positionPanel();
    panel.classList.add('open');
    backdrop.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    display.classList.add('active');
    renderAll();
    setTimeout(() => { scrollAll(false); alignBand(); }, 20);
  }

  function closePicker() {
    state.open = false;
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    display.classList.remove('active');
  }

  // Reposition on scroll/resize while open
  window.addEventListener('resize', () => { if (state.open) positionPanel(); }, { passive: true });
  document.addEventListener('scroll', () => { if (state.open) positionPanel(); }, { passive: true, capture: true });

  /* ── Confirm ───────────────────────────────────────── */
  function confirm() {
    const d = String(state.day).padStart(2, '0');
    const m = String(state.month).padStart(2, '0');
    const y = state.year;
    const iso = `${y}-${m}-${d}`;
    hiddenInput.value = iso;
    displayText.textContent = `${d} / ${m} / ${y}`;
    wrap.classList.add('has-value');

    // Sparkle effect
    if (window.FX?.burst) {
      const rect = display.getBoundingClientRect();
      window.FX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10, 'rgba(201,168,76,0.9)');
    }
    closePicker();
  }

  /* ── Clear ─────────────────────────────────────────── */
  function clear() {
    hiddenInput.value = '';
    displayText.textContent = 'Chọn ngày sinh của bạn';
    wrap.classList.remove('has-value');
    closePicker();
  }

  /* ── Scroll-snap detection ─────────────────────────── */
  function attachScrollSnap(type) {
    const { el, track } = drums[type];
    let scrollTimer;

    function onScroll() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollTop = el.scrollTop;
        const idx = Math.round(scrollTop / ITEM_H);
        const items = track.querySelectorAll('.dob-drum__item');
        const item = items[idx];
        if (item) {
          const val = parseInt(item.dataset.val);
          selectValue(type, val, false);
          // snap
          el.style.scrollBehavior = 'smooth';
          el.scrollTop = idx * ITEM_H;
          // highlight
          items.forEach(it => it.classList.toggle('active', parseInt(it.dataset.val) === val));
        }
      }, 80);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Touch / Mouse drag (additional) ──────────────── */
  function attachDrag(type) {
    const { el } = drums[type];
    let startY = 0, startScroll = 0, dragging = false;

    el.addEventListener('mousedown', e => {
      dragging = true;
      startY = e.clientY;
      startScroll = el.scrollTop;
      el.style.scrollBehavior = 'auto';
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      el.scrollTop = startScroll - (e.clientY - startY);
    });
    document.addEventListener('mouseup', () => { dragging = false; });
  }

  /* ── Keyboard on display button ────────────────────── */
  display.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      state.open ? closePicker() : openPicker();
    }
    if (e.key === 'Escape') closePicker();
  });

  /* ── Click toggle ──────────────────────────────────── */
  display.addEventListener('click', () => {
    state.open ? closePicker() : openPicker();
  });

  /* ── Outside click close ───────────────────────────── */
  document.addEventListener('click', e => {
    if (state.open && !wrap.contains(e.target) && !panel.contains(e.target)) closePicker();
  });

  /* ── Confirm / Clear buttons ───────────────────────── */
  btnConfirm.addEventListener('click', e => { e.stopPropagation(); confirm(); });
  btnClear.addEventListener('click', e => { e.stopPropagation(); clear(); });

  /* ── Init ──────────────────────────────────────────── */
  function init() {
    // Set sensible default
    state.day = 1;
    state.month = 1;
    state.year = 1990;

    attachScrollSnap('day');
    attachScrollSnap('month');
    attachScrollSnap('year');
    attachDrag('day');
    attachDrag('month');
    attachDrag('year');
  }

  /* ── Public API for form.js pre-fill ──────────────── */
  window.DobPicker = {
    setValue(isoString) {
      if (!isoString) return;
      const [y, m, d] = isoString.split('-').map(Number);
      if (!y || !m || !d) return;
      state.year = y;
      state.month = m;
      state.day = d;
      hiddenInput.value = isoString;
      const ds = String(d).padStart(2, '0');
      const ms = String(m).padStart(2, '0');
      displayText.textContent = `${ds} / ${ms} / ${y}`;
      wrap.classList.add('has-value');
    },
    getValue() { return hiddenInput.value; },
    clear,
  };

  init();
})();
