export function campoRequerido(input){
    // console.log("desde la funcion campoRequerido");
     // console.log(input);
     if(input.value.trim().length > 0){ // trim() es una funcion que evita poner espacio inicial en el input. sirve para evitar que la funcion valide el input aun no habiendo insertado valores.)
       //  console.log("paso la validacion")
         input.className = "form-control is-valid";
         return true
     }else{
       //  console.log("no paso la validacion")
         input.className = "form-control is-invalid"; 
         return false
     }
 }
 
 export function validarNumeros(input){
   // crear una expresion reguar
   let patron = /^[0-9]{1,3}$/; 
   // los numeros dentro corchetes indican cuantas cifras deben tener los numeros que insertaremos. Dentro de las llaves se indica el numero de caracteres: en este caso se pueden escribir numero de entre una cifra hasta 3 cifras. Asi que el mas alto sera 999.
   // probar el funcionamiento del patron o expresion regular
   if(patron.test(input.value)){
     // cumple la expresion regular
     input.className = "form-control is-valid"
     return true
   }else{
     // si no cumple la expresion regular
      input.className = " form-control is-invalid"
      return false;
   }
 }
 
 export function validarURL(input){
   // crear la expresion regular
   let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
   if (patron.test(input.value)){
     // cumple la expresion regular
     input.className = "form-control is-valid";
     return true
   }else{
     // en el caso que no cumpla la expresion regular
     input.className = "form-control is-invalid";
     return false;
   }
 }

 let alerta = document.getElementById("msjAlerta");

 export function validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL){//se saca la e como parametro y se insertan todas las variables tal cual se hizo en la pagina admin.
 //  e.preventDefault(); // previene el comportamiento de submit, para que este no actualice la pagina en este momento. Sacaamos el preventDefault de aqui porque lo usamos en la nueva funcion guardarProducto en la pagina admin
   console.log("aqui tengo que validar todo de nuevo");
   // volver a validad todos los campos
   //if(preguntar si el codigo es correcto && si el producto es correcto ). Dentro de un if puedo poner una funcion EXCLUSIVAMENTE si ella retorna un valor booleano.
   if(campoRequerido(campoCodigo) && campoRequerido(campoProducto) && campoRequerido(campoDescripcion) && validarNumeros(campoCantidad) && validarURL(campoURL)){
      console.log("si paso la validacion");
      alerta.className =  "alert alert-primary my-2 d-none"
      return true;
   }else{
     console.log("no paso la validacion");
     alerta.className = "alert alert-primary my-2"
     return false;
   }
 }