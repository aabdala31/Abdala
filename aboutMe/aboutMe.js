const photos = document.querySelectorAll('.photo');
const objects = [];

let active = null;
let offsetX = 0;
let offsetY = 0;
let z = 9999;

// ------------------------------------
// IMAGE POOLS
// ------------------------------------

const imagePools = {

  ojoizq: [
    "img/ojoizq/ojoizq1.jpg",
    "img/ojoizq/ojoizq.jpg"
  ],

  ojoder: [
    "img/ojoder/ojoder1.jpg",
    "img/ojoder/ojoder.jpg"
  ],

  nariz: [
    "img/nariz/nariz1.jpg",
    "img/nariz/nariz.jpg"
  ],

  boca: [
    "img/boca/boca1.jpg",
    "img/boca/boca.jpg"
  ],

  oreja: [
    "img/oreja/oreja.jpg"
  ],

  random1: [
    "img/random/random1.png",
    "img/random/random2.png"
  ],

  random2: [
    "img/random/random3.png",
    "img/random/random4.png"
  ]
};

// ------------------------------------
// FIXED SIZES
// ------------------------------------

const mobile = window.innerWidth < 768;

const sizes = {

  ojoizq: {
      w: mobile ? 108 : 180,
      h: mobile ? 72 : 132
  },

  ojoder: {
      w: mobile ? 108 : 180,
      h: mobile ? 72 : 132
  },

  nariz: {
      w: mobile ? 84 : 144,
      h: mobile ? 144 : 252
  },

  boca: {
      w: mobile ? 120 : 204,
      h: mobile ? 72 : 120
  },

  oreja: {
      w: mobile ? 96 : 156,
      h: mobile ? 144 : 252
  },

  random1: {
    w: mobile ? 130 : 240,
    h: mobile ? 130 : 240
  },

  random2: {
    w: mobile ? 140 : 300,
    h: mobile ? 140 : 300
  }
};

// ------------------------------------
// INIT
// ------------------------------------

photos.forEach((photo) => {

  const category = photo.dataset.category;

  const pool = imagePools[category];

  if (!pool) return;

  const size = sizes[category] || {
    w: 150,
    h: 150
  };

  // fixed container size
  photo.style.width = `${size.w}px`;
  photo.style.height = `${size.h}px`;

  // create image
  const img = document.createElement('img');

  photo.appendChild(img);

  // first image
  img.src =
    pool[Math.floor(Math.random() * pool.length)];

  // physics object
  const obj = {

    el: photo,

    x: Math.random() * (document.documentElement.scrollWidth - size.w),
    y: Math.random() * (document.documentElement.scrollHeight - size.h),

    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,

    dragging: false,

    lastX: 0,
    lastY: 0,

    width: size.w,
    height: size.h
  };

  photo.style.left = `${obj.x}px`;
  photo.style.top = `${obj.y}px`;

  objects.push(obj);

  // ------------------------------------
  // IMAGE SWAP
  // ------------------------------------

  if (pool.length > 1) {

    setInterval(() => {

      const randomSrc =
        pool[Math.floor(Math.random() * pool.length)];

      img.src = randomSrc;

    }, 500);
  }

  // ------------------------------------
  // DRAG
  // ------------------------------------

  photo.addEventListener('pointerdown', (e) => {

    e.preventDefault();

    active = obj;

    obj.dragging = true;

    z++;

    photo.style.zIndex = z;

    offsetX = e.clientX - obj.x;
    offsetY = e.clientY - obj.y;

    obj.lastX = e.clientX;
    obj.lastY = e.clientY;

    photo.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  photo.addEventListener('pointerup', (e) => {

    function stopDragging(e){

        if(!active) return;

        active.dragging = false;

        active = null;

        try{
            photo.releasePointerCapture(e.pointerId);
        }catch(err){}
    }

    photo.addEventListener('pointerup', stopDragging);

    photo.addEventListener('pointercancel', stopDragging);

    photo.addEventListener('lostpointercapture', stopDragging);

  });

});

// ------------------------------------
// POINTER MOVE
// ------------------------------------

document.addEventListener('pointermove', (e) => {

  if (!active) return;

  active.x = e.clientX - offsetX;
  active.y = e.clientY - offsetY;

  active.vx = e.clientX - active.lastX;
  active.vy = e.clientY - active.lastY;

  active.lastX = e.clientX;
  active.lastY = e.clientY;
});

// ------------------------------------
// PHYSICS
// ------------------------------------

function update() {

  const w = document.documentElement.scrollWidth;
  const h = document.documentElement.scrollHeight;

  objects.forEach(obj => {

    if (!obj.dragging) {

      obj.x += obj.vx;
      obj.y += obj.vy;

      // bounce X

      if (obj.x <= 0) {

        obj.x = 0;
        obj.vx *= -1;
      }

      if (obj.x + obj.width >= w) {

        obj.x = w - obj.width;
        obj.vx *= -1;
      }

      // bounce Y

      if (obj.y <= 0) {

        obj.y = 0;
        obj.vy *= -1;
      }

      if (obj.y + obj.height >= h) {

        obj.y = h - obj.height;
        obj.vy *= -1;
      }

      // friction

      obj.vx *= 0.999;
      obj.vy *= 0.999;
    }

    obj.el.style.left = `${obj.x}px`;
    obj.el.style.top = `${obj.y}px`;
  });

  requestAnimationFrame(update);
}

update();

// ================= AUTO MOVIE CAROUSEL =================

const track = document.querySelector('.carouselTrack');

const cards = document.querySelectorAll('.movieCard');

let currentIndex = 0;

function getCardsPerView(){

    return window.innerWidth <= 768 ? 1 : 2;
}

function updateCarousel(){

    const cardWidth = cards[0].offsetWidth + 16;

    track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;
}

// ================= AUTO LOOP =================

function autoSlide(){

    const cardsPerView = getCardsPerView();

    currentIndex++;

    // loop infinito
    if(currentIndex > cards.length - cardsPerView){

        currentIndex = 0;
    }

    updateCarousel();
}

// cada 3 segundos
setInterval(autoSlide, 3000);

// resize
window.addEventListener('resize', updateCarousel);

// init
updateCarousel();


