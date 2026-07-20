'use strict';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  nav?.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');

langBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = langBtn.getAttribute('aria-expanded') === 'true';
  langBtn.setAttribute('aria-expanded', String(!isOpen));
  langDropdown?.classList.toggle('open', !isOpen);
});

document.addEventListener('click', () => {
  langBtn?.setAttribute('aria-expanded', 'false');
  langDropdown?.classList.remove('open');
});

langDropdown?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    langDropdown.classList.remove('open');
    langBtn?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

const FORM_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = 'fd6abb15-4e6c-4b97-bfb0-9d43a2da797d';

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please check the required fields.';
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  data.access_key = ACCESS_KEY;

  status.textContent = 'Sending...';
  form.querySelector('button').disabled = true;

  fetch(FORM_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  }).then((res) => res.json()).then((res) => {
    if (res.success) {
      status.textContent = 'Thank you! Your request has been received.';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please try again.';
    }
  }).catch(() => {
    status.textContent = 'Something went wrong. Please try again.';
  }).finally(() => {
    form.querySelector('button').disabled = false;
  });
});
