//Formo array de imagenes (sacadas de placeimg.com)
let imagenes = [
    {
        title: "Tecnologia",
        origen: "https://placeimg.com/200/200/tech"
    },
    {
        title: "Animales",
        origen: "https://placeimg.com/200/200/animals"
    },
    {
        title: "Naturaleza",
        origen: "https://placeimg.com/200/200/nature"
    },
    {
        title: "Arquitectura",
        origen: "https://placeimg.com/200/200/arquitecture"
    },
    {
        title: "Personas",
        origen: "https://placeimg.com/200/200/people"
    }
];

//una forma de tomar template
let plantilla = document.getElementsByTagName('template')[0].content;

//Creamos fragmento
let fragmento = document.createDocumentFragment();
let div = document.getElementById("divImagenes");

imagenes.forEach(element => {
    plantilla.querySelector('img').setAttribute("src", element.origen);
    plantilla.querySelector('img').setAttribute("alt", element.title);
    plantilla.querySelector("figcaption").textContent = element.title;
    //plantilla.querySelector("figure").setAttribute('style', 'display:inline-block')
    //Voy creando una copia a plantilla por cada imagen
    let copia = document.importNode(plantilla, true);
    fragmento.appendChild(copia);
});

div.appendChild(fragmento);