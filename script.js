'use strict';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
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

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'يرجى التحقق من الحقول المطلوبة.';
    return;
  }

  status.textContent = 'تم التحقق من البيانات. اربط النموذج بخادم آمن لإتمام الإرسال.';
  form.reset();
});
