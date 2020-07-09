/**************     CON XMLHTTP ***************/

import { Anuncio } from "../js/entidades.js";


let contenedorTabla = document.getElementById("contenedorTabla");
let contenedorSpinner = document.getElementById("paraSpinner");
let miSpinner = document.createElement("img");
contenedorSpinner.appendChild(miSpinner);
//miSpinner.setAttribute("src", "../img/35.gif");
let tabla = document.createElement("table");;
let formulario = document.getElementById("formulario");

let datos;
let idAnuncio;
let tituloAnuncio;
let transaccionAnuncio;
let descripcionAnuncio;
let precioAnuncio;
let cantBañosAnuncio;
let cantAutosAnuncio;
let cantDormitoriosAnuncio;
let transacciones = document.getElementsByName("radiosTransacciones");

let botonesModificar = document.getElementById("botonesModificar");

/****************** TRAER DATOS *******************/
function TraerDatos(){
    //CREO TABLA
    while(tabla.childElementCount>0){
        tabla.removeChild(tabla.firstElementChild);
    }
    tabla.classList.add("miTabla");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        miSpinner.setAttribute("src", "../img/35.gif");
        if(xhr.readyState==4){
            miSpinner.removeAttribute("src");
            if(xhr.status==200){            
                let rtaXhr = xhr.response;
                let rtaJson = JSON.parse(rtaXhr);
                datos = rtaJson.data;
                console.log(rtaJson.message);
                CrearTablaConDatos(datos);
                let tdsTabla = document.getElementsByTagName("td");
                cargarEventosTdsTabla(tdsTabla);
            }
            else{
                console.log("HUBO ERR");
            }
        }
    }

    xhr.open("GET", "http://localhost:3000/traer");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
}

TraerDatos();

/******************* CARGAR TABLA ******************/

function CrearTablaConDatos(datosTabla){
    let trHead = document.createElement("tr");

    for (const key in datosTabla[0]) {
        let th = document.createElement("th");
        th.textContent = key;
        trHead.appendChild(th);
    }
    tabla.appendChild(trHead);

    datosTabla.forEach(fila => {
      let tr = document.createElement("tr");
      for (const key in fila) {
          let td = document.createElement("td");
          td.textContent = fila[key];
          tr.appendChild(td);
      }
      tabla.appendChild(tr);
    })
    contenedorTabla.appendChild(tabla);
}


/******************* ALTA ******************/

let btnAlta = document.getElementById("btnGuardar");

btnAlta.addEventListener("click", function(){
    tituloAnuncio = document.getElementById("txtTitulo").value;
    descripcionAnuncio = document.getElementById("txtDescripcion").value;
    precioAnuncio = document.getElementById("txtPrecio").value;
    cantBañosAnuncio = document.getElementById("txtCantBaños").value;
    cantAutosAnuncio = document.getElementById("txtCantAutos").value;
    cantDormitoriosAnuncio = document.getElementById("txtCantDormitorios").value;
    transaccionAnuncio = obtenerTransaccion();
    if(tituloAnuncio.length>3 && transaccionAnuncio!=null){
        let anuncioNuevo = new Anuncio(null, tituloAnuncio, transaccionAnuncio, descripcionAnuncio, precioAnuncio, cantBañosAnuncio,
            cantAutosAnuncio, cantDormitoriosAnuncio);
            AltaAnuncio(anuncioNuevo);            
    }
    else{
        alert("COMPLETE LOS CAMPOS");
    }
})

function AltaAnuncio(anuncio){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        miSpinner.setAttribute("src", "../img/35.gif");
        if(xhr.readyState==4){
            miSpinner.removeAttribute("src");
            if(xhr.status==200){
                let rtaXhr = xhr.response;
                let rtaJson = JSON.parse(rtaXhr);
                console.log(rtaJson.message);
                TraerDatos();
            }
            else{
                console.log("HUBO ERR");
            }
        }

    }
    xhr.open("POST", "http://localhost:3000/alta");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(anuncio));
}

function obtenerTransaccion(){
    let elementoSeleccionado;
    transacciones.forEach(element => {
        if(element.checked){
            elementoSeleccionado = element.value;
        }
    })
    return elementoSeleccionado;
}

