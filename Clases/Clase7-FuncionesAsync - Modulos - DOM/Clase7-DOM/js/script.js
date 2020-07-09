

//const lista = document.getElementById("lista");
//console.log(lista);

const lista = document.querySelector('#lista');
//console.log(lista);
/*
[22,45,43,67].forEach(function(elemento){
    console.log(elemento);
});
*/
//[22,45,43,67].forEach(e=>console.log(e));

// let hijos = lista.children;
// let primerHijo = lista.firstElementChild;

// console.log(primerHijo.nextElementSibling);

let agregandoH1APrueba = document.getElementById("prueba");
//agregandoH1APrueba.appendChild("h1");
let h1 = document.createElement("h1");
h1.textContent = "Titulo";

agregandoH1APrueba.appendChild(h1);