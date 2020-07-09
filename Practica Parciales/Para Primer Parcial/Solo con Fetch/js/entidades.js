export class Anuncio{
    id;
    titulo;
    transaccion;
    descripcion;
    precio;
    cantBaños;
    cantAutos;
    cantDormitorios;

    constructor(id, titulo, transaccion, descripcion, precio, cantBaños, cantAutos, cantDormitorios){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantBaños = cantBaños;
        this.cantAutos = cantAutos;
        this.cantDormitorios = cantDormitorios;
    }
}