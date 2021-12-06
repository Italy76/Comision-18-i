// Traer los datos del local storage
let listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || []; // la asignacion del arreglo vacio sirve para evitar que nos devuelva un vaor nulo. Recordemos que tenemos que recorrer con un bucle el arreglo, lo cual seria imposible si tuvieramos un valor nulo.
listaProductos.forEach((producto)=>{crearCard(producto)}); // con el forEach recorremos el arreglo y con la funcion que lleva adentro se crea uno nuevo. el parametro de la funcion dentro del forEach lo inventamos, y es el nombre del objeto que la funcion misma dibuja por cada elemento del arreglo. En este caso, por cada elemento del arreglo dibuja una card.

function crearCard(producto){
    let grilla = document.querySelector("#grillaPrincipal") // traigo elemento padre mediante id
    grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <img src="${producto.url}" class="card-img-top" alt="${producto.producto}" />
      <div class="card-body">
        <h5 class="card-title">${producto.producto}</h5>
        <p class="card-text">
          ${producto.descripcion}
        </p>
      </div>
    </div>
  </div>`
     // traje el id del elemento padre, un article. Luego lo modifique con inner.HTML, agregando (+=) todo el div que contiene el producto, o sea la card. En img le el nombre del parametro de la funcion (producto) y su direccion de imagen, que esta guardada en .url. el .producto es donde esta guardado en localstorage la denominacion, y el .descripcion es donde esta guardado en localstorage su descripcion. 
}