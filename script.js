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

// smooth project card expand: measure real height before animating
document.querySelectorAll('.project-card-link').forEach(link => {
  const card = link.querySelector('.project-card');
  if (!card) return;

  link.addEventListener('mouseenter', () => {
    // Snapshot true height with no constraint
    card.style.transition = 'none';
    card.style.maxHeight = 'none';
    const fullH = card.scrollHeight;
    // Reset to collapsed without transition, then animate
    card.style.maxHeight = '220px';
    card.offsetHeight; // force reflow so browser registers the reset
    card.style.transition = 'max-height 0.6s cubic-bezier(0.34, 1.02, 0.68, 1), box-shadow 0.4s ease, background 0.25s ease, border-color 0.25s ease';
    card.style.maxHeight = fullH + 'px';
  });

  link.addEventListener('mouseleave', () => {
    card.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, background 0.25s ease, border-color 0.25s ease';
    card.style.maxHeight = '220px';
  });
});
