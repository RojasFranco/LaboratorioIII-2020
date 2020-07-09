import { Anuncio } from "./entidades.js";

let bodyGral = document.querySelector("#paraTabla");

let tabla = document.createElement("table");
tabla.classList.add("miTabla");

let divSpinner = document.getElementById("paraSpinner");
let miSpinner = document.createElement("img");

let tdsTabla; 


/*********************      Crear Tabla     *********************/

let datos;
async function CargarDatos(){
    try{
        while(tabla.childElementCount>0){
            tabla.removeChild(tabla.firstElementChild);
        }
        miSpinner.setAttribute("src", "./img/spinner.gif");
        divSpinner.appendChild(miSpinner);
        let rtaFetch = await fetch("http://localhost:3000/traer");
        let datosRta = await rtaFetch.json();
        datos = datosRta.data;
        console.log(datosRta.message);
        miSpinner.removeAttribute("src");
        CargarTabla();
        tdsTabla= document.getElementsByTagName("td");
        seleccionarAnuncios(tdsTabla);
    }
    catch(err){
        console.log(err);
    }    
}
CargarDatos();


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

    bodyGral.appendChild(tabla);
}



/************************   ALTA     *************************/


let btnGuardar = document.getElementById("btnGuardar");

btnGuardar.addEventListener("click", function(){
    let titulo = document.getElementById("txtTitulo").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = document.getElementById("txtPrecio").value;
    let cantBaños = document.getElementById("txtCantBaños").value;
    let cantAutos = document.getElementById("txtcantAutos").value;
    let cantDormitorios = document.getElementById("txtCantDormitorios").value;    
    let radioButtons = document.getElementsByName("transacciones");
    
    let transaccion = ObtenerChecked(radioButtons);
    if(transaccion!=null && titulo.length>3 && descripcion.length>3 && !(isNaN(precio))){
        let anuncioNuevo = new Anuncio(null, titulo, descripcion, precio, transaccion,cantBaños, cantAutos, cantDormitorios);        
        anuncioNuevo.altaAnuncio(anuncioNuevo);
        
    }
})

function ObtenerChecked(elementos){
    let retorno;
    elementos.forEach(element => {
        if(element.checked){
            retorno = element.value;
        }        
    });
    return retorno;
}

/************************   SELECCIONAR CUALQUIER ANUNCIO    *************************/
let contenedorBotones = document.getElementById("contenedorBotones");
let idSeleccionado;


function seleccionarAnuncios(tdsDeTabla){
    for (let index = 0; index < tdsDeTabla.length; index++) {
        const tdElement = tdsDeTabla[index];
        tdElement.onclick = function(){
            let elementoPadre = tdElement.parentElement;
            let idPrincipalElegido = elementoPadre.childNodes[0]; // o elementoPadre.firstElementChild            
            idSeleccionado = idPrincipalElegido.textContent;            
            contenedorBotones.style.display = "block";
            completarFormularioSegunElementoPadre(elementoPadre);
        }
    }
}


function completarFormularioSegunElementoPadre(elementoPadre){
    document.getElementById("txtTitulo").value = elementoPadre.children[1].textContent;
    document.getElementById("txtDescripcion").value = elementoPadre.children[3].textContent;
    document.getElementById("txtPrecio").value = elementoPadre.children[4].textContent;
    document.getElementById("txtCantBaños").value = elementoPadre.children[5].textContent;
    document.getElementById("txtcantAutos").value = elementoPadre.children[6].textContent;
    document.getElementById("txtCantDormitorios").value = elementoPadre.children[7].textContent;
    let transacion = elementoPadre.children[2].textContent;
    let transacciones = document.getElementsByName("transacciones");
    transacciones.forEach(element => {
        if(element.value==transacion){
            element.setAttribute("checked", "true");
        }
    })

}

/************************   CANCELAR     *************************/
let btnCancelar = document.getElementById("btnCancelar");
let formulario = document.getElementById("formulario");
btnCancelar.onclick = function(){
    contenedorBotones.style.display = "none";
    formulario.reset();
}

/************************   BAJA     *************************/

let btnBaja = document.getElementById("btnEliminar");
let divAcciones = document.getElementById("divAcciones");

btnBaja.addEventListener("click", function(){
    if(idSeleccionado!=null){
        let id = idSeleccionado;
        console.log(idSeleccionado);
        let xhr = new XMLHttpRequest();
        divAcciones.appendChild(miSpinner);
        miSpinner.setAttribute("src", "../img/spinner.gif");
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    let mensaje = JSON.parse(xhr.response);
                    miSpinner.removeAttribute("src");
                    console.log(mensaje.message);
                    contenedorBotones.style.display = "none";
                }
                else{
                    console.log("hubo err");
                }
            }
        }
        xhr.open("POST", "http://localhost:3000/baja");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`id=${idSeleccionado}`);
    }
    else{
        alert("seleccione el anuncio");
    }
})


/* ESTO ANDAAA
btnBaja.addEventListener("click", async function(){

    if(idSeleccionado!=null){
        try{
            let rtaFetch = await fetch("http://localhost:3000/baja", {
                method: "POST",
                headers: { "content-type": "application/x-www-form-urlencoded"},
                body: `id=${idSeleccionado}`
            });
            let mje = await rtaFetch.json();
            console.log(mje.message);
        }
        catch(err){
            console.log("HUBO ERR");
        }
    }
    else{
        alert("elija anuncio a borrar");
    }
})
*/

/****************************   MODIFICAR    ***************/

let btnModificar = document.getElementById("btnGuardarDos");

btnModificar.addEventListener("click", function(){
    if(idSeleccionado!=null){

        let titulo = document.getElementById("txtTitulo").value;
        let descripcion = document.getElementById("txtDescripcion").value;
        let precio = document.getElementById("txtPrecio").value;
        let cantBaños = document.getElementById("txtCantBaños").value;
        let cantAutos = document.getElementById("txtcantAutos").value;
        let cantDormitorios = document.getElementById("txtCantDormitorios").value;    
        let radioButtons = document.getElementsByName("transacciones");
        
        let transaccion = ObtenerChecked(radioButtons);
        if(transaccion!=null && titulo.length>3 && descripcion.length>3 && !(isNaN(precio))){
            let anuncioNuevo = new Anuncio(idSeleccionado, titulo, descripcion, precio, transaccion,cantBaños, cantAutos, cantDormitorios);        
            anuncioNuevo.modificarAnuncio(anuncioNuevo);

            
        }
        //let anuncioModificar = 


    }


})