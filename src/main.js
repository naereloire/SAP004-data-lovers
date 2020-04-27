import data from './data/pokemon/pokemon.js';

console.log(data);

const pokemonName = data.pokemon[0].name;
document.getElementById("cards").innerHTML = `<h3>${pokemonName}</h3>`;
console.log(pokemonName);

const pokemonImg = data.pokemon[0].img;
document.getElementById("cards").innerHTML = `<img src=${pokemonImg} alt="imagem"></img>`;
console.log(pokemonImg)