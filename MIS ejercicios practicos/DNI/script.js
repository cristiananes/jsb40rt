/*Crea una función que reciba un DNI por parámetros y lo valide:
El Documento Nacional de Identidad de España (DNI) es el documento de identidad 
que se expide en España, cada DNI tiene un identificador único compuesto por un
número de 8 cifras y una letra, por ejemplo: 99999999-R
¿Sabías que la letra del DNI es un sistema de validación, ya que se obtiene a 
partir del número mediante un sencillo algoritmo?
Para obtener la letra correspondiente a un número de DNI hay que obtener 
el resto (en la documentación de JavaScript puedes buscar el operador 
aritmético para calcular el resto) de la división del número entre 23.
Ese resto será un número entre 0 y 22. Si usamos ese número como índice en 
el siguiente Array la letra será la correspondiente a ese índice:
Nota: Por ejemplo si el resto de dividir el número entre 23 es 4 la letra será G.
const letras = [
"T",
"R",
"W",
"A",
"G",
"M",
"Y",
"F",
"P",
"D",
"X",
"B",
"N",
"J",
"Z",
"S",
"Q",
"V",
"H",
"L",
"C",
"K",
"E",
];
Tienes que centralizar el sistema de errores (un único console.error). Si alguna de las comprobaciones falla, 
lanzar un error de JavaScript y haz que se murestre por consola "ERROR:" y el mensaje correspondiente.
Para esto tienes que usar throw, el objeto Error de JavaScript y try/catch
En caso de que el DNI sea válido, se mostrará por consola la frase "DNI válido".
- Longitud del string (9/10) caracteres- 
La primera parte son numeros- 
El ultimo caracter no es un numero- 
La letra se corresponde con el numero
*/

//crear funcion que recibe dni
//BONU: que funcione tambien con la letra en minusculas

function validarDNI(dni) {
    const letras = [
        "T",
        "R",
        "W",
        "A",
        "G",
        "M",
        "Y",
        "F",
        "P",
        "D",
        "X",
        "B",
        "N",
        "J",
        "Z",
        "S",
        "Q",
        "V",
        "H",
        "L",
        "C",
        "K",
        "E",
    ];
    try {
        if (dni.length !== 9) {
            throw new Error("No es un dni, no introduzcas el formato es 11111111X");
        }

        let primerosOcho = dni.substring(0, 8);

        let primerosOchoANumero = parseInt(primerosOcho);

        if (primerosOchoANumero > 99999999 || primerosOchoANumero <= 9999999) {
            throw new Error("los 8 primeros tienen que ser numeros");
        }


        let numLetra = primerosOcho % 23;

        let letraAdecuada = letras[numLetra];
        console.log(letraAdecuada)

        let letraUsuario = dni.slice(-1);


        console.log(letraUsuario);

        if (/[a-zA-Z]/.test(letraUsuario) === false) {
            throw new Error("El ultimo caracter tiene que ser una letra");
        }

        if (letraAdecuada !== letraUsuario.toUpperCase()) {
            throw new Error("La letra no corresponde a tu numero de dni");
        }
        console.log("dni valido");
    } catch (error) {
        console.error("Error de validacion del DNI:", error.message)
    }






    //calcular el modulo para saber la letra del dni si esta bien, cogiendo los 8 primero digitos del array.

}
validarDNI("15855590b");
validarDNI("14565855590B");
validarDNI("1234p678B");
validarDNI("123456789");


