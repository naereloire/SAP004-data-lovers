import data from './data/pokemon/pokemon.js';
import {ordenation,} from './data.js'

const arrayPokemon = data.pokemon
let dataListSorted = ordenation(arrayPokemon,"name","increasing")

let getDataList = document.getElementById("pokemon-list")

for (let pokemon of dataListSorted) {
    let createOption = document.createElement("option")
    createOption.value = pokemon.name
    getDataList.appendChild(createOption)
}

