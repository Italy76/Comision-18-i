// importar funciones. ES PRIORITARIO, va arriba en la pagina

import { Producto } from "./productoClass.js";
import{campoRequerido, validarNumeros, validarURL, validarGeneral} from "./validaciones.js"

   
// Agregar eventos a los elementos del formulario
let campoCodigo = document.getElementById("codigo");
// console.log(campoCodigo)

let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.getElementById("formProducto");
// lista de productos
let listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || [] // interpretacion: si ya guardaste en Local Storage objetos de mi arreglo listaProductos, entonces traelos a javascript desde el lenguaje JSON (comando JSON.parse), estan en una lista que se llama listaProductosKey. Si por lo contrario Local Storage esta vacio entonces carga esta lista de productos como arreglo vacio. 
let productoEsxistente = false //si productoExistente=false quiero nuevo producto, caso contrario quiero modificar.
let btnAgregar = document.querySelector("#btnAgregar")
// agregar manejador de eventos
campoCodigo.addEventListener("blur", ()=>{campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", ()=>{campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", ()=>{campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener("blur", ()=>{validarURL(campoURL)});
formularioProducto.addEventListener("submit", guardarProducto);
btnAgregar.addEventListener("click", limpiarFormulario)

// Llamar a la funcion cargaInicial. Esta funcion se ejecuta despues de que el arreglo trajo los datos del Local Storage.  por eso debe estar debajo de let listaProductos.
cargaInicial();

function guardarProducto(e){
  e.preventDefault()
  // validar los campos del formulario
   if(validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)){
     if(productoEsxistente==false){
    //caso 1: agregar o crear un producto
     crearProducto()
     }else{
       // cas 2: el usuario quiere editar producto
    modificarProducto();
     }
   }
  
}

function crearProducto(){
  console.log("aqui creo el producto")
  //crear el objeto producto
  let productoNuevo = new Producto(campoCodigo.value, campoProducto.value,campoDescripcion.value, campoCantidad.value, campoURL.value);
  console.log(productoNuevo);
  // guardar le producto que se crea en el arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  // limpiar el formulario
  limpiarFormulario();
  // una vez que pase todo esto quiero guardar en Local Storage el arreglo de productos
  guardarLocalStorage();
  // mostrar un mensaje al usuario
  Swal.fire(
    'Producto creado',
    'Su producto fue correctamente creado',
    'success'
  )
  // creo una nueva fila en la tabla
  crearFila(productoNuevo); // puse la variable productoNuevo en la funcion. Esto para que cda vez que cargo los datos de un nuevo producto en el formulario y los guarde, estos aparezcan en la tabla de abajo.
}

function limpiarFormulario (){
  // limpiar los value de todo el formulario. Borra los valores asi es mas comodo escribir los nuevos
  formularioProducto.reset();
  // limpiar las clases. Debe limpiar tambien los is-valid y los is-invalid. De esta manera los cambios del formulario volveran como antes de ingresar los valores la primera vez, o sea sin visualizar esas tildes verdes para decir si son o no son validos.
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoURL.className = "form-control";
  //limpiar la tabla
  productoEsxistente = false;
  //
}

// crear la funcion para guardar los productos en Local Storage del navegador
function guardarLocalStorage(){
  localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos)); //localStorage.setItem("")sirve para guardar en Local Storage. Se estcribe el nombre de la key entre comillas. JSON.stringify() sirve para traducir en lenguaje JSON los objetos de javascript que queremos almacenar en Local Storage.
}

function crearFila(productoNuevo){
  let tabla = document.getElementById("tablaProductos");
  tabla.innerHTML +=  `<tr>
  <td>${productoNuevo.codigo}</td>
  <td>${productoNuevo.producto}</td>
  <td>${productoNuevo.descripcion}</td>
  <td>${productoNuevo.cantidad}</td>
  <td>${productoNuevo.url}</td>
  <td>
    <button class="btn btn-warning" onclick = "prepararEdicionProducto(${productoNuevo.codigo})">Editar</button 
    ><button class="btn btn-danger" onclick="borrarProducto(${productoNuevo.codigo})">Borrar</button>
  </td>
</tr>`; // estoy diciendo a la funcion prepararedicionProducto que busque el valor codigo para ubicar el objeto que quiero editar.
}

