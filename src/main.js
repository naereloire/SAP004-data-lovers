import data from './data/pokemon/pokemon.js';
import {getData} from './data.js'

let arrayPokemon = getData(data)
showPokemon(arrayPokemon);

function showPokemon(arrayPokemon) {
  let showPokemons = document.getElementById("local-cards");
  let card = "";
  showPokemons.innerHTML = "";

  for (let pokemon of arrayPokemon) {
    card += `
          <div class="card-style">
            <h2 class = "title-poke">${pokemon.nome}</h2>
            <img class="img-poke" src ="${pokemon.imagem}" alt ="imagem ${pokemon.nome}"/>
            <div class="div-poke">
            <p class="subtitle-poke"><strong>Tipo:</strong></p>
            <p class="items-poke" >${pokemon.tipos}</p>
            <p class="subtitle-poke"><strong>Fraquezas:</strong></p>
            <p class="items-poke" >${pokemon.fraquezas}</p>
            </div>
          </div>`;
  }
  showPokemons.innerHTML = card;
}
