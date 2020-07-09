//export default epe=88;
export class Persona{
    id;
    nombre;
    edad;

    constructor(id, nombre, edad){
        this.id=id;
        this.nombre=nombre;
        this.edad=edad;
    }

    Saludar(){

        console.log(`Hola soy ${this.nombre} y tengo ${this.edad}`);
    }
}
export const PI = 3.14;