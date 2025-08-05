// Simple script for: 1) toggle mobile nav 2) highlight active nav on scroll 3) header scrolled class
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const header = document.getElementById('site-header');
  const sections = navLinks.map(l => document.querySelector(l.getAttribute('href')));

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight - 8),
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection observer to update active nav link
  const observerOptions = {
    root: null,
    rootMargin: `-${header.offsetHeight - 10}px 0px -40% 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => {
    if (sec) observer.observe(sec);
  });

  // header background on scroll
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Set footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
