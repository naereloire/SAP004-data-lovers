import dataManipulation from './data.js'

let arrayPokemon=dataManipulation.getData()
let getDivCards=document.getElementById("local-cards")

for(let pokemon of arrayPokemon){
let createDivCard=document.createElement("div")
createDivCard.className="card-style"
createDivCard.innerHTML+=pokemon.name + "<br>" + pokemon.numero
getDivCards.appendChild(createDivCard)
let createImgPokemon=document.createElement("img")
createDivCard.appendChild(createImgPokemon)
createImgPokemon.srcset=pokemon.imagem