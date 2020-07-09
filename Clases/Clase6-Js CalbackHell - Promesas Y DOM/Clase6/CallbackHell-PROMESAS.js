
/*
function operar(a,b, callback){

    return callback(a,b);
}*/

/*********    Una forma     *********/
//console.log( operar(4,5, sumar) );


/*
function operar(a,b, callback){
    setTimeout(()=>{
        return callback(a,b);
    }, 2000);
}

function potencia(a, callback){
    setTimeout(()=>{
        return callback(a);
    }, 1500);
}


//operar(4,5, (x,y) => console.log(x+y));
operar(4,5, (x,y)=>{
    let suma=x+y;
    console.log("suma: " +suma);
    potencia(suma, a=>{
        pot = a*a;
        console.log("potencia: "+pot);        
    })
})

console.log("esto esta al final");*/

function sumarPromesa(a,b){
    if(isNaN(a) || isNaN(b)){
        return Promise.reject({error : "no pasaste nros"});
    }
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b);
        },2000);
    });
}

function cuadradoPromesa(a){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a*a);
        },3000);
    });
}

function dividirPromesa(a,b){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a/b);
        },2000);
    });
}

function restarPromesa(a,b){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a-b);
        },2000);
    });
}

function validarPromesa(a){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a>=0? "positivo":"negativo");
        },1500);
    });
}
sumarPromesa("s",5)
.then((suma)=>{
    console.log(suma);
    return cuadradoPromesa(suma);
})
.then((cuadrado)=>{
    console.log(cuadrado);
})
.catch((err)=>{
    console.log(err.error);
})