import data from './data/pokemon/pokemon.js';

console.log(data);

const pokemon = data.pokemon[0].name;
console.log(pokemon);
const pokemonImg = data.pokemon[0].img;
console.log(pokemonImg);

const pokemonImg2 = data.pokemon[0].img;
document.getElementById("cards").innerHTML = pokemonImg2;