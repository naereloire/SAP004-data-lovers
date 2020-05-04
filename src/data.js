  export function selectInfosToShow(data) {
    let listPokemon = data;
    let newListCard = [];
    for (let pokemon of listPokemon) {
      let infosCard = {
        number: pokemon.num,
        name: pokemon.name,
        image: pokemon.img,
        probability: pokemon.spawn_chance
        types: pokemon.type.join(", "),
        weaknesses: pokemon.weaknesses.join(", ")
      }
      newListCard.push(infosCard)
    }
    return newListCard
  }
  
  function sortCrescent(objeto1, objeto2, option) {
    if (objeto1[option] < objeto2[option]) {
      return -1
    }
    if (objeto1[option] > objeto2[option]) {
      return 1
    }
    return 0
  }
  
  function sortDecreasing(objeto1, objeto2, option) {
    if (objeto1[option] < objeto2[option]) {
      return 1
    }
    if (objeto1[option] > objeto2[option]) {
      return -1
    }
    return 0
  }
  
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
  
  function compareCategory(objeto, option, category) {
    if (Array.isArray(objeto[option])) {
      for (let element of objeto[option]) {
        if (element == category) {
          return true
        }
      }
    }
    else {
      return objeto[option] == category
    }
  }
  
  export function filterInfons(data, option, category) {
    let listPokemon = data
    let filteredList = []
    filteredList = listPokemon.filter(function (x) { return compareCategory(x, option, category) })
    return filteredList
  }
  
    // mostrar + e
    // esplelhar cards