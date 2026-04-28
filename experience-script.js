// Experience Page Interactions

// shadow for scrolling
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal animation for experience items
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal items
document.querySelectorAll('.reveal-item, .meta-item').forEach(el => {
  observer.observe(el);
});

// Parallax effect on scroll for header
const headerBlock = document.querySelector('.experience-detail-title-block');
if (headerBlock) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    headerBlock.style.transform = `translateY(${scrolled * 0.5}px)`;
  }, { passive: true });
}

// Smooth stagger animation entrance
const experienceSections = document.querySelectorAll('.experience-section');
experienceSections.forEach((section, index) => {
  section.style.animationDelay = `${index * 0.1}s`;
});

// Interactive timeline dot on hover
const timelineDots = document.querySelectorAll('.timeline-dot');
timelineDots.forEach(dot => {
  dot.addEventListener('mouseenter', function() {
    this.style.animation = 'pulse 0.6s ease-out';
  });
  
  dot.addEventListener('mouseleave', function() {
    this.style.animation = 'none';
  });
});

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#experience-detail') {
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(23, 74, 58, 0.3);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(23, 74, 58, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(23, 74, 58, 0);
    }
  }
  
  .timeline-dot:hover {
    animation: pulse 0.6s ease-out !important;
  }

  /* Fade in animation for visible elements */
  .reveal-item.visible,
  .meta-item.visible {
    animation: slideInUp 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);

// Mouse follower effect on skill cards (optional enhance)
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', x + 'px');
    this.style.setProperty('--mouse-y', y + 'px');
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.setProperty('--mouse-x', '50%');
    this.style.setProperty('--mouse-y', '50%');
  });
});
