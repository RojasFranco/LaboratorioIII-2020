import { Auto } from "./entidades.js";
let btnParaModificaciones = document.getElementById("btnsModificacion");
btnParaModificaciones.style.display="none";
/******************************************** PARA MARCA ********************************************/

let srcCitroen = "../images/citroen.png";
let srcFiat = "../images/fiat.png";
let srcFord = "../images/ford.png";
let srcPeugeot = "../images/peugeot.png";
let srcRenault = "../images/renault.png";
let srcGenerico = "../images/generico.png";


let selectMarca = document.getElementById("cmbMarca");
let contImagenMarca = document.getElementById("imgLogo");

let marca = "elegirMarca";

selectMarca.addEventListener("change", function(){
    contImagenMarca.removeAttribute("src");
    marca = (selectMarca.value).toLowerCase();
    cargarLogoMarca(marca);
    // console.log(marca);
});

function cargarLogoMarca(marcaCargar){
    selectMarca.value = marcaCargar;
    marca = marcaCargar;
    switch (marcaCargar) {
        case "citroen":            
            contImagenMarca.setAttribute("src", srcCitroen);                    
            break;
        case "fiat":
            contImagenMarca.setAttribute("src", srcFiat);
            break;
        case "ford":
            contImagenMarca.setAttribute("src", srcFord);
            break;
        case "peugeot":
            contImagenMarca.setAttribute("src", srcPeugeot);
            break;
        case "renault":
            contImagenMarca.setAttribute("src", srcRenault);
            break;
        default:
            contImagenMarca.setAttribute("src", srcGenerico);
            break;
    }
}


/**************************************************  PARA COLOR ***************************************************/

let formPrincipal = document.querySelector("form");
let elegirColor = document.getElementById("ctrlColor");
let colorElegido = "#000000";
elegirColor.addEventListener("change", function(){
    colorElegido = this.value;
    formPrincipal.style.backgroundColor = colorElegido;
    ActualizarColorLetras(colorElegido, formPrincipal);
});


function ActualizarColorLetras(color, contenedorActualizar) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    if(brightness < 110){
        contenedorActualizar.style.color="white";
    }
    else{
        contenedorActualizar.style.color="black";
    }
}



/**************************************************  COMBUSTIBLE ***************************************************/
let combustible;
let tipoCombustibles = document.getElementsByName("combustible");

function SeleccionarCombustible(){    
    tipoCombustibles.forEach(element => {
        if(element.checked){
            combustible = element.value;
        }
    });
}

/**************************************************  EXTRAS ***************************************************/
let opcionesExtras = document.getElementsByName("extras");
let extras = [];

function seleccionarExtras(){
    extras = [];
    opcionesExtras.forEach(element => {
        if(element.checked){
            extras.push(element.value);
        }
    });
}


/**************************************************  TABLA ***************************************************/
let tabla = document.createElement("table");
let contenedorTabla = document.getElementById("divTabla");
contenedorTabla.appendChild(tabla);
//              REVISAAAAAAAAAAAAAAAAAAAR
let listaAutos = [];
function cargarDatosLocalStorage(){
    if(!localStorage.getItem("listaAutos")){
        localStorage.setItem("listaAutos", JSON.stringify(listaAutos));
    }        
    else{
        listaAutos=JSON.parse(localStorage.getItem("listaAutos"));
        CargarTabla(listaAutos);    
        CargarEventosAlSeleccionarFila();
        tabla.classList.add("table", "table-hover","text-center");
    }
}
cargarDatosLocalStorage();
console.log(listaAutos);

function CargarTabla(datos){

    while(tabla.childElementCount>0){
        tabla.removeChild(tabla.firstElementChild);
    }
    let trHead = document.createElement("tr");
    for (const key in datos[0]) {
        let th = document.createElement("th");
        th.textContent = key;
        trHead.appendChild(th);
    }
    tabla.appendChild(trHead);

    datos.forEach(filas => {
        let tr = document.createElement("tr");
        for (const key in filas) {                        
            const elementDato = filas[key];
            let td = document.createElement("td");
            td.textContent = elementDato;
            tr.appendChild(td);        
            if(key=="color"){
                tr.style.backgroundColor = filas[key];
                ActualizarColorLetras(filas[key], tr);
            }
        }
        tabla.appendChild(tr);
    });
    
}
/************************************  PARA CARGAR FORMULARIO  *********************************************/
function CargarEventosAlSeleccionarFila(){
    let tds = document.getElementsByTagName("td");
    for (let index = 0; index < tds.length; index++) {
        const elementTd = tds[index];
        elementTd.addEventListener("click", function(){        
            let elementoPadre = elementTd.parentElement;
            let idSeleccionado = (elementoPadre.firstElementChild).textContent;
            idSeleccionado = parseInt(idSeleccionado);
            //console.log(idSeleccionado);
            CargarFormulario(idSeleccionado, elementoPadre);
        })        
    }
}

let idPosibleAModificar=0;

