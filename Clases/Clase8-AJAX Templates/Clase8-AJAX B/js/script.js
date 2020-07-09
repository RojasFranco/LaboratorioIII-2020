import Persona from "./entidades.js"

let btnTraer = document.getElementById("btnTraer");
let formulario = document.forms[0]; // Puedo obtenerlo cby id by tagName o como quiera
let btnBaja = document.getElementById("btnBaja");

formulario.onsubmit = (e)=>{
    e.preventDefault();
    //console.log("submit cancelado");
    let nombre = document.getElementsByName('nombre')[0].value;
    let apellido = document.getElementById("txtApellido").value;
    let edad = parseInt(document.getElementsByName('edad')[0].value);

    let nuevaPersona = new Persona(null, nombre, apellido, edad);
    altaPersona(nuevaPersona);
}
//let info = document.getElementById("info");
/*
btnTraer.onclick = saludar;//Le asigno el MANEJADOR DE EVENTO
function saludar(){
    console.log("Hola mundo");

    console.log(event);//Muestra cual es el evento que ocurrio
}

*/

btnTraer.addEventListener("click", traerPersonas);

function traerPersonas(){
    let xhr = new XMLHttpRequest();    
    //let img = document.createElement("img");
    //img.setAttribute("src", "./Images/");

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState==4){
            //info.removeChild(img);
            if(xhr.status == 200){
                //let listaPersonas = 
                console.log(JSON.parse(xhr.responseText));
                //info.innerHTML = <p> id = ${listaPersonas[0].id} </p>
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
        else{
            //info.appendChild(img);
        }
    };
    xhr.open("GET", "http://localhost:3000/traerPersonas");
    xhr.send();
}

/*
function altaPersona(persona){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState==4){
            if(xhr.status == 200){
                console.log(JSON.parse(xhr.responseText).todoOk);
                if(JSON.parse(xhr.responseText).todoOk){
                    alert("Alta persona realizada con exito");
                }
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
        else{
        }
    }       
    xhr.open("POST", "http://localhost:3000/altaPersona");
    xhr.setRequestHeader('content-type', "application/json");
    xhr.send(JSON.stringify(persona));
};*/

function altaPersona(persona){
    fetch("http://localhost:3000/altaPersona", {
        method: "POST",
        headers : { "content-type" : "application/json"},
        body: JSON.stringify(persona)
    })
    .then(resp=>resp.json())
    .then(res=>console.log(res.todoOk))
    .catch(error=>console.log(error));
}


btnBaja.addEventListener("click", ()=>{
    let id = parseInt(document.querySelector("#txtId").value);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState==4){
            if(xhr.status==200){
                console.log(JSON.parse(xhr.responseText));
                if(JSON.parse(xhr.responseText).todoOk==1){
                    alert("Persona dada de baja");
                }
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
    }

    xhr.open("POST", "http://localhost:3000/bajaPersona");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(`id = ${id}`);
})


/*
btnTraerF.addEventListener("click", async()=>{
    try{
        let datos = await fetch("./js/datos.json");
        let data = await datos.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
})*/