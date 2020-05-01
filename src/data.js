export function selectInfosToShow(data){
  let listPokemon= data
  let newListCard=[]
  for (let pokemon of listPokemon){
    let infosCard={
      
      numero:pokemon.num,
      name:pokemon.name,
      imagem:pokemon.img}
    
    newListCard.push(infosCard)
  }
  
  return newListCard
  }

  function alphaCrescent(objeto1,objeto2,option){
    
    if (objeto1[option]<objeto2[option]){
      return -1
    }
    if (objeto1[option]>objeto2[option]){
    return 1
    }
    return 0
  }

  function alphaDecreasing(objeto1,objeto2,option){
    if (objeto1[option]<objeto2[option]){
      return 1
    }
    if (objeto1[option]>objeto2[option]){
    return -1
    }
    return 0
  }
  
  
  
  export function ordenation(data,option,order){
    let listPokemon= data
    let sortedList=[]
    if (order=="increasing"){
      sortedList=listPokemon.sort(function(a,b){return alphaCrescent(a,b,option)} )
    }
    if (order=="decreasing"){
      sortedList=listPokemon.sort(function(a,b){return alphaDecreasing(a,b,option)} )
    }
    return sortedList

  }
  // mostrar + e 
  // esplelhar cards