function cargaInicial(){  // Esta funcion sorve para verificar que en el Local storage hay productos cargados, y de ser asi los dibuje en la tabla de abajo.
  if(listaProductos.length > 0){
  // dibujar fila
  listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)})  //forEach es un bucle que recorre los arreglos. Lleva entre parentesis una funcion anonima que a su vez como parametro lleva una palabra inventada: esa palabra representa e primer objet del arreglo.Por cada objeto del arreglo, forEach cumplira la accion de ejecutar la funcion crearFila, y el parametro de crearFila sera justo la palabra inventada en la funcion anonima dentro de foreach.
  };
}

function borrarTabla(){
  let tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";   // el signo = con comillas vacias quiere decir borrar.
}

window.prepararEdicionProducto = (codigo)=>{  // usamos el objeto window para permitir a la fucncion prepararEdicionProducto de ser llmadada por HTML. De otra manera no podria. Esto porque la pagina HTML esta vicuada a la pagina admin.js mediante module. Esta funcion prepararEdicionProducto es local, por eso html no la puede usar. Asi que la ponemos como objeto del BOM, window. Asi podemos llamarla en el boton de la tabla Editar.
 console.log("desde la funcion prepararEdicionProducto.");
  console.log(codigo)
  //obtener el objeto a modificar
  let productoBuscado = listaProductos.find((itemDeProducto)=>{return itemDeProducto.codigo == codigo}) // el find es parecido al forEach en su estructura: nos permite armar una funcion en su interior. Con esta funcion preguntamos si el objeto tiene su propiedad codigo igual al parametro codigo de la funcion prepararEdicionProducto. Si no lo es, se pregunta al otro objeto en el arreglo. Si se encuentra esa igualdad, entonces una copia de ese objeto se guarda en la variable productoBuscado.
  console.log(productoBuscado);
  //mostrar los datos en el formulario
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;
  // aqui modifico la variable booleana
  productoEsxistente = true
}

function modificarProducto(){
  console.log("Quiero modificar este producto")
  // buscar la posicion de mi objeto dentro del arreglo
      let posicionProducto = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == campoCodigo.value})
      console.log(posicionProducto)
      // modificar los datos de ese producto dentro del arreglo
      listaProductos [posicionProducto].producto = campoProducto.value;
      listaProductos[posicionProducto].descripcion = campoDescripcion.value;
      listaProductos[posicionProducto].cantidad = campoCantidad.value;
      listaProductos[posicionProducto].url = campoURL.value;
  // actualizar los datos del Local Storage
    guardarLocalStorage();
    //mostrar cartel al usuario
    Swal.fire(
      'Producto modificado',
      'Su producto fue correctamente editado',
      'success'
    )
    // limpiar los datos del formulario
    limpiarFormulario()
  //actualizar la tabla
  borrarTabla()
  listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)})
}

window.borrarProducto = function(codigo){ // asigno a la funcion borrarProducto otra funcion, que es anonima.
  console.log(codigo)
  // borro el produto del arreglo
  let arregloProductoBorrado = listaProductos.filter((itemProducto)=>{return itemProducto.codigo !=codigo})
  console.log(arregloProductoBorrado)
  //actualizar los daton en Local Storage
  listaProductos = arregloProductoBorrado; // el arreglo original ahora tiene el mismo valor del arreglo copia que hemos construido con el metodo filter. asi sera actualizado
  guardarLocalStorage(); //volvemos a guardar en local storage el arreglo actualizado en la linea anterior.
   // actualizar los datos de la tabla
   borrarTabla()
   // dibujar fila
   listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)})
   //mostrar mensaje
   Swal.fire(
    'Producto eliminado',
    'Su producto fue correctamente eliminado',
    'success'
  )
}

