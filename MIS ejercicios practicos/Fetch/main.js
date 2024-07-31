"use strict";

//Escribir una función que reciba un número
// Obtener la información de la casa que se corresponda con el número y a partir de ahí, sacar el NOMBRE de su lord.

//Puede haber errores:
///// Que lo introducido no sea un número
//// Que el número no se corresponda con ninguna casa
//// Que la casa no tenga lord actualmente

// Si ocurre un error, tenemos que gestionarlo

// Si el numero es 2 -> https://anapioficeandfire.com/api/houses/2 // Delonne Allyrion

//Si el número es 233 -> https://anapioficeandfire.com/api/houses/233 // no tiene señor actualmente

//Si el numero es 500 -> https://anapioficeandfire.com/api/houses/500  // no existe la casa

let apiUrl = "https://anapioficeandfire.com/api/houses/";


async function getData() {
    let data = await getData(apiUrl);
    let breed = Object.keys(data.message)[0];

    //console.log("Raza:", breed);

    let breedData = await getData(`https://dog.ceo/api/breed/${breed}/images`);

    let img = breedData.message[0];

    console.log(img);
}

console.log(getData())
console.log(getData(apiUrl));
