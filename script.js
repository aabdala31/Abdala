const logo = document.querySelector('.logo');

const dropdown = document.querySelector('.dropdown');

const dropdownButton = dropdown.querySelector('.botonHeader');

/* ---------------- LOGO ---------------- */

let logoDragging = false;
let logoStartRotation = 0;
let logoStartAngle = 0;
let lastPointerAngle = 0;
let logoVelocity = 0;
let currentRotation = 0;
let momentumFrame = null;
let momentumLastTime = 0;

function getCurrentLogoRotation(){
  const style = window.getComputedStyle(logo);
  const transform = style.transform;

  if(!transform || transform === 'none'){
    return 0;
  }

  const values = transform.match(/matrix\(([^)]+)\)/);
  if(!values){
    return 0;
  }

  const [a, b] = values[1].split(',').map(Number);
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

function getPointerAngle(e){
  const rect = logo.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
}

function normalizeAngleDelta(delta){
  if(delta > 180) return delta - 360;
  if(delta < -180) return delta + 360;
  return delta;
}

function updateLogoRotation(angle){
  logo.style.transition = 'none';
  logo.style.transform = `rotate(${angle}deg)`;
  currentRotation = angle;
}

function cancelMomentum(){
  if(momentumFrame){
    cancelAnimationFrame(momentumFrame);
    momentumFrame = null;
  }
}

function startMomentum(){
  momentumLastTime = performance.now();
  momentumFrame = requestAnimationFrame(stepMomentum);
}

function stepMomentum(timestamp){
  const dt = Math.min((timestamp - momentumLastTime) / 1000, 0.05);
  momentumLastTime = timestamp;

  currentRotation += logoVelocity * dt;
  updateLogoRotation(currentRotation);

  logoVelocity *= Math.pow(0.92, dt * 60);

  if(Math.abs(logoVelocity) > 8){
    momentumFrame = requestAnimationFrame(stepMomentum);
  } else {
    momentumFrame = null;
  }
}

function onLogoPointerDown(e){
  e.preventDefault();
  cancelMomentum();
  logoDragging = true;
  logoStartRotation = getCurrentLogoRotation();
  logoStartAngle = getPointerAngle(e);
  lastPointerAngle = logoStartAngle;
  currentRotation = logoStartRotation;
  logoVelocity = 0;
  momentumLastTime = performance.now();
  logo.setPointerCapture(e.pointerId);
}

function onLogoPointerMove(e){
  if(!logoDragging) return;

  const currentAngle = getPointerAngle(e);
  const deltaFromStart = normalizeAngleDelta(currentAngle - logoStartAngle);
  const targetRotation = logoStartRotation + deltaFromStart;

  const now = performance.now();
  const dt = Math.max((now - momentumLastTime) / 1000, 0.001);
  const pointerDelta = normalizeAngleDelta(currentAngle - lastPointerAngle);
  logoVelocity = pointerDelta / dt;
  momentumLastTime = now;
  lastPointerAngle = currentAngle;

  updateLogoRotation(targetRotation);
}

function onLogoPointerEnd(e){
  if(!logoDragging) return;
  logoDragging = false;
  if(typeof e.pointerId === 'number'){
    logo.releasePointerCapture(e.pointerId);
  }
  if(Math.abs(logoVelocity) > 20){
    startMomentum();
  }
}

/* DESKTOP + MOBILE */

logo.addEventListener('pointerdown', onLogoPointerDown);
logo.addEventListener('pointermove', onLogoPointerMove);
logo.addEventListener('pointerup', onLogoPointerEnd);
logo.addEventListener('pointercancel', onLogoPointerEnd);

/* ---------------- MOBILE DROPDOWN ---------------- */

dropdownButton.addEventListener('click', (e) => {

  e.preventDefault();

  if(window.innerWidth <= 768){

    // si esta abierto -> cerrar
    if(dropdown.classList.contains('open')){

      dropdown.classList.remove('open');

    }

    // si esta cerrado -> abrir
    else{

      dropdown.classList.add('open');

    }

  }

});

/* cerrar tocando afuera */

document.addEventListener('click', (e) => {

  if(
    window.innerWidth <= 768 &&
    !dropdown.contains(e.target)
  ){

    dropdown.classList.remove('open');

  }

});
