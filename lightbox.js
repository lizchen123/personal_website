const photoItems = document.querySelectorAll('.photo-item');
let currentIdx = 0;

function openLightbox(idx) {
  currentIdx = idx;
  const img = photoItems[idx].querySelector('img');
  const cap = photoItems[idx].querySelector('figcaption');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-caption').textContent = cap.textContent;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function shiftLightbox(dir) {
  currentIdx = (currentIdx + dir + photoItems.length) % photoItems.length;
  openLightbox(currentIdx);
}

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowRight') shiftLightbox(1);
  if (e.key === 'ArrowLeft') shiftLightbox(-1);
  if (e.key === 'Escape') closeLightbox();
});
