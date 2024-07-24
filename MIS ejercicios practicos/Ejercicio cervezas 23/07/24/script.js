"use strict";

/**
* El objetivo de este ejercicio es trabajar con un catálogo de cervezas representado por un array de objetos. 
* Cada objeto del array contiene información sobre una cerveza, como su nombre, descripción, origen, grados de alcohol y stock disponible.
* Tu tarea es implementar varias funciones para interactuar con el catálogo de cervezas y mostrar información relevante. A continuación se describen las funciones que debes crear:
* 1. `catalogoCervezas()`: Esta función debe devolver un array de los nombres de todas las cervezas del catálogo.*/



/*
* 2. `origenBelgica()`: Esta función debe devolver un array de las cervezas que tienen origen en Bélgica. Debe contener el nombre y los detalles de cada cerveza.
* 3.  `graduacionSuperior6()`: Esta función debe devolver un array de las cervezas que tienen una graduación alcohólica superior a 6 grados. 
* 4. `stockBajo()`: Esta función debedevolver un array de las cervezas que tienen un stock disponible inferior a 10 unidades. Debes imprimir el nombre de la cerveza y la cantidad de stock.
* 5. `totalStock()`: Esta función debe devolver el total de unidades de cerveza disponibles en el stock.

* El catálogo de cervezas se proporciona en el código inicial. 
* Tu tarea es implementar las funciones mencionadas utilizando los métodos `map`, `filter` y `reduce` según corresponda. 
* Asegúrate de devolver los resultados en el formato especificado en cada función.
* Una vez que hayas implementado cada funcion, saca el resultado por la consola para verificar que funciona correctamente. 
*/

const cervezas = [
    {
        id: 1,
        nombre: "PIKANTUS",
        descripcion: "50 cl. Tostada fuerte",
        precio: 4.5,
        origen: "Alemania",
        grados: 5.1,
        stock: 11,
    },
    {
        id: 2,
        nombre: "FRANZISKANER",
        descripcion: "50 cl. Rubia de trigo sin filtrar",
        precio: 3,
        origen: "Alemania",
        grados: 5,
        stock: 5,
    },
    {
        id: 3,
        nombre: "DELIRIUM TREMENS",
        descripcion: "Rubia especial",
        precio: 4.5,
        origen: "Bélgica",
        grados: 9,
        stock: 6,
    },
    {
        id: 4,
        nombre: "GULDEN DRAAK",
        descripcion: "Dulve con final de aromas salvajes.",
        precio: 4,
        origen: "Bélgica",
        grados: 4,
        stock: 23,
    },
    {
        id: 5,
        nombre: "JUDAS",
        descripcion: "Ale dorada fuerte.",
        precio: 3.5,
        origen: "Bélgica",
        grados: 8.5,
        stock: 4,
    },
    {
        id: 6,
        nombre: "TRIPEL KARMELIET",
        descripcion: "Ale dorada de tres cereales.",
        precio: 4.2,
        origen: "Bélgica",
        grados: 8.4,
        stock: 10,
    },
    {
        id: 7,
        nombre: "SPITFIRE",
        descripcion: "50 cl. Bitter.",
        precio: 4,
        origen: "Inglaterra",
        grados: 4.5,
        stock: 7,
    },
    {
        id: 8,
        nombre: "BIRRA MORETTI",
        descripcion: "Lager",
        precio: 2.7,
        origen: "Italia",
        grados: 4.5,
        stock: 15,
    },
    {
        id: 9,
        nombre: "CORONITA",
        descripcion: "Pale lager",
        precio: 2.7,
        origen: "México",
        grados: 4.6,
        stock: 10,
    },
    {
        id: 10,
        nombre: "SUPER BOCK",
        descripcion: "Lager",
        precio: 2,
        origen: "Portugal",
        grados: 5.2,
        stock: 12,
    },
    {
        id: 11,
        nombre: "1906",
        descripcion: "Reserva especial",
        precio: 2.3,
        origen: "Galicia",
        grados: 6.5,
        stock: 40,
    },
    {
        id: 12,
        nombre: "RED VINTAGE",
        descripcion: "Tostada especial",
        precio: 2.5,
        origen: "Galicia",
        grados: 8,
        stock: 12,
    },
];
////////////////////

function catalogoCervezas() {
    return cervezas.map(cervezas => cervezas.nombre);
}
console.log(catalogoCervezas());

function origenBelga() {

    return cervezas.filter(cervezas => cervezas.origen === "Bélgica");
}
console.log(origenBelga());

function graduacion() {

    return cervezas.filter((cervezas) => cervezas.grados > 6);
}
console.log(graduacion());


