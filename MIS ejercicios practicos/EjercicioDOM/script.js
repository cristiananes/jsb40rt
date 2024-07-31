"use strict";

// Aplica estilos a la tabla del index.html para que las asignaturas aprobadas (5 o más) se muestren de color verde y las suspensas en rojo.

//Puedes elegir si el color se aplica al texto o al fondo.

//Pista: todas las notas son etiquetas td y no hay ningún td que no sea una nota

//guardamos los td para obtener celdas de la tabla
const td = document.querySelectorAll("td");


//recorrer todas las celdas

td.forEach(
    function (celda) {
        //SI NO QUIERO SUMAR NO HACE FALTA CONVERITR A NUMERO
        //pero lo que tengo que hacer es coger el contenido de la celda que se puede hacer
        //con let nota = celda.innerText;
        //o con let nota = celda.textContent;
        let nota = celda.textContent;

        //comprobar el contido que llega para el color
        if (nota >= 5) {
            celda.classList.add("aprovado");
        } else {
            celda.style.background = "red";
            celda.style.color = "white";
        }
    });



