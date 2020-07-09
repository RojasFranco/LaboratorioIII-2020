let txtClave;

// Para que al cargar pagina ejecute la funcion asignarManejadores
window.addEventListener("load", asignarManejadores);

function asignarManejadores(){
    txtClave = document.getElementById("txtNombre");
    console.log(txtClave);
}
//Tambien puedo escribir la funcion completa en el lugar de 'asignarManej'

