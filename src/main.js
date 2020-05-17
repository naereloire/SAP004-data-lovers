import data from './data/pokemon/pokemon.js';
import { selectInfosToShow, ordenation, filterInfons,} from './data.js'

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
    <div class="box-container">
      <div class="box-cards">
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
        </div>
        <div class="card-back"> 
          <h2 class = "title-poke">${pokemon.name} ${pokemon.number}</h2>
          <p class="subtitle-poke"><strong>Peso:</strong></p>
          <p class="items-poke" >${pokemon.height}</p>
          <p class="subtitle-poke"><strong>Altura:</strong></p>
          <p class="items-poke" >${pokemon.weight}</p>
          <p class="subtitle-poke"><strong>Doce:</strong></p>
          <p class="items-poke" >${pokemon.candy}</p>
          <p class="subtitle-poke"><strong>Doces para Evoluir:</strong></p>
          <p class="items-poke" >${pokemon.candy_count}</p>
          <p class="subtitle-poke"><strong>Ovo:</strong></p>
          <p class="items-poke" >${pokemon.egg}</p>
        </div>
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

  if (selectedOption === "") {
    list = arrayAuxiliar
  } else {
    list = ordenation(arrayAuxiliar, arrayParameters[0], arrayParameters[1])
  }
  showPokemons(list)
}

getSelectOrder.addEventListener("change", sortPokemons)


let getSelectFilterType = document.getElementById("filter-type")
let getSelectWeaknessType = document.getElementById("filter-weakness")
/**
 * Função para filtrar os dados e mostrar na tela.
 * @param {EventListener} event de mudança no select que aplica a filtragem utilizando.
 */
function filterPokemons() {
  let list = []
  let valueFiltertype = getSelectFilterType.options[getSelectFilterType.selectedIndex].value
  let valueFilterWkenesses = getSelectWeaknessType.options[getSelectWeaknessType.selectedIndex].value
  let list_type = arrayPokemon
  let list_weak = arrayPokemon
  let arrayParameters

  if (valueFilterWkenesses !== "") {
    arrayParameters = valueFilterWkenesses.split("-")
    list_type = filterInfons(list_type, arrayParameters[0], arrayParameters[1])
  }
  if (valueFiltertype !== "") {
    arrayParameters = valueFiltertype.split("-")
    list_weak = filterInfons(list_weak, arrayParameters[0], arrayParameters[1])
  }
  list = list_type.filter(function (x) {
    return list_weak.includes(x)
  });

  arrayAuxiliar = list
  let newEvent = document.createEvent('Event');
  newEvent.initEvent('change', true, true);
  getSelectOrder.dispatchEvent(newEvent);
}

getSelectFilterType.addEventListener("change", filterPokemons)
getSelectWeaknessType.addEventListener("change", filterPokemons)

let getInputSearch = document.getElementById("search")
let getButtonSearch = document.getElementById("button-search")

/**
 * Função para buscar o Pokemon pelo nome e mostrar na tela (usando.
 * @param {EventListener} event evento de enter ou click.
 */
function searchByName(event) {
  if (event.key === "Enter" || event.type === "click") {
    let searchResult = filterInfons(arrayPokemon, "name", getInputSearch.value)
    showPokemons(searchResult)
  }
}

getInputSearch.addEventListener("keypress", searchByName)
getButtonSearch.addEventListener("click", searchByName)