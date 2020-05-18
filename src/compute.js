/* global Chart*/

import data from './data/pokemon/pokemon.js';
import { ordenation, computeCp, filterInfons, getNextEvolution, calcPorcent } from './data.js'

const arrayPokemon = data.pokemon;
let dataListSorted = ordenation(arrayPokemon, "name", "increasing");
let getDataList = document.getElementById("pokemon-list");

for (let pokemon of dataListSorted) {
  let createOption = document.createElement("option");
  createOption.value = pokemon.name;
  getDataList.appendChild(createOption);
}

document.getElementById("button-search").addEventListener("click", calculateAndShow);

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
      <h1>${evolutions[1].name}</h1>
      <img class="img-poke" src ="${evolutions[1].img}" alt ="imagem ${evolutions[1].name}"/>
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

const arrayTypes = [
  "Grass",
  "Poison",
  "Fire",
  "Flying",
  "Water",
  "Bug",
  "Electric",
  "Ground",
  "Fighting",
  "Psychic",
  "Rock",
  "Ice",
  "Ghost",
  "Dragon",
  "Fairy",
  "Dark",
  "Steel",
]
let porcentResult = calcPorcent(arrayPokemon, "type", arrayTypes)

let canva = document.getElementById("graphic-types").getContext("2d")
let colorList = [
  'rgb(129,182,110)',
  'rgb(238,130,238)',
  'rgb(233,169,41)',
  'rgb(128,128,128)',
  'rgb(102,102,255)',
  'rgb(0,102,0)',
  'rgb(233,220,41)',
  'rgb(102,51,0)',
  'rgb(255,51,51)',
  'rgb(255,102,178)',
  'rgb(32,32,32)',
  'rgb(102,255,255)',
  'rgb(102,0,102)',
  'rgb(255,145,0)',
  'rgb(255,204,229)',
  'rgb(0,25,51)',
  'rgb(64,64,64)',
]
let _graphicTypes;
_graphicTypes = new Chart(canva, {
  type: "doughnut",
  data: {
    labels: arrayTypes,
    datasets: [{
      label: "Porcentual de pokemons",
      data: porcentResult,
      backgroundColor: colorList
    }]},
    options: {
      plugins:{
        labels:{
       fontColor:'rgb(0,0,0)', 
       orverlap: false, 
       position:'outside',
       arc:true,
       textMargin:1,
       fontSize:10,
       render:function(value){return value.value + '%'},
       showActualPercentages:false,
      }
      },
      responsive: true,
      legend: {
        fontColor:'rgb(0,0,0)',
        fontSize: '14',
        position: "right"
      },
      title: {
        display: true,
        fontColor:'rgb(0,0,0)',
        fontSize: '18',
        text: "Pokemons por tipo"
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }

    }
});

