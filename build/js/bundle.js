

document.addEventListener('DOMContentLoaded', function(){
    crearGaleria(); 
});

function crearGaleria(){
    const galeria = document.querySelector(' .galeria-imagenes ');

    for ( let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        //Añadir la función de mostrar imagen
        imagen.onclick = mostrarImagen;


        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
      
    }
}

function mostrarImagen(e){
    // console.log(typeof e.target.dataset.imagenId);
    const id = parseInt(e.target.dataset.imagenId);

    //Genrar imagen grande
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    // ** Cerrar imagen al car click por fuera
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body')  ;
    }

    //boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');


    // ** Cerrar imagen al presionar boton
    cerrarImagen.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body')  ;
    }
    overlay.appendChild(cerrarImagen);
  
    //Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')  ;  //fijar imagen extendida 


  
}

