// Preload all images
function preloadImages() {
  const images = [];
  for (let i = 1; i <= 36; i++) {
    const img = new Image();
    img.src = `../fotos/img${i}.jpg`;
    images.push(img);
  }
}

// Start preloading images
preloadImages();

// Redirect to main page when everything is loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 500); // Small delay to ensure smooth transition
});
