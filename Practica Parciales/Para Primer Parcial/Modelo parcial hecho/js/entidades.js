let divAcciones = document.getElementById("divAcciones");
let miSpinner = document.createElement("img");

export class Anuncio{
    id;
    titulo;
    transaccion;
    descripcion;
    precio;    
    num_wc;
    num_estacionamiento;
    num_dormitorio;

    constructor(id,titulo, descripcion, precio, transaccion, cantidadBanos, cantAutos, cantDormitorios){
        this.id = id;
        this.titulo = titulo,
        this.descripcion=descripcion;
        this.precio = precio;
        this.transaccion=transaccion;
        this.num_wc=cantidadBanos;
        this.num_estacionamiento=cantAutos;
        this.cantDornum_dormitoriomitorios=cantDormitorios;
    }

    async altaAnuncio(anuncio){

        try{       
            divAcciones.appendChild(miSpinner);
            miSpinner.setAttribute("src", "../img/spinner.gif");
            let rtaAltaFetch = await fetch("http://localhost:3000/alta", {
            method: "POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify(anuncio),
            });
            let mensaje = await rtaAltaFetch.json();
            miSpinner.removeAttribute("src");
            console.log(mensaje.message);
        }
        catch(err){
            console.log("hubo error");
        }

    }

    /*  BIEN
    async modificarAnuncio(anuncio){

        try{
            let rtaFetch = await fetch("http://localhost:3000/modificar", {
                method:"POST",
                headers: {"content-type" : "application/json"},
                body: JSON.stringify(anuncio)
            });

            let mje = await rtaFetch.json();
            console.log(mje.message);
        }
        catch(err){
            console.log("HUBO ERR");
        }
    }*/

    //OTRA FORMA MODIFICAR
    modificarAnuncio(anuncio){
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){

            if(xhr.readyState==4){

                if(xhr.status==200){
                    let mje = xhr.response;
                    let msjJSON = JSON.parse(mje);
                    console.log(msjJSON.message);
                }
                else{
                    console.log(`err: ${xhr.responseText}`);
                }
            }

        }

    xhr.open("POST", "http://localhost:3000/modificar");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(anuncio));
    }

}