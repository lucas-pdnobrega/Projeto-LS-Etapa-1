//https://www.epidemicjohto.com/t882-type-colors-hex-colors
//https://www.pokemon.com/us/pokedex/

/* 
-- NO CASO DE OPTAR POR JSON --
O que falta?
  Escrever um 'banco de dados' englobando uma boa amostra de pokémons
  Implementar botões de filtro por tipos(Já dá pra matar por reduce/filter)
*/
import dex from './dex.js'

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

//FUNÇÃO Construir as colunas de Pokémons
function createPkmn(pokemon) {
  let Pkmn = `<div class="col-pk">
              
              <img class="img-pk" src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${idPad(pokemon.id, 3)}.png">
              <p class="id-pk">N°${idPad(pokemon.id, 3)}</p>
              <p>${pokemon.name}</p>
              
              <div class="types">
              ${typeBadges(pokemon.type)}
              </div>
              
            </div>`
  return Pkmn
}

//FUNÇÃO Preencher o HTML dentro do container
function fillHTML() {

  const target = document.querySelector('.container-pk');

  for (const atual of dex) {
    let current = createPkmn(atual)
    target.insertAdjacentHTML('beforeend', current);
  }
}

//FUNÇÃO Pesquisa por input
function pkSearch() {
  //Seleção inicial
  const input = document.getElementById("searchbox").value.toLowerCase()
  const querytargets = document.querySelectorAll('.col-pk')

  //Mapeie cada elemento do querytargets baseado na seguinte função...
  const srch = [...querytargets].map((pokemon) => {
    //Se o conteúdo do ID ou Nome do pokémon atual corresponder a qualquer parte da pesquisa, poupe-o de virar DANONE
    if ((pokemon.querySelectorAll("p")[0].innerText.indexOf(input) > -1) || (pokemon.querySelectorAll("p")[1].innerText.toLowerCase().indexOf(input) > -1)) {
      pokemon.style.display = ''
    } else {
      pokemon.style.display = 'none'
    }
  })
  //Após tudo, limpe a searchbox
  document.getElementById("searchbox").value = ''
}

/*

  -- VERSÃO SEM MAP ABAIXO --

  function pkSearch() {
  
  const input = document.getElementById("searchbox").value.toLowerCase()
  const querytargets = document.querySelectorAll('.col-pk')
  //Para cada pokémon dos alvos...
  /*for (let pokemon of querytargets) {
    //Verifique se o ID do mesmo ou seu Nome corresponde a pesquisa
    if ((pokemon.querySelectorAll("p")[0].innerText.indexOf(input) > -1) || (pokemon.querySelectorAll("p")[1].innerText.toLowerCase().indexOf(input) > -1)){
      pokemon.style.display = ''
    } else {
      pokemon.style.display = 'none'
    }
  } 
  
*/

//FUNÇÃO Escuta por pesquisas na searchbox
function searchBoxListener() {
  const searchbox = document.getElementById("searchbox")
  searchbox.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
      pkSearch()
    }
  })
}

function addPkm() {
  console.log('EU EXISTO')
}

//Inicialização
fillHTML()
searchBoxListener()