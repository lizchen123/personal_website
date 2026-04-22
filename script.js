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

function closeExpandedCard() {
  if (!expandedCard) return;
  expandedCard.classList.remove('expanded');
  projectOverlay.classList.remove('active');
  expandedCard = null;
}

function openProjectCard(card) {
  if (!card) return;
  clearTimeout(hoverTimeout);

  if (expandedCard && expandedCard !== card) {
    expandedCard.classList.remove('expanded');
  }

  expandedCard = card;
  card.classList.add('expanded');
  projectOverlay.classList.add('active');
}

projectCards.forEach(card => {
  const link = card.closest('.project-card-link');
  
  link.addEventListener('mouseenter', () => {
    if (expandedCard) return;
    hoverTimeout = setTimeout(() => {
      openProjectCard(card);
    }, 1500); // maybe let this be longer depending on user testing
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
    closeExpandedCard();
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

// scroll to matching project card and expand it.
document.querySelectorAll('.skill-item[href^="#project-"]').forEach((skillLink) => {
  skillLink.addEventListener('click', (e) => {
    const targetId = skillLink.getAttribute('href');
    if (!targetId) return;

    const targetCard = document.querySelector(targetId);
    if (!(targetCard instanceof HTMLElement) || !targetCard.classList.contains('project-card')) {
      return;
    }

    window.scrollTo({ block: 'center', behavior: 'smooth' });

    window.setTimeout(() => {
      openProjectCard(targetCard);
    }, 500);
  });
});
