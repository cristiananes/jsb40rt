function cleanDupes(arr = names) {
    //limpiar duplicados
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

const names = [
    "A-Jay",
    "Manuel",
    "Manuel",
    "Eddie",
    "A-Jay",
    "Su",
    "Reean",
    "Manuel",
    "A-Jay",
    "Zacharie",
    "Zacharie",
    "Tyra",
    "Rishi",
    "Arun",
    "Kenton",
];
console.log(cleanDupes());