/************************** SELECCIONAR ANUNCIOS ***************************/

function cargarEventosTdsTabla(tdsTabla){
    for (let index = 0; index < tdsTabla.length; index++) {
        const td = tdsTabla[index];
        td.addEventListener("click", function(){
            let elementoPadre = td.parentElement;
            //let elementoIdBuscado = elementoPadre.firstElementChild;
            //retornoId = elementoIdBuscado.textContent;
            botonesModificar.style.display = "flex";
            LlenarFormularioSegunElementoPadre(elementoPadre);
        })
        
    }
}

function LlenarFormularioSegunElementoPadre(elementoPadre){
    idAnuncio = elementoPadre.children[0].textContent;
    document.getElementById("txtTitulo").value = elementoPadre.children[1].textContent;
    document.getElementById("txtDescripcion").value = elementoPadre.children[3].textContent;
    document.getElementById("txtPrecio").value = elementoPadre.children[4].textContent;
    document.getElementById("txtCantBaños").value = elementoPadre.children[5].textContent;
    document.getElementById("txtCantAutos").value = elementoPadre.children[6].textContent;
    document.getElementById("txtCantDormitorios").value = elementoPadre.children[7].textContent;

    transaccionAnuncio = elementoPadre.children[2];
    transacciones.forEach(transaccionActual => {
        if(transaccionActual.value == transaccionAnuncio.textContent){
            transaccionActual.setAttribute("checked", "true");
        }
    })
    
}

/*************CANCELAR **************/

let btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener("click", function(){
    formulario.reset();
    botonesModificar.style.display = "none";
})


/************************** BAJA **************************/
//OBS EL ID ANUNCIO YA LO TENGO CUANDO SELECCIONA UN TD EN IDANUNCIO
let btnEliminar = document.getElementById("btnEliminar");

btnEliminar.addEventListener("click", function(){


    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        miSpinner.setAttribute("src", "../img/35.gif");
        if(xhr.readyState==4){
            if(xhr.status==200){
                let rtaXhr = xhr.response;
                let rtaJson = JSON.parse(rtaXhr);
                console.log(rtaJson.message);
                miSpinner.removeAttribute("src");
                TraerDatos();
                formulario.reset();
                botonesModificar.style.display = "none";
            }
            else{
                console.log(`Hubo un error: ${xhr.status}`);
            }
        }        
    }
    xhr.open("POST", "http://localhost:3000/baja");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(`id=${idAnuncio}`);
})


/************************** MODIFICAR **************************/

let btnModificar = document.getElementById("btnModificar");
btnModificar.addEventListener("click", function(){
    tituloAnuncio = document.getElementById("txtTitulo").value;
    descripcionAnuncio = document.getElementById("txtDescripcion").value;
    precioAnuncio = document.getElementById("txtPrecio").value;
    cantBañosAnuncio = document.getElementById("txtCantBaños").value;
    cantAutosAnuncio = document.getElementById("txtCantAutos").value;
    cantDormitoriosAnuncio = document.getElementById("txtCantDormitorios").value;
    transaccionAnuncio = obtenerTransaccion();
    if(tituloAnuncio.length>3 && transaccionAnuncio!=null){
        let anuncio = new Anuncio(idAnuncio, tituloAnuncio, transaccionAnuncio, descripcionAnuncio, precioAnuncio, cantBañosAnuncio,
            cantAutosAnuncio, cantDormitoriosAnuncio);
            ModificarAnuncio(anuncio);
    }
    else{
        alert("COMPLETE LOS CAMPOS");
    }
})

function ModificarAnuncio(anuncio){

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        miSpinner.setAttribute("src", "../img/35.gif");
        if(xhr.readyState==4){
            if(xhr.status==200){
                let rtaXhr = xhr.response;
                let rtaJson = JSON.parse(rtaXhr);
                console.log(rtaJson.message);
                miSpinner.removeAttribute("src");
                TraerDatos();
                formulario.reset();
                botonesModificar.style.display = "none";
            }
            else{
                console.log(`Hubo un error: ${xhr.status}`);
            }
        }        
    }
    xhr.open("POST", "http://localhost:3000/modificar");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(anuncio));
}