// Variables
const carrito = document.querySelector('#carrito');
const listaProducto = document.querySelector('#lista-producto');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaProducto.addEventListener('click', agregarProducto);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarProducto);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el curso al carrito
function agregarProducto(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const producto = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosProducto(producto);
     }
}

// Lee los datos del curso
function leerDatosProducto(producto) {
     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio span').textContent,
          id: producto.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
          const producto = articulosCarrito.map( producto => {
               if( producto.id === infoProducto.id ) {
                    producto.cantidad++;
                     return producto;
                } else {
                     return producto;
             }
          })
          articulosCarrito = [...producto];
     }  else {
          articulosCarrito = [...articulosCarrito, infoProducto];
     }


     carritoHTML();
}

// Elimina el producto del carrito
function eliminarProducto(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-producto') ) {
          
          const productoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
 
          carritoHTML();
     }
}



function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(producto => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${producto.imagen}" width=100>
               </td>
               <td>${producto.titulo}</td>
               <td>${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}


function vaciarCarrito() {
    


     
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
