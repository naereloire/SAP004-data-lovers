export function getData(data) {
    let listPokemon = data.pokemon;
    let newListCard = [];
    for (let pokemon of listPokemon) {
      let infosCard = {
        numero: pokemon.num,
        nome: pokemon.name,
        imagem: pokemon.img,
        tipos: pokemon.type.join(", "),
        fraquezas: pokemon.weaknesses.join(", ")
      }
      newListCard.push(infosCard);
    }
    return newListCard;
  }