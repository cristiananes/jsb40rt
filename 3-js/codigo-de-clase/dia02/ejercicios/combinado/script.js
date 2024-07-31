"use strict";

/**
* Crea una código que genere una contraseña aleatoria de un número X de caracteres definido por una variable. 
* Para cada carácter, genera un número aleatorio con `Math.random()`. 
* Si el número es menor que 0.33, añade una letra minúscula aleatoria a la contraseña, 
* si está entre 0.33 y 0.66, añade una letra mayúscula aleatoria, 
* si es mayor que 0.66, añade un número aleatorio. 
* Recuerda que debes convertir los números aleatorios a los caracteres correspondientes.
Se facilitan las tres cadenas de texto diferentes.
*/

const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const letrasMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeros = "0123456789";

//longitud de string = string.length

console.log(letrasMayusculas[3]);

const caracteres = 8;

let password;

//Lo primero vamos a crear tantos aleatorios como necesitemos tener(en este caso 8 caracteres)
//y con cada numero hay que comprobar si toca mayuscula o minuscula 
for (let i = 0; i < caracteres; i++){
    let numeroRandom = Math.random();

    if (random < 0.33){
        let caracterRandom = Math.floor
    }

} 