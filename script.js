// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Project card expansion on hover
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
    }, 1000);
  });

  link.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    // Don't collapse if card is already expanded
    if (expandedCard === card && !card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      projectOverlay.classList.remove('active');
      expandedCard = null;
    }
  });
});

// Close expanded card when clicking overlay
projectOverlay.addEventListener('click', () => {
  if (expandedCard) {
    expandedCard.classList.remove('expanded');
    projectOverlay.classList.remove('active');
    expandedCard = null;
  }
});

// Prevent overlay click from bubbling
document.addEventListener('click', (e) => {
  if (e.target === projectOverlay && expandedCard) {
    expandedCard.classList.remove('expanded');
    projectOverlay.classList.remove('active');
    expandedCard = null;
  }
});

// Close expanded card with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && expandedCard) {
    expandedCard.classList.remove('expanded');
    projectOverlay.classList.remove('active');
    expandedCard = null;
  }
});

// Navigate to project page when clicking on expanded card
projectCards.forEach(card => {
  const link = card.closest('.project-card-link');
  link.addEventListener('click', (e) => {
    if (card.classList.contains('expanded')) {
      e.preventDefault();
      window.location.href = link.href;
    }
  });
});
