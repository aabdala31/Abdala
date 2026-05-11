const logo = document.querySelector('.logo');

const dropdown = document.querySelector('.dropdown');

const dropdownButton = dropdown.querySelector('.botonHeader');

/* ---------------- LOGO ---------------- */

function startSpin(){

  logo.style.transition = 'none';

  logo.style.animation = 'spinLogo 5s linear infinite';
}

function stopSpin(){

  const computedStyle = window.getComputedStyle(logo);

  const matrix = computedStyle.transform;

  logo.style.animation = 'none';

  logo.style.transform = matrix;

  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      logo.style.transition =
        'transform 1.2s cubic-bezier(.22,.61,.36,1)';

      logo.style.transform = 'rotate(0deg)';

    });

  });

}

/* DESKTOP + MOBILE */

logo.addEventListener('pointerenter', startSpin);

logo.addEventListener('pointerleave', stopSpin);

logo.addEventListener('pointerdown', startSpin);

logo.addEventListener('pointerup', stopSpin);

logo.addEventListener('pointercancel', stopSpin);

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