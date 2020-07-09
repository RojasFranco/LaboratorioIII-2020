let personas = [{
    "nombre" : "juan",
    "apellido" : "perez"
    },
    {
    "nombre" :"jose",
    "apellido" : "perez",
    }
];

console.log(personas);

console.log("_---------------------------");
console.log("_---------------------------");



/********************** MAP ***********************/
// let soloNombres = personas.map(function(persona, indice, personas){
//     return persona.nombre;
// })


/********************** FILTER ***********************/
// let mm = personas.filter(function(persona, indice, personas){
//     return persona.apellido;
// });
// console.log(mm);



/********************** REDUCE ***********************/
let numeros = [1,4,7,9];

// let suma = numeros.reduce(function(ant, act, indice, numeros){
//     return ant+act;
// });

// console.log(suma);






let cantidadNros = numeros.length;
let promedio = numeros.reduce(function(ant,act, indice){
    if(indice==cantidadNros-1){
        return (ant+act)/cantidadNros;
    }
    return ant+act;
})

console.log(promedio);