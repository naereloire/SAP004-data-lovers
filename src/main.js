import data from './data/pokemon/pokemon.js';
import {selectInfosToShow, ordenation, filterInfons } from './data.js'

let arrayPokemon = data.pokemon


function showPokemons(arrayPokemon) {
    arrayPokemon = selectInfosToShow(arrayPokemon)

    let getDivCards = document.getElementById("local-cards")
    getDivCards.innerHTML = ""
    
    if (arrayPokemon.length==0){
        getDivCards.innerHTML = "<br>Resultado não encontrado</br>"
        }
    else {  
        for (let pokemon of arrayPokemon) {
        let createDivCard = document.createElement("div")
        
        createDivCard.className = "card-style"
        
        createDivCard.innerHTML += "Nome:"+ pokemon.name + "<br>" + "Nº:"+
        
        pokemon.number + "<br>" + "Spawn:"+pokemon.probability
        
        getDivCards.appendChild(createDivCard)
        
        let createImgPokemon = document.createElement("img")
        
        createDivCard.appendChild(createImgPokemon)
        
        createImgPokemon.srcset = pokemon.image
    }}
}
showPokemons(arrayPokemon)

let getSelectOrder = document.getElementById("ordination")


function sortPokemons(event) {
    // debugger;
    let elementSelect = event.target
    let selectedOption = elementSelect.options[elementSelect.selectedIndex].value
    let list = []
    if(selectedOption==""){list=arrayPokemon}
    
    else{
    let arrayParameters=selectedOption.split("-")
    list=ordenation(arrayPokemon,arrayParameters[0],arrayParameters[1])

    }
    showPokemons(list)
}
getSelectOrder.addEventListener("change", sortPokemons)


let getSelectFilterType = document.getElementById("filter-type")

function filterPokemons (event){
let elementSelect=event.target
let selectedOption=elementSelect.options[elementSelect.selectedIndex].value    
let list=[]
if (selectedOption==""){list=arrayPokemon}
else{
let arrayParameters=selectedOption.split("-")  
list=filterInfons(arrayPokemon,arrayParameters[0],arrayParameters[1])
}

showPokemons(list)
}

getSelectFilterType.addEventListener("change", filterPokemons)

let getSelectWeaknessType = document.getElementById("filter-weakness")

getSelectWeaknessType.addEventListener("change", filterPokemons)

let getInputSearch=document.getElementById("search")

function inputEnter(event){
  
if(event.key=="Enter" || event.type=="click"){  
let searchResult=filterInfons(arrayPokemon,"name",getInputSearch.value)
showPokemons(searchResult)
}
}
getInputSearch.addEventListener("keypress",inputEnter)