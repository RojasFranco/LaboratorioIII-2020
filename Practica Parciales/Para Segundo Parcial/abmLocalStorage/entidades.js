export class Auto{
    //static id= 1;
    id;
    patente;
    marca;
    modelo;
    combustible;
    extras;
    color;
    
    constructor(id, patente, marca,modelo, combustible, extras, color){
        this.id = id;
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;                
        this.combustible = combustible;
        this.extras = extras;        
        this.color = color;
    }
}