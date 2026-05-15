// shadow for scrolling
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// scroll reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// scroll to matching project card
document.querySelectorAll('.skill-item[href^="#"]').forEach((skillLink) => {
  skillLink.addEventListener('click', (e) => {
    const targetId = skillLink.getAttribute('href');
    if (!targetId) return;
    const targetCard = document.querySelector(targetId);
    if (targetCard instanceof HTMLElement) {
      e.preventDefault();
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// hero slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
  let heroIdx = 0;
  setInterval(() => {
    heroSlides[heroIdx].classList.remove('active');
    heroIdx = (heroIdx + 1) % heroSlides.length;
    heroSlides[heroIdx].classList.add('active');
  }, 2800); // 2s visible + 0.8s fade
}
