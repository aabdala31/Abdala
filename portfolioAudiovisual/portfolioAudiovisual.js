const grid = document.getElementById('gridProyectos');
const filtrosContainer = document.querySelector('.filtrosContainer');

const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrarModal');

const modalMedia = document.getElementById('modalMedia');
const modalTitulo = document.getElementById('modalTitulo');
const modalAnio = document.getElementById('modalAnio');
const modalRol = document.getElementById('modalRol');
const modalNotas = document.getElementById('modalNotas');

document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('img')) {
    e.preventDefault();
  }
});

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let proyectoActual = null;
let imagenActual = 0;


/* =========================
   CREAR FILTROS
========================= */

const rolesUnicos = new Set();

proyectos.forEach(proyecto => {
  proyecto.roles.forEach(rol => {
    rolesUnicos.add(rol);
  });
});

rolesUnicos.forEach(rol => {

  const btn = document.createElement('button');

  btn.classList.add('filtro');

  btn.dataset.filter = rol;

  btn.dataset.original = rol;
  btn.dataset.compacto = rol.replaceAll(' ', '');

  btn.textContent = rol.replaceAll(' ', '');

  filtrosContainer.appendChild(btn);
});

function actualizarTextoFiltros(){

  document.querySelectorAll('.filtro').forEach(btn => {

    const esActivo = btn.classList.contains('active');
    const estaHover = btn.matches(':hover');
    const esTodos = btn.dataset.filter === 'all';

    if(esActivo || estaHover || esTodos){

      btn.textContent = btn.dataset.original;

    }else{

      btn.textContent = btn.dataset.compacto;
    }
  });
}


/* =========================
   RENDER
========================= */

function renderProyectos(filtro = 'all'){

  grid.innerHTML = '';

  const proyectosFiltrados = proyectos.filter(proyecto => {

    if(filtro === 'all') return true;

    return proyecto.roles.includes(filtro);
  });


  proyectosFiltrados.forEach((proyecto, index) => {

    const div = document.createElement('div');
    div.classList.add('proyecto');

    div.innerHTML = `

      <img src="${proyecto.cover}" alt="${proyecto.titulo}">

      <div class="proyectoOverlay">
        <h3>${proyecto.titulo}</h3>

        <p>
          ${proyecto.anio}<br>
          ${proyecto.roles.join(' / ')}
        </p>
      </div>

    `;


    div.addEventListener('click', () => {
      abrirModal(index, proyectosFiltrados);
    });


    grid.appendChild(div);
  });
}

renderProyectos();
actualizarTextoFiltros();
document.querySelectorAll('.filtro').forEach(btn => {

  btn.addEventListener('mouseenter', actualizarTextoFiltros);

  btn.addEventListener('mouseleave', actualizarTextoFiltros);
});


/* =========================
   FILTROS
========================= */

const filtros = document.querySelectorAll('.filtro');

filtrosContainer.addEventListener('click', e => {

  if(!e.target.classList.contains('filtro')) return;

  document.querySelectorAll('.filtro').forEach(btn => {
    btn.classList.remove('active');
  });

  e.target.classList.add('active');

  renderProyectos(e.target.dataset.filter);
  actualizarTextoFiltros();
  document.querySelectorAll('.filtro').forEach(btn => {

  btn.addEventListener('mouseenter', actualizarTextoFiltros);

  btn.addEventListener('mouseleave', actualizarTextoFiltros);
});
});


/* =========================
   MODAL
========================= */

function abrirModal(index, lista){

  proyectoActual = lista[index];
  imagenActual = 0;

  actualizarModal();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}


function actualizarModal(){

  const media = proyectoActual.media[imagenActual];

  modalMedia.innerHTML = '';

  if(media.tipo === 'imagen'){

    modalMedia.innerHTML = `
      <img src="${media.src}" alt="" loading="lazy">
    `;
  }

  if(media.tipo === 'youtube'){

    modalMedia.innerHTML = `
      <iframe
        src="${media.src}"
        allowfullscreen>
      </iframe>
    `;
  }

  modalTitulo.textContent = proyectoActual.titulo;
  modalAnio.textContent = proyectoActual.anio;
  modalRol.textContent = proyectoActual.roles.join(' / ');
  modalNotas.textContent = proyectoActual.notas;
}


nextBtn.addEventListener('click', () => {

  imagenActual++;

  if(imagenActual >= proyectoActual.media.length){
    imagenActual = 0;
  }

  actualizarModal();
});


prevBtn.addEventListener('click', () => {

  imagenActual--;

  if(imagenActual < 0){
    imagenActual = proyectoActual.media.length - 1;
  }

  actualizarModal();
});


cerrarModal.addEventListener('click', () => {

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});


modal.addEventListener('click', e => {

  if(e.target === modal){

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});


/* =========================
   DROPDOWN
========================= */

const dropdown = document.querySelector('.dropdown');
const dropdownBtn = document.querySelector('.dropdownBtn');


dropdownBtn.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});


window.addEventListener('click', e => {

  if(!dropdown.contains(e.target)){
    dropdown.classList.remove('active');
  }
});