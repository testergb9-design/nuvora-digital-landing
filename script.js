const header = document.querySelector('[data-elevate]');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav a');
const revealItems = document.querySelectorAll('.reveal');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

const syncHeader = () => {
  header.classList.toggle('is-elevated', window.scrollY > 12);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));