function CargarFormulario(idElegido, filaSeleccionada){
    idPosibleAModificar = idElegido;
    document.getElementById("txtPatente").value = filaSeleccionada.children[1].textContent;
    let marcaActual = filaSeleccionada.children[2].textContent;
    cargarLogoMarca(marcaActual);
    document.getElementById("txtModelo").value = filaSeleccionada.children[3].textContent;
    CargarCombustibleActual((filaSeleccionada.children[4].textContent));
    CargarExtras(filaSeleccionada.children[5].textContent);
    document.getElementById("ctrlColor").value = filaSeleccionada.children[6].textContent;

    formPrincipal.style.backgroundColor = filaSeleccionada.children[6].textContent;
    ActualizarColorLetras(filaSeleccionada.children[6].textContent, formPrincipal);

    btnParaModificaciones.style.display = "block";
    colorElegido = elegirColor.value;
}

function CargarCombustibleActual(combustibleSeleccionado){   
    tipoCombustibles.forEach(element => {        
        if(element.value==combustibleSeleccionado){
            element.checked = true;
        }
    });
}

function CargarExtras(extrasSeleccionados){
    opcionesExtras.forEach(element => {
        if(extrasSeleccionados.includes(element.value)){
            element.checked=true;
        }
        else{
            element.checked=false;
        }
    });
}

/****************************  **************   INSERTAR    ********************************************************/

//let marca; Se actualiza arriba  SE CARGA SOLO CON EVENTO CHANGE

//let color; YA ESTA ARRIBA     SE CARGA SOLO CON EVENTO CHANGE
//SeleccionarCombustible();     CARGA TIPO DE COMBUSTIBLE
//seleccionarExtras();          CARGA EXTRAS
let btnAlta = document.getElementById("btnAlta");
let patente;
let modelo;
btnAlta.addEventListener("click", function(){   
    let id = ObtenerNuevoId(listaAutos);
    LLenarVariablesDesdeFormulario();
    if(patente.length>4 && modelo.length>3 && marca!="elegirMarca"){
        // console.log(colorElegido);
        let nuevoObjeto = new Auto(id, patente, marca, modelo, combustible, extras, colorElegido);
        console.log(nuevoObjeto);
        insertarEnLocalStorage(nuevoObjeto);        
        Auto.id+=1;
        cargarDatosLocalStorage();
        ResetearFormulario();
    }
    else
    {
        console.log("complete los campos correctamente");
    }

});

function LLenarVariablesDesdeFormulario(){
    SeleccionarCombustible();
    seleccionarExtras();
    patente = document.getElementById("txtPatente").value;
    modelo = document.getElementById("txtModelo").value;
}

function insertarEnLocalStorage(objetoInsertar){    
    listaAutos.push(objetoInsertar);    
    
    GuardarEnLocalStorage();
}


function ObtenerNuevoId(lista){
    if(lista.length==0){
        return 1;
    }
    else if(lista.length==1){
        return 2;
    }
    let  nroIdMax = 1;
    for (let index = 0; index < lista.length; index++) {
        const element = (lista[index]).id;
        if(element>nroIdMax){
            nroIdMax = element;
        }        
    }
    return nroIdMax+1;
}
/****************************  **************   GUARDAR LISTA EN LOCALSTORAGE    ********************************************************/
function GuardarEnLocalStorage(){
    localStorage.setItem("listaAutos", JSON.stringify(listaAutos));
}

/****************************  **************   CANCELAR    ********************************************************/

let btnCancelar = document.getElementById("btnCancelar");
let formulario = document.getElementById("formulario");
btnCancelar.addEventListener("click", ResetearFormulario);

function ResetearFormulario(){
    btnParaModificaciones.style.display = "none";
    formulario.reset();
    contImagenMarca.setAttribute("src", srcGenerico);
}

/****************************  **************   MODIFICAR    ********************************************************/

let btnModificar = document.getElementById("btnModificar");

btnModificar.addEventListener("click", function(){

    LLenarVariablesDesdeFormulario();
    let idAModificar = idPosibleAModificar;

    if(patente.length>4 && modelo.length>3 && marca!="elegirMarca"){
        let nuevoObjeto = new Auto(idAModificar, patente, marca, modelo, combustible, extras, colorElegido);        
        ModificarAuto(idAModificar, nuevoObjeto);
        GuardarEnLocalStorage();
        cargarDatosLocalStorage();
        ResetearFormulario();
    }
    else
    {
        console.log("complete los campos correctamente");
    }
})

function ModificarAuto(id, nuevoAuto){

    for (let index = 0; index < listaAutos.length; index++) {
        const fila = listaAutos[index];
        for (const key in fila) {
            const element = fila[key];
            if(key=="id" && element==id){
                listaAutos[index] = nuevoAuto;
            }
            break;
        }        
    }
}

/******************************************   ELIMINAR    ********************************************************/
let btnEliminar = document.getElementById("btnEliminar");

btnEliminar.addEventListener("click", function(){
    let idBorrar = idPosibleAModificar;
    EliminarObjeto(idBorrar);
    GuardarEnLocalStorage();
    cargarDatosLocalStorage();
    ResetearFormulario();

})

function EliminarObjeto(idABorrar){
    for (let index = 0; index < listaAutos.length; index++) {
        const fila = listaAutos[index];
        for (const key in fila) {
            const element = fila[key];
            if(key=="id" && element==idABorrar){
                listaAutos.splice(index,1);
            }
            break;
        }        
    }
}