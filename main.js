import data from './data/pokemon/pokemon.js';
import { selectInfosToShow, ordenation, filterInfons } from './data.js'

const arrayPokemon = data.pokemon
let arrayAuxiliar = arrayPokemon

/**
 * Função para mostrar os dados na tela. 
 * @param {Array.<Object>} arrayPokemon array contendo lista de obejots(151 pokemons)
 */


function showPokemons(arrayPokemon) {
  let showPokemons = document.getElementById("local-cards");
  let card = "";
  showPokemons.innerHTML = "";

  if (arrayPokemon.length === 0) {
    
    card += "<br>Resultado não encontrado</br>";
  } else {
    arrayPokemon = selectInfosToShow(arrayPokemon)
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
              <p class="subtitle-poke"><strong>Chance de aparecer:</strong></p>
              <p class="items-poke" > ${pokemon.probability}</p>
              </div>
            </div>`;
    }
  }
  showPokemons.innerHTML = card;
}

showPokemons(arrayPokemon)

let getSelectOrder = document.getElementById("ordination")

/**
 * Função para ordenar os dados e mostrar na tela.
 * @param {EventListener} event de mudança no select que aplica a ordenção.
 */
function sortPokemons(event) {
  let elementSelect = event.target
  let selectedOption = elementSelect.options[elementSelect.selectedIndex].value
  let list = []
  let arrayParameters = selectedOption.split("-")

  if (selectedOption == "") {
    list = arrayAuxiliar
  }
  else {
    list = ordenation(arrayAuxiliar, arrayParameters[0], arrayParameters[1])
  }
  showPokemons(list)
}
getSelectOrder.addEventListener("change", sortPokemons)


let getSelectFilterType = document.getElementById("filter-type")

/**
 * Função para filtrar os dados e mostrar na tela.
 * @param {EventListener} event de mudança no select que aplica a filtragem utilizando.
 */
function filterPokemons() {
  let list = []
  let filterType = document.getElementById("filter-type")
  let valueFiltertype = filterType.options[filterType.selectedIndex].value

  let filterWkenesses = document.getElementById("filter-weakness")
  let valueFilterWkenesses = filterWkenesses.options[filterWkenesses.selectedIndex].value
  let list_type = arrayPokemon
  let list_weak = arrayPokemon
  let arrayParameters


  if (valueFiltertype == "" && valueFilterWkenesses == "") {
    list = arrayPokemon
  }
  else {
    if (valueFilterWkenesses !== "") {
      arrayParameters = valueFilterWkenesses.split("-")
      list_type = filterInfons(list_type, arrayParameters[0], arrayParameters[1])
    }
    if (valueFiltertype !== "") {
      arrayParameters = valueFiltertype.split("-")
      list_weak = filterInfons(list_weak, arrayParameters[0], arrayParameters[1])
    }
    list = list_type.filter(function (x) { return list_weak.includes(x) });
  }


  arrayAuxiliar = list

  let newEvent = document.createEvent('Event');
  newEvent.initEvent('sortList', true, true);
  getSelectOrder.dispatchEvent(newEvent);

}
getSelectOrder.addEventListener("sortList", sortPokemons)

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
