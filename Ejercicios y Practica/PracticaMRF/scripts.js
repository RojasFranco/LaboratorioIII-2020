//console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {};

// Retornar un array con los nombres de los usuarios femeninos

soluciones.usuariosFemeninos = function(usuarios){
  var usuariosFemeninos = usuarios.filter(function(usuario, indice, usuarios){
    
    return usuario.genero == "Female";
  });
  var nombresFemeninos = usuariosFemeninos.map(function(usuario){
    return usuario.nombre;
  });
  return nombresFemeninos;
  
}

//console.log(soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)

soluciones.mailsVarones = function(usuarios){
   var usuariosMasculinos = usuarios.filter(function(usuario){
     return usuario.genero=="Male";
   });

   var mailDeMasculinos = usuariosMasculinos.map(function(elemento){
     return elemento.email;
   });
   return mailDeMasculinos;
}

//console.log(soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'

soluciones.usuariosMayores = function(usuarios, edad){
    
}

//console.log(soluciones.usuariosMayores(data, 40));

  // Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.

soluciones.usuarioMasGrande = function(usuarios){

  let nombreYEdadUsuarios = usuarios.map(function(usuario){
    return {nombre:usuario.nombre, edad:usuario.edad};
  })

  let usuarioMasGrande = nombreYEdadUsuarios.reduce(function(ant,act,indice,nombreYEdadUsuarios){
    if(ant.edad>act.edad){
      return ant;
    }
    return act;
  });

  return usuarioMasGrande;
}

//console.log(soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)

soluciones.promedio = function(usuarios){
  


}

//console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)

soluciones.promedioVarones = function(usuarios){
   
   
}

//console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

 // Retornar el promedio de edad de los usuarios mujeres (number)

soluciones.promedioMujeres = function(usuarios){
   
}

//console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));

let contenedorTabla = document.getElementById("contenedorTabla");
let tabla = document.createElement("table");

contenedorTabla.appendChild(tabla);

function CrearTablaConDatos(datosTabla){
  while(tabla.childElementCount>0){
    tabla.removeChild(tabla.firstElementChild);
  }
  let trHead = document.createElement("tr");

  for (const key in datosTabla[0]) {
      let th = document.createElement("th");
      th.textContent = key;
      trHead.appendChild(th);
  }
  tabla.appendChild(trHead);
  
  datosTabla.forEach(fila => {
    let tr = document.createElement("tr");
    for (const key in fila) {
        let td = document.createElement("td");
        td.textContent = fila[key];
        tr.appendChild(td);
    }
    tabla.appendChild(tr);
  })  

  tabla.classList.add("table", "table-hover", "text-center");
}

CrearTablaConDatos(data);

let opcionesCheck = document.getElementsByName("checkDatos");

opcionesCheck.forEach(elementCheck => {
  elementCheck.addEventListener("change", function(){
    MapearCheckeados();
  })
});

function ObtenerCheckeados(){
  let chequeados = [];
  opcionesCheck.forEach(element => {
    if(element.checked){
      chequeados.push(element.value);
    }    
  });
  return chequeados;
}

function MapearCheckeados(){
  let checkeados = ObtenerCheckeados();
  let nuevaLista = data.map(function(elementActual){
    let retorno = {};
    checkeados.forEach(elementCheckeado => {
      retorno["id"] = elementActual.id;
      switch (elementCheckeado) {
        case "nombre":
          retorno["nombre"] = elementActual.nombre;
          break;
        case "apellido":
          retorno["apellido"] = elementActual.apellido;
          break;
        case "email":
          retorno["email"] = elementActual.email;
          break;
        case "genero":
          retorno["genero"] = elementActual.genero;
          break;
        case "edad":
          retorno["edad"] = elementActual.edad;
          break;
        default:
          break;
      }
    });
    return retorno;
  });
  CrearTablaConDatos(nuevaLista);
}



/***************      FILTER   ******************/

let btnFilter = document.getElementById("btnFilter");


btnFilter.addEventListener("click", function(){

  let listaFiltrada = data.filter(function(elemActual){
    return elemActual.edad>50;
  });

  CrearTablaConDatos(listaFiltrada);
})


/***************      REDUCEEEE   ******************/

let btnReduce = document.getElementById("btnReduce");

btnReduce.addEventListener("click", function(){
  let mayor = data.reduce(function(ant,act,indiceAct,data){
    if(ant.edad>act.edad){
      return ant;
    }
    return act;
  });
  CrearTablaConDatos(mayor);
});