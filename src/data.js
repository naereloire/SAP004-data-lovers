export function getData(data){
  let listPokemon= data.pokemon
  let newListCard=[]
  for (let pokemon of listPokemon){
    let infosCard={
      
      numero:pokemon.num,
      name:pokemon.name,
      imagem:pokemon.img}
    
    newListCard.push(infosCard)
  }
  // debugger
  return newListCard
  }
