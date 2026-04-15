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

// hover to expand
const projectCards = document.querySelectorAll('.project-card');
const projectOverlay = document.querySelector('.project-overlay');
let expandedCard = null;
let hoverTimeout = null;

projectCards.forEach(card => {
  const link = card.closest('.project-card-link');
  
  link.addEventListener('mouseenter', () => {
    if (expandedCard) return;
    hoverTimeout = setTimeout(() => {
      expandedCard = card;
      card.classList.add('expanded');
      projectOverlay.classList.add('active');
    }, 1000); // maybe let this be longer depending on user testing
  });

  link.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    if (expandedCard === card && !card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      projectOverlay.classList.remove('active');
      expandedCard = null;
    }
  });
});

// click outside to close
document.addEventListener('click', (e) => {
  if (e.target === projectOverlay && expandedCard) {
    expandedCard.classList.remove('expanded');
    projectOverlay.classList.remove('active');
    expandedCard = null;
  }
});

// click inside to go to project page
projectCards.forEach(card => {
  const link = card.closest('.project-card-link');
  link.addEventListener('click', (e) => {
    if (card.classList.contains('expanded')) {
      e.preventDefault();
      window.location.href = link.href;
    }
  });
});
