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
document.querySelectorAll('.skill-item[href^="#project-"]').forEach((skillLink) => {
  skillLink.addEventListener('click', () => {
    const targetId = skillLink.getAttribute('href');
    if (!targetId) return;
    const targetCard = document.querySelector(targetId);
    if (targetCard instanceof HTMLElement) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
