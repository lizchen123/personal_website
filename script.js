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

// scroll to matching project card and auto-expand it
document.querySelectorAll('.skill-item[href^="#project-"]').forEach((skillLink) => {
  skillLink.addEventListener('click', () => {
    const targetId = skillLink.getAttribute('href');
    if (!targetId) return;
    const targetCard = document.querySelector(targetId);
    if (!(targetCard instanceof HTMLElement)) return;

    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const link = targetCard.closest('.project-card-link');
    if (!link) return;

    // pin the card open after scroll settles
    setTimeout(() => {
      link.classList.add('pinned');
    }, 600);

    // unpin when the user moves the mouse onto or away from the card
    const unpin = () => {
      link.classList.remove('pinned');
      link.removeEventListener('mouseenter', unpin);
      link.removeEventListener('mouseleave', unpin);
    };
    link.addEventListener('mouseenter', unpin);
    link.addEventListener('mouseleave', unpin);
  });
});
