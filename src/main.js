import data from './data/pokemon/pokemon.js';
import {selectInfosToShow, ordenation } from './data.js'

let arrayPokemon = data.pokemon


function showPokemons(arrayPokemon) {
    arrayPokemon = selectInfosToShow(arrayPokemon)

    let getDivCards = document.getElementById("local-cards")
    getDivCards.innerHTML = ""

    for (let pokemon of arrayPokemon) {
        let createDivCard = document.createElement("div")
        
        createDivCard.className = "card-style"
        
        createDivCard.innerHTML += pokemon.name + "<br>" + 
        
        pokemon.number + "<br>" + pokemon.probability
        
        getDivCards.appendChild(createDivCard)
        
        let createImgPokemon = document.createElement("img")
        
        createDivCard.appendChild(createImgPokemon)
        
        createImgPokemon.srcset = pokemon.image
    }
}
showPokemons(arrayPokemon)

let getSelectOrder = document.getElementById("ordination")


function sortPokemons(event) {
    // debugger;
    let elementoSelect = event.target
    let selectedOption = elementoSelect.options[elementoSelect.selectedIndex].value
    let list = []
    if(selectedOption==""){list=arrayPokemon}
    
    else{
    let arrayParameters=selectedOption.split("-")
    list=ordenation(arrayPokemon,arrayParameters[0],arrayParameters[1])

    }
    // refatorado com método split
    // if (selectedOption == "a-z") {
    //     list = ordenation(arrayPokemon, "name", "increasing")
    // }
    // if (selectedOption == "z-a") {
    //     list = ordenation(arrayPokemon, "name", "decreasing")
    // }

    // if (selectedOption=="num-cresc") {
    //     list = ordenation(arrayPokemon,"num","increasing")
    // }
    // if (selectedOption=="num-decresc") {
    //     list = ordenation(arrayPokemon,"num","decreasing")
    // }
    // debugger;
    showPokemons(list)
}
getSelectOrder.addEventListener("change", sortPokemons)

