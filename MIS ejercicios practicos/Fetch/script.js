"use strict";

let apiUrl = "https://dog.ceo/api/breeds/list/all";

fetch(apiUrl).then((res) => {
    //console.log(res);
    res.json().then((data) => console.log("Data fetch 1:", data));
});

////////////////////

// FETCH CON ASYNC...AWAIT

//Esta función la podemos usar siempre que queramos hacer un fetch (tipo GET)
async function getData(url) {
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

//getData(apiUrl).then((res) => console.log(res));

async function printData() {
    let data = await getData(apiUrl);
    console.log("Data async", data);
}

printData();

///////////////////////

// Fetch anidados

fetch(apiUrl).then((res) => {
    //console.log(res);
    res.json().then((data) => {
        let breed = Object.keys(data.message)[0];
        //console.log("Raza:", breed);

        fetch(`https://dog.ceo/api/breed/${breed}/images`).then((res) => {
            res.json().then((data) => {
                let img = data.message[0];
                console.log(img);
            });
        });
    });
});

async function getImage() {
    let data = await getData(apiUrl);
    let breed = Object.keys(data.message)[0];

    //console.log("Raza:", breed);

    let breedData = await getData(`https://dog.ceo/api/breed/${breed}/images`);

    let img = breedData.message[0];

    console.log(img);
}

getImage();

/////////////////////////

