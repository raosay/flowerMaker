/**
 * Flority enhancements: PWA install, draft autosave, sheet gestures,
 * offline wall, and mobile polish. Depends on globals from app.js.
 */
(function () {
  'use strict';

  const DRAFT_KEY = 'flority-draft-v1';
  const WALL_KEY = 'flority-local-wall-v1';
  const INSTALL_DISMISS_KEY = 'flority-install-dismissed';
  const MAX_LOCAL_WALL = 24;

  // ---- Backdrop for mobile sheets ----
  const backdrop = document.getElementById('sheetBackdrop');

  function sheetOpen() {
    return document.querySelector('.palette.open, .props.open');
  }

  function syncBackdrop() {
    if (!backdrop) return;
    if (window.innerWidth > 768) {
      backdrop.classList.remove('show');
      return;
    }
    backdrop.classList.toggle('show', !!sheetOpen());
  }
  window.__floritySyncBackdrop = syncBackdrop;

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      if (typeof setTab === 'function' && typeof activeTab !== 'undefined' && activeTab) {
        // Close by re-tapping current tab logic
        const tab = activeTab;
        activeTab = tab; // ensure toggle path
        setTab(tab);
      } else {
        document.querySelector('.palette')?.classList.remove('open');
        document.querySelector('.props')?.classList.remove('open');
        document.querySelectorAll('.mtab').forEach((t) => t.classList.remove('on'));
        if (typeof activeTab !== 'undefined') activeTab = null;
        syncBackdrop();
      }
    });
  }

  // ---- Swipe-down to dismiss bottom sheets ----
  function enableSheetSwipe(sheetEl) {
    if (!sheetEl) return;
    const handle = sheetEl.querySelector('.sheet-handle') || sheetEl;
    let startY = 0;
    let currentY = 0;
    let dragging = false;

    const onStart = (y) => {
      if (window.innerWidth > 768) return;
      if (!sheetEl.classList.contains('open')) return;
      startY = y;
      currentY = y;
      dragging = true;
      sheetEl.style.transition = 'none';
    };
    const onMove = (y, e) => {
      if (!dragging) return;
      currentY = y;
      const dy = Math.max(0, currentY - startY);
      if (dy > 0 && e.cancelable) e.preventDefault();
      sheetEl.style.transform = `translateY(${dy}px)`;
      if (backdrop) backdrop.style.opacity = String(Math.max(0.1, 1 - dy / 280));
    };
    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      const dy = Math.max(0, currentY - startY);
      sheetEl.style.transition = '';
      sheetEl.style.transform = '';
      if (backdrop) backdrop.style.opacity = '';
      if (dy > 90) {
        if (typeof setTab === 'function' && typeof activeTab !== 'undefined' && activeTab) {
          setTab(activeTab);
        } else {
          sheetEl.classList.remove('open');
          document.querySelectorAll('.mtab').forEach((t) => t.classList.remove('on'));
          if (typeof activeTab !== 'undefined') activeTab = null;
          syncBackdrop();
        }
      }
    };

    handle.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length !== 1) return;
        onStart(e.touches[0].clientY);
      },
      { passive: true }
    );
    handle.addEventListener(
      'touchmove',
      (e) => {
        if (!dragging || e.touches.length !== 1) return;
        onMove(e.touches[0].clientY, e);
      },
      { passive: false }
    );
    handle.addEventListener('touchend', onEnd, { passive: true });
    handle.addEventListener('touchcancel', onEnd, { passive: true });
  }

  enableSheetSwipe(document.querySelector('.palette'));
  enableSheetSwipe(document.querySelector('.props'));

  // ---- Draft autosave / restore ----
  function serializeDraft() {
    if (typeof placed === 'undefined') return null;
    const activeBg = document.querySelector('.bgsw.on');
    return {
      v: 1,
      bg: activeBg ? activeBg.dataset.bg : '#0a0a0a',
      vase: typeof vaseId !== 'undefined' ? vaseId : 'v00',
      zc: typeof zc !== 'undefined' ? zc : 10,
      p: placed.map((d) => ({
        id: d.f.id,
        x: Math.round(d.x),
        y: Math.round(d.y),
        sz: Math.round(d.sz),
        rot: Math.round(d.rot),
        op: d.op,
        fl: d.flip === 'none' ? 0 : d.flip === 'h' ? 1 : 2,
        z: d.z,
        st: d.stem ? 1 : 0,
        tx: d.text || '',
      })),
      savedAt: Date.now(),
    };
  }

  let saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        const draft = serializeDraft();
        if (!draft) return;
        if (!draft.p.length) {
          localStorage.removeItem(DRAFT_KEY);
          return;
        }
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch (err) {
        console.warn('[Flority] draft save failed', err);
      }
    }, 350);
  }
  window.__florityOnChange = scheduleSave;

  window.__florityRestoreDraft = function restoreDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return false;
      const state = JSON.parse(raw);
      if (!state || !state.p || !state.p.length) return false;
      if (typeof placed === 'undefined' || placed.length) return false;

      if (state.bg) {
        const bgEl = document.querySelector('.bgsw[data-bg="' + state.bg + '"]');
        if (bgEl && typeof setBg === 'function') setBg(bgEl);
      }
      if (state.vase && typeof setVase === 'function') {
        setVase(state.vase, { silent: true });
      }
      const flipMap = ['none', 'h', 'v'];
      state.p.forEach((p) => {
        const f = FLOWERS.find((fl) => fl.id === p.id);
        if (!f) return;
        const uid = 'p' + Date.now() + Math.random().toString(36).slice(2);
        const d = {
          uid,
          f,
          x: p.x,
          y: p.y,
          sz: p.sz,
          rot: p.rot,
          op: p.op,
          flip: flipMap[p.fl] || 'none',
          z: p.z,
          stem: p.st === 1,
          text: p.tx || '',
        };
        if (typeof zc !== 'undefined') zc = Math.max(zc, p.z);
        placed.push(d);
        render(d);
      });
      if (typeof sel === 'function') sel(null);
      if (typeof ui === 'function') ui();
      if (typeof toast === 'function') toast('草稿已恢复 ✓');
      return true;
    } catch (err) {
      console.warn('[Flority] draft restore failed', err);
      return false;
    }
  };

  // Also save after slider tweaks (no ui() call)
  ['sz', 'rot', 'op'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', scheduleSave);
    if (el) el.addEventListener('input', scheduleSave);
  });

  // ---- Local wall storage ----
  window.__florityGetLocalWall = function () {
    try {
      return JSON.parse(localStorage.getItem(WALL_KEY) || '[]');
    } catch {
      return [];
    }
  };

  window.__floritySaveLocalWall = function (item) {
    const list = window.__florityGetLocalWall();
    list.unshift(item);
    while (list.length > MAX_LOCAL_WALL) list.pop();
    // data URLs are large — if quota exceeded, drop oldest
    try {
      localStorage.setItem(WALL_KEY, JSON.stringify(list));
    } catch {
      while (list.length > 1) {
        list.pop();
        try {
          localStorage.setItem(WALL_KEY, JSON.stringify(list));
          break;
        } catch {
          /* continue shrinking */
        }
      }
    }
  };

  // Enhance loadWall empty state when offline with local items
  const _loadWall = typeof loadWall === 'function' ? loadWall : null;
  if (_loadWall) {
    window.loadWall = async function patchedLoadWall() {
      await _loadWall();
      const local = window.__florityGetLocalWall();
      if (local.length && typeof renderWall === 'function') {
        document.getElementById('wallEmpty').style.display = 'none';
        document.getElementById('wallLoading').style.display = 'none';
        renderWall();
      }
    };
  }

  // ---- Offline indicator ----
  const offlinePill = document.getElementById('offlinePill');
  function syncOnline() {
    if (!offlinePill) return;
    offlinePill.hidden = navigator.onLine;
  }
  window.addEventListener('online', syncOnline);
  window.addEventListener('offline', syncOnline);
  syncOnline();

  // ---- PWA install prompt ----
  let deferredPrompt = null;
  const banner = document.getElementById('installBanner');
  const installBtn = document.getElementById('installBtn');
  const installDismiss = document.getElementById('installDismiss');

  function canShowInstall() {
    if (!banner) return false;
    if (window.matchMedia('(display-mode: standalone)').matches) return false;
    if (navigator.standalone) return false;
    if (localStorage.getItem(INSTALL_DISMISS_KEY) === '1') return false;
    return true;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (canShowInstall()) {
      // Delay so it doesn't fight the first-run canvas
      setTimeout(() => {
        banner.hidden = false;
      }, 1800);
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        banner.hidden = true;
        return;
      }
      deferredPrompt.prompt();
      try {
        await deferredPrompt.userChoice;
      } catch {
        /* ignore */
      }
      deferredPrompt = null;
      banner.hidden = true;
    });
  }
  if (installDismiss) {
    installDismiss.addEventListener('click', () => {
      localStorage.setItem(INSTALL_DISMISS_KEY, '1');
      banner.hidden = true;
    });
  }

  // iOS install hint (no beforeinstallprompt)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS && canShowInstall() && !window.navigator.standalone) {
    setTimeout(() => {
      if (banner && banner.hidden) {
        const copy = banner.querySelector('.install-copy span');
        if (copy) copy.textContent = '点击分享，然后选择「添加到主屏幕」';
        if (installBtn) installBtn.hidden = true;
        banner.hidden = false;
      }
    }, 2400);
  }

  // ---- Visual viewport: keep stage usable when mobile keyboard opens ----
  if (window.visualViewport) {
    const onVV = () => {
      document.documentElement.style.setProperty(
        '--vvh',
        window.visualViewport.height + 'px'
      );
      if (typeof scaleStage === 'function') scaleStage();
    };
    window.visualViewport.addEventListener('resize', onVV);
    window.visualViewport.addEventListener('scroll', onVV);
  }

  // ---- Prevent double-tap zoom on controls (iOS) ----
  let lastTouchEnd = 0;
  document.addEventListener(
    'touchend',
    (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300 && e.target.closest('.pf, .mtab, .fi, .btn, .cbtn')) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );

  // ---- Touch drag visual class ----
  const origStartDrag = typeof startDrag === 'function' ? startDrag : null;
  // Observe selected flower touch moves via event delegation
  document.addEventListener(
    'touchstart',
    (e) => {
      const pf = e.target.closest('.pf');
      if (pf) pf.classList.add('dragging-touch');
    },
    { passive: true }
  );
  document.addEventListener(
    'touchend',
    () => {
      document.querySelectorAll('.pf.dragging-touch').forEach((el) => {
        el.classList.remove('dragging-touch');
      });
      scheduleSave();
    },
    { passive: true }
  );

  // ---- Register service worker fallback when vite-plugin not injecting ----
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // vite-plugin-pwa injects virtual:pwa-register in module builds;
      // for classic scripts, try optional manual registration of generated SW
      const candidates = ['sw.js', 'dev-sw.js?dev-sw', 'service-worker.js'];
      // Only register if not already controlled and no vite register present
      if (navigator.serviceWorker.controller) return;
      // Vite PWA in dev uses different paths; skip aggressive register here
      // Production build injects registration via plugin transform of index
    });
  }

  // Close sheets on orientation change / resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelector('.palette')?.classList.remove('open');
      document.querySelector('.props')?.classList.remove('open');
      document.querySelectorAll('.mtab').forEach((t) => t.classList.remove('on'));
      if (typeof activeTab !== 'undefined') activeTab = null;
    }
    syncBackdrop();
  });

  // Initial
  syncBackdrop();

  // Restore draft after app.js init if hash empty
  // (app.js already calls this at end; call again safely as no-op if filled)
  if (!location.hash) {
    // slight delay to ensure app.js finished
    setTimeout(() => {
      if (typeof placed !== 'undefined' && !placed.length) {
        window.__florityRestoreDraft();
      }
    }, 0);
  }
})();
