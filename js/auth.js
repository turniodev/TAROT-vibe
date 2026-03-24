// js/auth.js — Google Sign-In (GSI) management
window.AuthModule = (function () {

  const CLIENT_ID = '641158233158-nsg8a8tdsj3fdgb34dc9tugm8god7tho.apps.googleusercontent.com'; // ← thay bằng ClientID thật
  const STORE_KEY = 'tbhb_guser';

  let _user = null;    // { name, email, picture, id_token }
  let _loginCb = null; // callback after successful login

  /* ── Load saved session ──────────────────────────── */
  (function init() {
    try {
      const s = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null');
      if (s?.id_token) _user = s;
    } catch { }
  })();

  /* ── Check logged in ─────────────────────────────── */
  function isLoggedIn() { return !!_user; }
  function getUser() { return _user; }
  function getToken() { return _user?.id_token || null; }

  /* ── Show login modal, then call cb on success ─────── */
  function requireLogin(callback) {
    if (_user) { callback(_user); return; }
    _loginCb = callback;
    showModal();
  }

  /* ── Logout ──────────────────────────────────────── */
  function logout() {
    _user = null;
    sessionStorage.removeItem(STORE_KEY);
    google?.accounts?.id?.disableAutoSelect();
    renderUserBadge();
  }

  /* ── Modal ───────────────────────────────────────── */
  function showModal() {
    document.getElementById('googleLoginModal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'googleLoginModal';
    modal.className = 'google-login-overlay';
    modal.innerHTML = `
      <div class="google-login-box">
        <div class="google-login-icon">✦</div>
        <h2 class="google-login-title">Đăng Nhập Để Luận Giải</h2>
        <p class="google-login-desc">
          Kết nối tài khoản Google để nhận bài luận giải AI cá nhân hóa,
          lưu lịch sử và theo dõi hành trình của bạn.
        </p>
        <div id="googleLoginBtn" class="google-btn-wrap"></div>
        <button class="google-login-cancel" id="googleLoginCancel">Bỏ qua lần này</button>
      </div>`;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    modal.querySelector('#googleLoginCancel').addEventListener('click', () => {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
      _loginCb = null;
    });

    // Render Google button after DOM ready
    setTimeout(() => renderGoogleBtn('googleLoginBtn', true), 50);
  }

  /* ── Render Google button ────────────────────────── */
  function renderGoogleBtn(containerId, large = false) {
    const el = document.getElementById(containerId);
    if (!el || !window.google?.accounts?.id) {
      // GSI not loaded yet — retry
      setTimeout(() => renderGoogleBtn(containerId, large), 300);
      return;
    }
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredential,
      auto_select: false,
    });
    google.accounts.id.renderButton(el, {
      type: 'standard',
      theme: 'filled_black',
      size: large ? 'large' : 'medium',
      text: 'signin_with',
      shape: 'pill',
      locale: 'vi',
    });
  }

  /* ── Handle credential response ──────────────────── */
  function handleCredential(resp) {
    const token = resp.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    _user = {
      id_token: token,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
    sessionStorage.setItem(STORE_KEY, JSON.stringify(_user));

    // Close modal
    const modal = document.getElementById('googleLoginModal');
    if (modal) { modal.classList.remove('visible'); setTimeout(() => modal.remove(), 300); }

    renderUserBadge();

    if (_loginCb) { const cb = _loginCb; _loginCb = null; cb(_user); }
  }

  /* ── User badge in header ────────────────────────── */
  function renderUserBadge() {
    let badge = document.getElementById('userBadge');
    if (!badge) return;
    if (!_user) {
      badge.innerHTML = '';
      return;
    }
    badge.innerHTML = `
      <img src="${_user.picture}" class="user-avatar" alt="${_user.name}" title="${_user.name}"/>
      <button class="user-logout" id="btnLogout" title="Đăng xuất">✕</button>`;
    badge.querySelector('#btnLogout')?.addEventListener('click', logout);
  }

  return { isLoggedIn, getUser, getToken, requireLogin, logout, renderUserBadge };
})();
