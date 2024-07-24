"use strict";

/**
 * Crea una función que devuelva un array de números aleatorios para jugar a la Primitiva y muestra el resultado por la consola.
 * A tener en cuenta:
 * - Los números admitidos en la lotería Primitiva son del 1 al 49
 * - El array de los `números de la suerte` debe contener 6 elementos y no pueden repetirse.
 * - Cada vez que se refresque la página, los números de la consola deben cambiar.
 *
 * Consejos:
 * - Puedes crear una función para que devuelva un único número permitido,
 * y comprobar si dicho número existe en el array de los `números de la suerte`
 * y, si no existe, añadirlo.
 *
 *
 * Bonus: Ordena numéricamente el array antes de devolverlo.
 *
 */

function crearAleatorio() {
    return Math.floor(Math.random() * (49 - 1) + 1);
}

function aleatoriosPrimitiva() {
    const numerosPrimitiva = [];
    //mientras no tenga 6 numero repetimos creamos aleatorio,
    //comprobamos si esta incluido y si no lo esta lo metemos a 
    //los numeros de la primitiva
    while (numerosPrimitiva.length < 6) {

        const numeroAleatorio = crearAleatorio();

        if (!numerosPrimitiva.includes(numeroAleatorio)) {
            numerosPrimitiva.push(numeroAleatorio);
        }
    }
    //el metodo sort ordenaba numericamente el array pero con la arrow funcition porque 
    //sino te los organiza por el orden que tienen en binario no numérico.
    numerosPrimitiva.sort((a, b) => a - b);

    //devolvemos los numeros de la primitiva
    return numerosPrimitiva;
}
const primitiva = aleatoriosPrimitiva();
console.log(primitiva)



