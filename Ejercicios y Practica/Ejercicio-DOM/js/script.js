window.addEventListener("load", function(){

    let contenedorTabla = this.document.getElementById("contenedorTabla");

    let tabla = this.document.createElement("table");
    tabla.classList.add("miTabla");
    

    /*let datos = [{"id":1,"first_name":"Emeline","last_name":"Fairnington"},
    {"id":2,"first_name":"Felicdad","last_name":"Halfhide"},
    {"id":3,"first_name":"Shawn","last_name":"Pentelo"},
    {"id":4,"first_name":"Hashim","last_name":"Lovelady"},
    {"id":5,"first_name":"Shell","last_name":"Duddy"}];*/

    /*******************    TOMAR DATOS JSON    *********************/
    let datos;
/*
    async function traerDatos(){
        try{
            let retornoFetch = await fetch("../datos/data.json");
            let datos = await retornoFetch.json();
            //console.log(datos);
        }
        catch(err){
            console.log(err);
        }
    }
    traerDatos();*/
    //console.log(datos); EL PROBLEMA ES QUE NO LLEGA A CARGARSE DATOS ANTES QUE LLEGUE A ESTA LINEA PORQUE
    //SE CARGA CON PROMESA

    /*******************    COMPLETO HEADER     *********************/
    let filaUnoParaHeader = datos[0];    
    let trHeader = this.document.createElement("tr");
    for (const key in filaUnoParaHeader) {
        let th = this.document.createElement("th");
        th.textContent = key;
        trHeader.appendChild(th);
    }
    // Agrego El hijo tr a tabla    
    tabla.appendChild(trHeader);


    /*******************    COMPLETO FILAS     *********************/
    datos.forEach(fila => {
        let trFila = this.document.createElement("tr");
        for (const key in fila) {
            let td = this.document.createElement("td");
            td.textContent = fila[key];
            trFila.appendChild(td);
        }
        tabla.appendChild(trFila);
    });

    contenedorTabla.appendChild(tabla);





    /******************     Click elemento de tabla     *******************/
    let elementoDeFila = this.document.getElementsByTagName("td");
    
    for (let index = 0; index < elementoDeFila.length; index++) {
        const tdElement = elementoDeFila[index];
        tdElement.onclick = function(){
            let elementoPadre = tdElement.parentElement;
            let idPrincipalElegido = elementoPadre.childNodes[0]; // o elementoPadre.firstElementChild            
            console.log(idPrincipalElegido.textContent);

        }
    }
})