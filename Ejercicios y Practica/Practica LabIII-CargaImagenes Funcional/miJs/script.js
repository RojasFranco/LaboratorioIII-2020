let paraImagenAuto = document.getElementById("imgAuto");

let tiposMarcas = document.getElementsByTagName("option");



let selectorMarcas = document.getElementById("selectMarca");

selectorMarcas.addEventListener("change", function(){
    ActualizarImagen();
})



function ActualizarImagen(){
    for (let index = 0; index < tiposMarcas.length; index++) {
        const element = tiposMarcas[index];
        let marca = element.value;
        if(element.selected){
            let marca = element.value;
            paraImagenAuto.removeAttribute("src");        
            switch (marca) {
                case "ford":
                    paraImagenAuto.setAttribute("src", "../imagenes/ford.jpg");
                    break;
                case "peugeot":
                    paraImagenAuto.setAttribute("src", "../imagenes/peugeot.jpg");
                    break;
                default:
                    paraImagenAuto.setAttribute("src", "../imagenes/autosDefecto.png");
                    break;
            }
        }        
    }
}


let file = document.getElementById("idFile");
let imgFile = document.getElementById("imgFile");

file.addEventListener("change", function(){
    // console.log(file.files[0]);
    let imagenCargada = file.files[0]
    
    if(imagenCargada){
        let ubicacionImagenCargada = URL.createObjectURL(imagenCargada);

        imgFile.setAttribute("src", ubicacionImagenCargada);
        console.log("PEPE");
    }
    else{
        console.log("cargue imagen");
    }


})