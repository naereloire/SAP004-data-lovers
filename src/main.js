import data from './data/pokemon/pokemon.js';
import { selectInfosToShow, ordenation, filterInfons } from './data.js'

let arrayPokemon = data.pokemon

/**
 * Função para mostrar os dados na tela. 
 * @param {Array.<Object>} arrayPokemon array contendo lista de obejots(151 pokemons)
 */
showPokemons(arrayPokemon)

function showPokemons(arrayPokemon) {
    arrayPokemon = selectInfosToShow(arrayPokemon);
    let showPokemons = document.getElementById("local-cards");
    let card = "";
    showPokemons.innerHTML = "";
  
    for (let pokemon of arrayPokemon) {
      card += `
            <div class="card-style">
              <h2 class = "title-poke">${pokemon.name} ${pokemon.number}</h2>
              <img class="img-poke" src ="${pokemon.image}" alt ="imagem ${pokemon.name}"/>
              <div class="div-poke">
              <p class="subtitle-poke"><strong>Tipo:</strong></p>
              <p class="items-poke" >${pokemon.types}</p>
              <p class="subtitle-poke"><strong>Fraquezas:</strong></p>
              <p class="items-poke" >${pokemon.weaknesses}</p>
              <p class="subtitle-poke"><strong>Spawn:</strong></p>
              <p class="items-poke" > ${pokemon.probability}</p>
              </div>
            </div>`;
    }
    showPokemons.innerHTML = card;
}

let getSelectOrder = document.getElementById("ordination")

/**
 * Função para ordenar os dados e mostrar na tela.
 * @param {EventListener} event de mudança no select que aplica a ordenção utilizando.
 */
function sortPokemons(event) {
    let elementSelect = event.target
    let selectedOption = elementSelect.options[elementSelect.selectedIndex].value
    let list = []
    if (selectedOption == "") { list = arrayPokemon }
    else {
        let arrayParameters = selectedOption.split("-")
        list = ordenation(arrayPokemon, arrayParameters[0], arrayParameters[1])
    }
    showPokemons(list)
}
getSelectOrder.addEventListener("change", sortPokemons)

let getSelectFilterType = document.getElementById("filter-type")

/**
 * Função para filtrar os dados e mostrar na tela.
 * @param {EventListener} event de mudança no select que aplica a filtragem utilizando.
 */
function filterPokemons(event) {
    let elementSelect = event.target
    let selectedOption = elementSelect.options[elementSelect.selectedIndex].value
    let list = []
    if (selectedOption == "") { list = arrayPokemon }
    else {
        let arrayParameters = selectedOption.split("-")
        list = filterInfons(arrayPokemon, arrayParameters[0], arrayParameters[1])
    }
    showPokemons(list)
}

getSelectFilterType.addEventListener("change", filterPokemons)

let getSelectWeaknessType = document.getElementById("filter-weakness")
getSelectWeaknessType.addEventListener("change", filterPokemons)

let getInputSearch = document.getElementById("search")
let getButtonSearch = document.getElementById("button-search")

/**
 * Função para buscar o Pokemon pelo nome e mostrar na tela (usando.
 * @param {EventListener} event evento de enter ou click.
 */
function searchByName(event) {
    if (event.key == "Enter" || event.type == "click") {
        let searchResult = filterInfons(arrayPokemon, "name", getInputSearch.value)
        showPokemons(searchResult)
    }
}

getInputSearch.addEventListener("keypress", searchByName)
getButtonSearch.addEventListener("click", searchByName)