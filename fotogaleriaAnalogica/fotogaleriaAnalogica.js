// MODAL

const modal = document.createElement("div");

modal.id="modal";

modal.className="modal";

modal.innerHTML=`

<span class="close">&times;</span>

<img class="modal-content" id="modal-img">

<a class="prev">&#10094;</a>

<a class="next">&#10095;</a>

`;

document.body.appendChild(modal);


const modalImg=document.getElementById("modal-img");

const closeBtn=modal.querySelector(".close");

const prevBtn=modal.querySelector(".prev");

const nextBtn=modal.querySelector(".next");

const links=[...document.querySelectorAll(".galeriaFotos a")];


// INSERTAR IMÁGENES THUMB AUTOMÁTICAMENTE

links.forEach((link,index)=>{

const img=document.createElement("img");

img.src=`img/thumbs/img${index+1}.webp`;

img.loading="lazy";

img.decoding="async";

img.alt="";

link.prepend(img);

});



let currentIndex=0;



function preload(index){

if(index>=links.length)return;

const img=new Image();

img.src=links[index].href;

}



function showModal(index){

currentIndex=index;

modalImg.src=links[index].href;

preload(index+1);

modal.style.display="flex";

document.body.classList.add("modal-open");

}



function hideModal(){

modal.style.display="none";

document.body.classList.remove("modal-open");

}



links.forEach((link,index)=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

showModal(index);

});

});



closeBtn.onclick=hideModal;



modal.onclick=(e)=>{

if(e.target===modal){

hideModal();

}

};



nextBtn.onclick=()=>{

currentIndex=(currentIndex+1)%links.length;

modalImg.src=links[currentIndex].href;

};



prevBtn.onclick=()=>{

currentIndex=(currentIndex-1+links.length)%links.length;

modalImg.src=links[currentIndex].href;

};



document.addEventListener("keydown",(e)=>{

if(modal.style.display!=="flex")return;

if(e.key==="ArrowRight")nextBtn.click();

if(e.key==="ArrowLeft")prevBtn.click();

if(e.key==="Escape")hideModal();

});

const galeria = document.querySelector(".galeriaFotos");

[...galeria.children]
.reverse()
.forEach(item => galeria.appendChild(item));