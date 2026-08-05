/* ============================================================
   J. McCarthy Books — site behaviour
   Progressive enhancement only. Every page works without this.
   ============================================================ */
(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || { joseon: { retailers: [] }, falcon: {} };

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) { yr.textContent = new Date().getFullYear(); }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('is-open')) { setNav(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     RETAILER BUTTONS
     Any <div data-retailers></div> is populated from retailers.js.
     Live URLs render as buttons; unset ones render as quiet chips.
     ============================================================ */
  var all = (cfg.joseon && cfg.joseon.retailers) || [];
  var live = all.filter(function (r) { return r.url; });
  var pending = all.filter(function (r) { return !r.url; });
  var verb = (cfg.joseon && cfg.joseon.onSale) ? 'Buy' : 'Preorder';

  document.querySelectorAll('[data-retailers]').forEach(function (host) {
    host.innerHTML = '';
    if (live.length) {
      live.forEach(function (r) {
        var a = document.createElement('a');
        a.className = 'retailer';
        a.href = r.url;
        a.rel = 'noopener';
        a.target = '_blank';
        a.innerHTML = r.name +
          '<span class="u-sr-only"> — ' + verb.toLowerCase() +
          ' The Joseon Retrospective (opens in a new tab)</span>';
        host.appendChild(a);
      });
    } else {
      pending.forEach(function (r) {
        var s = document.createElement('span');
        s.className = 'retailer retailer--pending';
        s.setAttribute('aria-disabled', 'true');
        s.innerHTML = r.name + '<em>Link coming</em>';
        host.appendChild(s);
      });
    }
  });

  /* Blocks shown only before / only after links go live. */
  document.querySelectorAll('[data-when="no-links"]').forEach(function (el) {
    el.hidden = live.length > 0;
  });
  document.querySelectorAll('[data-when="links"]').forEach(function (el) {
    el.hidden = live.length === 0;
  });

  /* Swap "Preorder" → "Buy" once the book is on sale. */
  document.querySelectorAll('[data-buy-verb]').forEach(function (el) {
    el.textContent = el.textContent.replace(/Preorder|Buy/, verb);
  });

  /* ============================================================
     BOOK PAGE — ebook preorder button (Books2Read universal link)
     Two states, driven by cfg.joseon.books2readUrl:
       set   → "Preorder the ebook · $4.99" → the link
       empty → "Tell me the moment preorders open" → newsletter
     Also reveals the "Read the opening pages" button only once the
     /excerpt page exists (cfg.joseon.excerptLive).
     ============================================================ */
  var b2r = (cfg.joseon && cfg.joseon.books2readUrl) || '';
  document.querySelectorAll('[data-preorder-ebook]').forEach(function (a) {
    if (b2r) {
      a.href = b2r;
      a.textContent = 'Preorder the ebook · $4.99';
      a.setAttribute('rel', 'noopener');
      a.setAttribute('target', '_blank');
    } else {
      a.href = '/the-file';
      a.textContent = 'Tell me the moment preorders open';
      a.removeAttribute('target');
    }
  });
  var excerptLive = !!(cfg.joseon && cfg.joseon.excerptLive);
  document.querySelectorAll('[data-when="excerpt"]').forEach(function (el) {
    el.hidden = !excerptLive;
    if (excerptLive) { el.setAttribute('href', '/excerpt'); }
  });

  /* Goodreads "Want to Read" buttons — shown only once the book's
     Goodreads URL is set in retailers.js. */
  var grUrl = (cfg.joseon && cfg.joseon.goodreadsBookUrl) || '';
  document.querySelectorAll('[data-goodreads]').forEach(function (el) {
    if (grUrl) {
      el.hidden = false;
      el.setAttribute('href', grUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.hidden = true;
    }
  });

  /* ============================================================
     /advance-copies — request links (§5)
     Each [data-arc="key"] link uses its real URL from cfg.arc when
     set (opening in a new tab); while empty it keeps its no-JS-safe
     fallback href (/the-file) and swaps to the text in
     data-arc-fallback. The BookSirens card is revealed only when a
     URL exists.
     ============================================================ */
  var arc = cfg.arc || {};
  function gateArc(key, url) {
    document.querySelectorAll('[data-arc="' + key + '"]').forEach(function (a) {
      if (url) {
        a.href = url;
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      } else {
        var fb = a.getAttribute('data-arc-fallback');
        if (fb) { a.textContent = fb; }
      }
    });
  }
  gateArc('booksprout', arc.booksproutUrl || '');
  gateArc('form', arc.requestFormUrl || '');
  gateArc('booksirens', arc.bookSirensUrl || '');
  document.querySelectorAll('[data-arc-card="booksirens"]').forEach(function (el) {
    el.hidden = !(arc.bookSirensUrl);
  });

  /* ============================================================
     /falcon — converts to a preorder redirect when one exists
     ============================================================ */
  var falconUrl = (cfg.falcon || {}).preorderUrl;
  if (falconUrl) {
    document.querySelectorAll('[data-falcon="signup"]').forEach(function (el) { el.hidden = true; });
    document.querySelectorAll('[data-falcon="preorder"]').forEach(function (el) {
      el.hidden = false;
      el.querySelectorAll('[data-falcon-link]').forEach(function (a) { a.href = falconUrl; });
    });
  }

  /* ============================================================
     KIT NEWSLETTER FORMS  (Kit form ID 9696841)
     Posts in the background so the reader never leaves the page.
     Without JS the form does a normal POST to Kit's hosted page.
     ============================================================ */
  document.querySelectorAll('form[data-newsletter]').forEach(function (form) {
    var msg = form.querySelector('[data-form-msg]');
    var btn = form.querySelector('button[type="submit"]');
    var defaultMsg = msg ? msg.innerHTML : '';
    var successMsg = form.getAttribute('data-success') ||
      'Filed. Check your inbox — the first document is on its way.';

    form.addEventListener('submit', function (e) {
      var email = form.querySelector('input[type="email"]');

      if (!email || !email.value || !email.checkValidity()) {
        e.preventDefault();
        if (msg) { msg.classList.add('is-error'); msg.textContent = 'Please enter a valid email address.'; }
        if (email) { email.focus(); }
        return;
      }
      if (!window.fetch) { return; } // very old browser: native POST

      e.preventDefault();
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Filing…'; }
      if (msg) { msg.classList.remove('is-error'); msg.textContent = ''; }

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) { throw new Error('Kit responded ' + res.status); }
        form.innerHTML = '<p class="form-success" role="status">' +
          '<span aria-hidden="true">✓</span> ' + successMsg + '</p>';
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = original; }
        if (msg) {
          msg.classList.add('is-error');
          msg.innerHTML = 'That didn’t go through. Please try again, or email ' +
            '<a href="mailto:contact@jmccarthybooks.com">contact@jmccarthybooks.com</a> ' +
            'and I’ll add you by hand.';
        }
      });
    });

    /* Clear a stale error once the reader starts typing again. */
    form.addEventListener('input', function () {
      if (msg && msg.classList.contains('is-error')) {
        msg.classList.remove('is-error');
        msg.innerHTML = defaultMsg;
      }
    });
  });
})();
