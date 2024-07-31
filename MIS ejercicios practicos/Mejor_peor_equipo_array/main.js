// puntuaciones primera ronda

/* Edita el archivo main.js para crear el código necesario para que partiendo del array de puntuaciones propuesto 
se imprima por la consola el mejor y peor equipo con su total de puntos respectivo.
El resultado que tiene que aparecer en la consola al ejecutarlo debe ser exactamente igual a este:
El mejor equipo es toros negros con un total de 28puntos
El peor equipo es Ciervos Celestes con un total de 10 puntos  */


const firstRound = [
    { team: "Toros Negros", scores: [1, 3, 4, 2, 10, 8] },
    { team: "Águilas Plateadas", scores: [5, 8, 3, 2, 5, 3] },
    { team: "Leones Carmesí", scores: [5, 4, 3, 1, 2, 3, 4] },
    { team: "Rosas Azules", scores: [2, 1, 3, 1, 4, 3, 4] },
    { team: "Mantis Verdes", scores: [1, 4, 5, 1, 3] },
    { team: "Ciervos Celestes", scores: [3, 5, 1, 1] },
    { team: "Pavos Reales Coral", scores: [2, 3, 2, 1, 4, 3] },
    { team: "Orcas Moradas", scores: [2, 3, 3, 4] },
];

//necesitamos guardar en variables el mejor y el peor equipo para despues poder imprimirlas:
let mejorEquipo = null;
let peorEquipo = null;
let mejorRecord = 0;
let peorRecord = 100;

//ahora necesito buscar en cada equipo para calcular el total de puntos:
//voy a probar con el forEach interactuar con cada elemento.
//y yo creo que para sumar todos los puntuajes lo mejor que puedo usar es reduce:
firstRound.forEach(nombreEquipo => {
    const recordTotal = nombreEquipo.scores.reduce((acc, score) => acc + score, 0)

    //vale ahora toca comprobar si el total de puntos es mayor al actula se actualiza
    if (recordTotal > mejorRecord) {
        mejorRecord = recordTotal;
        mejorEquipo = nombreEquipo.team;
    }
    //lo mismo con el peor
    if (recordTotal < peorRecord) {
        peorRecord = recordTotal;
        peorEquipo = nombreEquipo.team;
    }
});
console.log(`el mejor equipo es ${mejorEquipo} con un total de ${mejorRecord} puntos`);
console.log(`el peor equipo es ${peorEquipo} con un total de ${peorRecord} puntos`);

