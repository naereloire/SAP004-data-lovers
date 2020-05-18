/**
 * Função para selecionar informações doa array pokemon que serão mostradas.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 pokemons).
 * @returns {Array.<Object>} Retorna uma variavel newListCard, contendo uma lista com informações selecionadas.
 * no objeto anterior.
 */
export function selectInfosToShow(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new TypeError("parâmetro invalido")
  }
  let verifiedCandy
  let listPokemon = data;
  let newListCard = [];
  for (let pokemon of listPokemon) {
    verifiedCandy = pokemon.candy_count
    if (verifiedCandy === undefined) {
      verifiedCandy = "Não possui evolução"
    }
    let infosCard = {
      number: pokemon.num,
      name: pokemon.name,
      image: pokemon.img,
      types: pokemon.type.join(", "),
      weaknesses: pokemon.weaknesses.join(", "),
      probability: pokemon.spawn_chance,
      height: pokemon.height,
      weight: pokemon.weight,
      candy: pokemon.candy,
      candy_count: verifiedCandy,
      egg: pokemon.egg,
    }
    newListCard.push(infosCard)
  }
  return newListCard
}

/**
 * Função que compara dois elementos para definir a ordem de posicionamento do menor para o maior.
 * @param {Object} objeto1 Primeiro objeto a ser comparado (um intem da lista (um pokemon)).
 * @param {Object} objeto2 Segundo  objeto a ser comparado (um intem da lista (um pokemon)).
 * @param {String} option  Uma propriedade do objeto reperesentada por uma string. Ex: no select tipo "type-Grass".
 * @returns Retorna a posição do elemento: -1 = para atŕas; 1 = para frente e 0 = mantém a posição.
 */

function sortCrescent(objeto1, objeto2, option) {
  if (objeto1[option] < objeto2[option]) {
    return -1
  }
  if (objeto1[option] > objeto2[option]) {
    return 1
  }
  return 0
}

/**
 * Função recebe lista de pokemons e ordena de acordo com o parametro.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 pokemons).
 * @param {string} option Uma propriedade do objeto reperesentada por uma string. Ex: no select ordenar "name-increasing".
 * @param {string} order  Uma string ("increasing"/"decreasing")que indica se a ordenação srá crescente ou decrescente.
 * @returns uma lista ordenada.
 */
export function ordenation(data, option, order) {
  if (
    !Array.isArray(data) || data.length === 0,
    typeof option != "string" || option.length === 0,
    typeof order != "string" || order.length === 0
  ) {
    throw new TypeError("parâmetro invalido")
  }

  let listPokemon = data
  let sortedList = []
  if (order === "increasing") {
    sortedList = listPokemon.sort(function (a, b) {
      return sortCrescent(a, b, option)
    })
  }
  if (order === "decreasing") {
    sortedList = listPokemon.sort(function (a, b) {
      return sortCrescent(a, b, option)
    }).reverse()
  }
  return sortedList
}

/**
 * Função que compara searchedValue com a propriedade buscada.
 * @param {Object} objeto Intém(pokemon)da lista de pokemons que tera suas propriedades verificadas.
 * @param {string} option Uma propriedade(ex:name)do objeto reperesentada por uma string.
 * @param {string} searchedValue Uma string representando o valor da buscado. 
 * @returns Comparação entre o objeto e o searchedValue convertendo para LowerCase.
 */
function compareSearchedValue(objeto, option, searchedValue) {
  if (Array.isArray(objeto[option])) {
    for (let element of objeto[option]) {
      if (element === searchedValue) {
        return true
      }
    }
  } else {
    return objeto[option].toLowerCase() === searchedValue.toLowerCase()
  }
}

/**
 * Função aplica a seleção no array de acordo com o SearchedValue.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 pokemons).
 * @param {string} option Uma propriedade(ex:num)do objeto reperesentada por uma string.
 * @param {string} searchedValue uma string representando qualquer valor da buscado no array.
 * @returns Uma lista contendo os objetos filtrados.
 */
export function filterInfons(data, option, searchedValue) {
  if (
    !Array.isArray(data) || data.length === 0 ||
    typeof option != "string" || option.length === 0 ||
    typeof searchedValue != "string"
  ) {
    throw new TypeError("parâmetro invalido")
  }
  let listPokemon = data
  let filteredList = []
  filteredList = listPokemon.filter(function (x) {
    return compareSearchedValue(x, option, searchedValue)
  })
  return filteredList
}

/**
 * Função realiza o calculo do futuro CP após evolução.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 pokemons).
 * @param {number} currentCp Cp atual do pokemon representado por um numero.
 * @param {string} namePokemon Nome do pokemon buscado que terá o futuro CP calculado.
 * @returns Um objeto contendo valor max/min e medio do futuro cp.
 */
export function computeCp(data, currentCp, namePokemon) {
  let pokemonSearched = filterInfons(data, "name", namePokemon);
  pokemonSearched = pokemonSearched[0];
  let computeResult;
  let percentMax = 1.1;
  let percentMin = 0.9;

  if (pokemonSearched.multipliers === null) {
    computeResult = {
      maxCp: "Não possui",
      minCp: "Não possui",
      mediaCp: "Como este Pokémon <br>não possui evolução, <br>ele não gera cálculo de CP.<br>"
    }
  } else {
    if (pokemonSearched.multipliers.length === 1) {
      computeResult = {
        maxCp: (currentCp * pokemonSearched.multipliers[0] * percentMax).toFixed(2),
        minCp: (currentCp * pokemonSearched.multipliers[0] * percentMin).toFixed(2),
        mediaCp: (currentCp * pokemonSearched.multipliers[0]).toFixed(2)
      }
    }
    if (pokemonSearched.multipliers.length === 2) {
      computeResult = {
        maxCp: (currentCp * pokemonSearched.multipliers[1]).toFixed(2),
        minCp: (currentCp * pokemonSearched.multipliers[0]).toFixed(2),
        mediaCp: (currentCp * ((pokemonSearched.multipliers[0] + pokemonSearched.multipliers[1]) / 2)).toFixed(2)
      }
    }
  }
  return computeResult
}

/**
 * Função que acessa o array e seleciona os objetos de interesse 
 * (ex: a proxima evolução do pokemon filtrado).
 * @param {Array.<Object>} data Array contendo lista de objetos(151 pokemons).
 * @param {Object} namePokemon Intém(pokemon)da lista de pokemons, 
 * que representa a proxima evolução do pokemon filtrado.  
 * @returns Uma lista com um objeto.
 */
export function getNextEvolution(data, namePokemon) {
  let evolutionList = []
  let pokemon = filterInfons(data, "name", namePokemon)[0]
  if (pokemon.next_evolution === undefined) {
    return evolutionList = []
  }
  else {
    evolutionList.push(pokemon)
    for (let evolution of pokemon.next_evolution) {
      let pokemonEvolution = filterInfons(data, "name", evolution.name)[0]
      evolutionList.push(pokemonEvolution)
    }

    return evolutionList
  }
}