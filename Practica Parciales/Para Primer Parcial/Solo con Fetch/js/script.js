import { Anuncio } from "../js/entidades.js";


let contenedorTabla = document.getElementById("contenedorTabla");
let contenedorSpinner = document.getElementById("paraSpinner");
let miSpinner = document.createElement("img");
contenedorSpinner.appendChild(miSpinner);
let srcMiSpinner = "../img/35.gif";     ////    PONER EL QUE USE

let tabla = document.createElement("table");
tabla.classList.add("miTabla");
let formulario = document.getElementById("formulario");

let tdsTabla;

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

/***********************    CARGAR DATOS ************************/

async function TraerDatos(){
    try{
        while(tabla.childElementCount>0){
            tabla.removeChild(tabla.firstElementChild);
        }
        miSpinner.setAttribute("src", srcMiSpinner);        
        let rtaFetch = await fetch("http://localhost:3000/traer");
        let datosRta = await rtaFetch.json();
        datos = datosRta.data;
        console.log(datosRta.message);
        miSpinner.removeAttribute("src");
        CargarTabla();
        tdsTabla= document.getElementsByTagName("td");
        cargarEventosTdsTabla(tdsTabla);
    }
    catch(err){
        console.log(err);
    }    
}

TraerDatos();


/************   CREAR TABLA *************/

function CargarTabla(){
    // CARGO HEADER
    let trHead = document.createElement("tr");
    for (const key in datos[0]) {
        let th = document.createElement("th");
        th.textContent = key;
        trHead.appendChild(th);
    }
    tabla.appendChild(trHead);

    //CARGO FILAS
    datos.forEach(fila => {
        let tr = document.createElement("tr");
        for (const key in fila) {
            let td = document.createElement("td");
            td.textContent = fila[key];
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    });

    let contTabla = document.getElementsByTagName("body")[0];    
    //contenedorTabla.appendChild(tabla);
    contTabla.appendChild(tabla);
}


/*******************************    ALTA   ******************/


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

async function AltaAnuncio(anuncio){

    try{       
        divAcciones.appendChild(miSpinner);
        miSpinner.setAttribute("src", srcMiSpinner);
        let rtaAltaFetch = await fetch("http://localhost:3000/alta", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify(anuncio),
        });
        let mensaje = await rtaAltaFetch.json();
        miSpinner.removeAttribute("src");
        console.log(mensaje.message);
        TraerDatos();
    }
    catch(err){
        console.log("hubo error");
    }

}

/************************** SELECCIONAR ANUNCIOS ***************************/

function cargarEventosTdsTabla(tdsTabla){
    for (let index = 0; index < tdsTabla.length; index++) {
        const td = tdsTabla[index];
        td.addEventListener("click", function(){
            let elementoPadre = td.parentElement;
            //let elementoIdBuscado = elementoPadre.firstElementChild;
            //elementoIdBuscado.textContent;
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


/*************  CANCELAR **************/
let btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener("click", function(){
    formulario.reset();
    botonesModificar.style.display = "none";
})


/************************** BAJA **************************/
//OBS EL ID ANUNCIO YA LO TENGO CUANDO SELECCIONA UN TD EN IDANUNCIO
let btnEliminar = document.getElementById("btnEliminar");


btnEliminar.addEventListener("click", async function(){

    if(idSeleccionado!=null){
        try{
            miSpinner.setAttribute("src", "../img/35.gif");
            let rtaFetch = await fetch("http://localhost:3000/baja", {
                method: "POST",
                headers: { "content-type": "application/x-www-form-urlencoded"},
                body: `id=${idSeleccionado}`
            });
            let mje = await rtaFetch.json();
            console.log(mje.message);
            miSpinner.removeAttribute("src");
            TraerDatos();
            formulario.reset();
            botonesModificar.style.display = "none";
        }
        catch(err){
            console.log("HUBO ERR");
        }
    }
    else{
        alert("elija anuncio a borrar");
    }
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

async function ModificarAnuncio(anuncio){

    try{
        miSpinner.setAttribute("src", srcMiSpinner);
        let rtaFetch = await fetch("http://localhost:3000/modificar", {
            method:"POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify(anuncio)
        });

        let mje = await rtaFetch.json();
        console.log(mje.message);

        miSpinner.removeAttribute("src");
        TraerDatos();
        formulario.reset();
        botonesModificar.style.display = "none";
    }
    catch(err){
        console.log("HUBO ERR");
    }
}