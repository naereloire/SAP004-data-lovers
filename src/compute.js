import data from './data/pokemon/pokemon.js';
import { ordenation, computeCp, filterInfons, getNextEvolution } from './data.js'

const arrayPokemon = data.pokemon;
let dataListSorted = ordenation(arrayPokemon, "name", "increasing");
let getDataList = document.getElementById("pokemon-list");

for (let pokemon of dataListSorted) {
  let createOption = document.createElement("option");
  createOption.value = pokemon.name;
  getDataList.appendChild(createOption);
}

document.getElementById("button-search").addEventListener("click", calculateAndShow);
/**
 * Função para calcular os dados inseridos nos inputs e mostrar na tela.
 * @param {Event} event para a prevenção de reinicio automático da função.
 */
function calculateAndShow(event) {
  event.preventDefault();

  let showPokemon = document.getElementById("cards");
  let inputName = document.getElementById("search-name").value;
  let inputCp = document.getElementById("search-cp").value;
  if (inputCp === "") { inputCp = 0 }
  let result = (computeCp(arrayPokemon, inputCp, inputName));
  let pokemon = filterInfons(arrayPokemon, "name", inputName);
  let evolutions = getNextEvolution(arrayPokemon, inputName)

  let card = "";
  showPokemon.innerHTML = "";
  pokemon = pokemon[0];

  if (evolutions.length === 0) {
    card += `
  <div class="card-style">
   <h1>${pokemon.name}</h1>
    <img class="img-poke" src ="${pokemon.img}" alt ="imagem ${pokemon.name}"/>
  </div>
  
  <div class="card-style">
   <strong>Este pokemon não possui evolução.</strong>
  </div>`;
    showPokemon.innerHTML = card;
  }
  else {
    if (inputName !== "" && inputCp !== "") {
    card += `
    <div class="card-style">
     <h1>${pokemon.name}</h1>
     <img class="img-poke" src ="${pokemon.img}" alt ="imagem ${pokemon.name}"/>
    </div>
          
    <div class="div-seta">
      <img class="seta-poke" src ="https://lh3.googleusercontent.com/proxy/txb6TxVeHpioJKExAgQNM5uzO5mZDhG0nlD3NccPbHnyHYUmdqrYbZvxANGWLlhtrMaZ4LQU5DRsLAjizS5qi1_vokYn7-aNlrXKJKBk8hX6efozJCr_" alt ="imagem seta"/>
    </div>

    <div class="card-style">
      <h1>${evolutions[0].name}</h1>
      <img class="img-poke" src ="${evolutions[0].img}" alt ="imagem ${evolutions[0].name}"/>
    </div>
          
    <div class="card-style">
      <p><strong>Média CP:</strong> ${result.mediaCp}<br>
      <strong>Min CP:</strong> ${result.minCp}<br>
      <strong>Max CP:</strong> ${result.maxCp}</p>
      <p><strong>Doce:</strong> ${pokemon.candy}<br>
      <strong>Quant. de doces:</strong> ${pokemon.candy_count}</p>
    </div>`;
    }
    showPokemon.innerHTML = card;
  }
}