// Waitlist form and the swipe dots on phones. No tracking, no third-party scripts.
(function () {
  'use strict';

  // Where sign-ups are sent. This is the small server function in api/waitlist.js.
  var ENDPOINT = '/api/waitlist';

  var form = document.getElementById('wl-form');
  var done = document.getElementById('wl-done');
  var nameEl = document.getElementById('wl-name');
  var contactEl = document.getElementById('wl-contact');
  var honeypot = document.getElementById('wl-company');
  var button = document.getElementById('wl-submit');
  var nameErr = document.getElementById('wl-name-err');
  var contactErr = document.getElementById('wl-contact-err');
  var formErr = document.getElementById('wl-form-err');

  function checkContact(value) {
    var t = value.trim();
    if (!t) return 'Add a phone number or an email so we can reach you.';
    if (t.indexOf('@') !== -1) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)
        ? ''
        : 'That email looks incomplete. Check it has a name, an @ and an ending like .com.';
    }
    if (/[a-zA-Z]/.test(t)) return 'Enter a phone number or an email address.';
    var digits = t.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15
      ? ''
      : 'That phone number looks too short. Include the area code.';
  }

  function show(el, input, message) {
    el.textContent = message;
    el.hidden = !message;
    if (input) {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
  }

  function setSending(sending) {
    button.disabled = sending;
    button.textContent = sending ? 'Adding you…' : 'Join the waitlist';
  }

  nameEl.addEventListener('input', function () { show(nameErr, nameEl, ''); });
  contactEl.addEventListener('input', function () { show(contactErr, contactEl, ''); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (button.disabled) return;

    var name = nameEl.value.trim();
    var contact = contactEl.value.trim();
    var nameMsg = name ? '' : 'Tell us your name so we know who to write to.';
    var contactMsg = checkContact(contact);
    show(nameErr, nameEl, nameMsg);
    show(contactErr, contactEl, contactMsg);
    show(formErr, null, '');
    if (nameMsg || contactMsg) {
      (nameMsg ? nameEl : contactEl).focus();
      return;
    }

    setSending(true);
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, contact: contact, company: honeypot.value }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('status ' + res.status);
        document.getElementById('wl-first').textContent = name.split(/\s+/)[0] || 'friend';
        document.getElementById('wl-shown').textContent = contact;
        form.hidden = true;
        done.hidden = false;
        done.setAttribute('tabindex', '-1');
        done.focus();
      })
      .catch(function () {
        show(formErr, null, "We couldn't add you just now. Check your connection and try again in a moment.");
      })
      .then(function () { setSending(false); });
  });

  document.getElementById('wl-again').addEventListener('click', function () {
    form.reset();
    done.hidden = true;
    form.hidden = false;
    nameEl.focus();
  });

  // Swipe dots under the three feature cards (phones only; hidden by CSS elsewhere).
  var cards = document.getElementById('cards');
  var dots = document.querySelectorAll('.dots span');
  if (cards && dots.length) {
    var ticking = false;
    cards.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var first = cards.children[0];
        var second = cards.children[1];
        var step = second ? second.offsetLeft - first.offsetLeft : 1;
        var i = Math.max(0, Math.min(dots.length - 1, Math.round(cards.scrollLeft / step)));
        for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('on', d === i);
      });
    }, { passive: true });
  }
})();
