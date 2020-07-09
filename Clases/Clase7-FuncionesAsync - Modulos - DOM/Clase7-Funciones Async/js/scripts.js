function cuadrado(numero){
    return new Promise((resolve, reject)=>{

        setTimeout(() => {
            if( isNaN(numero) ){
                reject("Err. Eso no es un numero");
            }
            else{
                resolve(numero*numero);
            }

        }, 2000);        
    })
}
//let x = cuadrado(4);
//console.log(x);--->antes de los 2 seg va a esta pendiente,
//despues de los 2 segundos estaria resuelto

async function cualquierNombre(valor){
    try{
        let x = await cuadrado(valor); //Espera(await) a que termine cuadrado(valor)
        console.log(x); // Esto lo hace una vez que termino la linea de arriba
    }
    catch(error){
        console.log(error);
    }
}
cualquierNombre("2d");
console.log("Fin del codigo");