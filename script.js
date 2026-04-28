// Create modal dynamically
const modal = document.createElement('div');
modal.id = 'modal';
modal.className = 'modal';
modal.innerHTML = `
  <span class="close">&times;</span>
  <img class="modal-content" id="modal-img">
  <a class="prev">&#10094;</a>
  <a class="next">&#10095;</a>
`;
document.body.appendChild(modal);

const modalImg = document.getElementById('modal-img');
const closeBtn = modal.querySelector('.close');
const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');

// Array of image sources
const images = [];
for (let i = 1; i <= 36; i++) {
  images.push(`fotos/img${i}.jpg`);
}

let currentIndex = 0;

// Function to show modal
function showModal(index) {
  currentIndex = index;
  modalImg.src = images[currentIndex];
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

// Function to hide modal
function hideModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Event listeners for gallery links
document.querySelectorAll('.galeriaFotos a').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(index);
  });
});

// Close modal
closeBtn.addEventListener('click', hideModal);

// Click outside to close
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    hideModal();
  }
});

// Previous image
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentIndex];
});

// Next image
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = images[currentIndex];
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'Escape') {
      hideModal();
    }
  }
});
