// Preload all images
function preloadImages() {
  return new Promise((resolve) => {
    const images = [];
    let loadedCount = 0;
    let totalImages = 36;

    for (let i = 1; i <= totalImages; i++) {
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve();
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve();
        }
      };
      
      img.src = `../fotos/img${i}.jpg`;
      images.push(img);
    }
  });
}

// Start preloading images and redirect when done
preloadImages().then(() => {
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 500); // Small delay for smooth transition
});
