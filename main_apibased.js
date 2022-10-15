//https://www.epidemicjohto.com/t882-type-colors-hex-colors
//https://www.pokemon.com/us/pokedex/

/* 
código do github da mulhr :
https://github.com/samaramiranda/Pokedex
*/

/* 
-- NO CASO DE OPTAR POR API --
O que falta?
  Nada, mas tem o peso na consciência de ter usado código dos outros pra fazer o fetch() do PokéAPI (Eu voto coooontra usar esse código)
*/

//FUNÇÃO Callback para achar o endereço PokéAPI
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//FUNÇÃO De fetch para com a PokéAPI
const generatePokemonPromises = () => Array(905).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json())))

//FUNÇÃO Construir os parágrafos dos tipos
function typeBadges(types) {
  let badges = ''
  for (let type of types) {
    badges += `<p id="${type}">${type}</p>
      `
  }
  return badges
}

//FUNÇÃO Formatar os IDs
function idPad(id, size) {
  var out = '' + id;
  while (out.length < size) {
    out = '0' + out;
  }

  return out;
}

//
const generateHTML = pokemons => {
  return pokemons.reduce((Pkmn, { id, types, species }) => {

    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    Pkmn += `<div class="col-pk">
              
              <img class="img-pk" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idPad(id, 3)}.png">
              <p class="id-pk">N°${idPad(id, 3)}</p>
              <p>${species.name}</p>
              
              <div class="types">
              ${typeBadges(elementTypes)}
              </div>
              
            </div>`

    return Pkmn
  }, "")
}

const insertPokemonsIntoPage = pokemons => {
  const target = document.querySelector('.container-pk')
  target.insertAdjacentHTML('beforeend', pokemons);
}

//FUNÇÃO Pesquisa por input
function pkSearch() {

  const input = document.getElementById("searchbox").value.toLowerCase()
  const querytargets = document.querySelectorAll('.col-pk')
  //Para cada pokémon dos alvos...
  for (let pokemon of querytargets) {
    //Verifique se o ID do mesmo ou seu Nome corresponde a pesquisa
    if ((pokemon.querySelectorAll("p")[0].innerText.indexOf(input) > -1) || (pokemon.querySelectorAll("p")[1].innerText.toLowerCase().indexOf(input) > -1)) {
      pokemon.style.display = ''
    } else {
      pokemon.style.display = 'none'
    }
  }
  //Limpe a searchbox
  document.getElementById("searchbox").value = ''
}

//FUNÇÃO Escuta por pesquisas na searchbox
function searchBoxListener() {
  const searchbox = document.getElementById("searchbox")
  searchbox.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
      pkSearch()
    }
  })
}

//Inicialização
const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
searchBoxListener()