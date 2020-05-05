/**
 * Função para selecionar informações doa array pokemon que serão mostradas.
 * @param {Array.<Object>} data array contendo lista de obejots(151 pokemons)
 * @returns {Array.<Object>} Retorna uma variavel newListCard, contendo uma lista com informações selecionadas 
 * no objeto anterior.
 */
export function selectInfosToShow(data) {
  let listPokemon = data
  let newListCard = []
  for (let pokemon of listPokemon) {
    let infosCard = {

      number: pokemon.num,
      name: pokemon.name,
      image: pokemon.img,
      probability: pokemon.spawn_chance
    }

    newListCard.push(infosCard)
  }

  return newListCard
}
/**
 * Função que compara dois elementos para definir a ordem de posicionamento do maior para o menor
 * @param {Object} objeto1 Primeiro objeto a ser comparado (um intem da lista (um pokemon))
 * @param {Object} objeto2 Segundo  objeto a ser comparado (um intem da lista (um pokemon))
 * @param {String} option  Uma propriedade do objeto reperesentada por uma string. Ex: no select tipo "type-Grass"
 * @returns retorna a posição do elemento: -1 = para atŕas; 1 = para frente e 0 = mantém a posição.
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
 * Função que compara dois elementos para definir a ordem de posicionamento do menor para o maior
 * @param {Object} objeto1 Primeiro objeto a ser comparado (um intem da lista (um pokemon))
 * @param {Object} objeto2 Segundo  objeto a ser comparado (um intem da lista (um pokemon))
 * @param {String} option  Uma propriedade do objeto reperesentada por uma string. Ex: no select tipo "type-Grass"
 * @returns retorna a posição do elemento: -1 = para atŕas; 1 = para frente e 0 = mantém a posição.
 */
function sortDecreasing(objeto1, objeto2, option) {
  if (objeto1[option] < objeto2[option]) {
    return 1
  }
  if (objeto1[option] > objeto2[option]) {
    return -1
  }
  return 0
}


/**
 * Função recebe lista de pokemons e ordena de acordo com o parametro.
 * @param {Array.<Object>} data array contendo lista de obejots(151 pokemons).
 * @param {string} option Uma propriedade do objeto reperesentada por uma string. Ex: no select ordenar "name-increasing".
 * @param {string} order  Uma string ("increasing"/"decreasing")que indica se a ordenação srá crescente ou decrescente.
 * @returns uma lista ordenada.
 */
export function ordenation(data, option, order) {
  let listPokemon = data
  let sortedList = []
  if (order == "increasing") {
    sortedList = listPokemon.sort(function (a, b) { return sortCrescent(a, b, option) })
  }
  if (order == "decreasing") {
    sortedList = listPokemon.sort(function (a, b) { return sortDecreasing(a, b, option) })
  }
  return sortedList

}

/**
 * Função que compara searchedValue com a propriedade buscada.
 * @param {Object} objeto intem(pokemon)da lista de pokemons que tera suas propriedades verificadas.
 * @param {string} option Uma propriedade(ex:name)do objeto reperesentada por uma string.
 * @param {string} searchedValue uma string representando o valor da buscado. 
 * @returns comparação entre o objeto e o searchedValue convertendo para LowerCase.
 */
function compareSearchedValue(objeto, option, searchedValue) {
  if (Array.isArray(objeto[option])) {
    for (let element of objeto[option]) {
      if (element == searchedValue) {
        return true
      }
    }
  }
  else {
    return objeto[option].toLocaleLowerCase() == searchedValue.toLocaleLowerCase()

  }
}

/**
 * Função aplica a seleção no array de acordo com o SearchedValue.
 * @param {*} data array contendo lista de obejots(151 pokemons)
 * @param {*} option Uma propriedade(ex:num)do objeto reperesentada por uma string.
 * @param {*} searchedValue uma string representando o valor da buscado. 
 * @returns Uma lista contendo os objetos filtrados.
 */
export function filterInfons(data, option, searchedValue) {
  let listPokemon = data
  let filteredList = []
  filteredList = listPokemon.filter(function (x) { return compareSearchedValue(x, option, searchedValue) })
  return filteredList
}

  