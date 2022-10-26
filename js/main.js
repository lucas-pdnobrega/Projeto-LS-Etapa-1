//https://www.epidemicjohto.com/t882-type-colors-hex-colors
//https://www.pokemon.com/us/pokedex/

import dex from './dex.js'

var current_id = [...dex].length

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
  return `<div class="col-pk" id="n${idPad(pokemon.id, 3)}">
              
              <img class="img-pk" src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${idPad(pokemon.id, 3)}.png">
              <p class="id-pk">N°${idPad(pokemon.id, 3)}</p>
              <p>${pokemon.name}</p>
              
              <div class="types">
              ${typeBadges(pokemon.type)}
              </div>
              
            </div>`
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
    const types = pokemon.querySelectorAll(".types p")
    if ((pokemon.querySelectorAll("p")[0].innerText.indexOf(input) > -1) || (pokemon.querySelectorAll("p")[1].innerText.toLowerCase().indexOf(input) > -1)) {
      pokemon.style.display = ''
    } else {
      pokemon.style.display = 'none'
    }
  })
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

function mostrarModal() {
  const element = document.getElementById("modal");
  element.classList.add("mostrar-modal");
}

function esconderModal() {
  const element = document.getElementById("modal");
  element.classList.remove("mostrar-modal");
}

//FUNÇÃO Escuta por cliques no botão adicionar
function addBtnListener() {
  const button = document.getElementById("btn-pk")
  button.addEventListener('click', function(event) {
    mostrarModal()
  })
}

function removerBtnListener() {
  const button = document.getElementById("esconderModal")
  button.addEventListener('click', function(event) {
    esconderModal()
  })
}

function confirmBtnListener() {
  const button = document.getElementById("confirm-pk")
  button.addEventListener('click', function(event) {
    current_id += 1
    const form = document.getElementById('adicionarPKMN');
    const formData = new FormData(form);

    let newPk = {}
    let newTypes = []
    
    const newNome = formData.get('nome')

    if (formData.get('tipo2') == '') {
      newTypes = [formData.get('tipo1')]
    } else {
      newTypes = [formData.get('tipo1'), formData.get('tipo2')]
    }
    
    newPk.id = current_id
    newPk.name = newNome
    newPk.type = newTypes
    
    const target = document.querySelector('.container-pk')
    target.insertAdjacentHTML('beforeend', createPkmn(newPk));
    esconderModal()
    document.getElementById(`n${idPad(current_id, 3)}`).scrollIntoView()
  })
}
 

//Inicialização
fillHTML()
searchBoxListener()
addBtnListener()
removerBtnListener()
confirmBtnListener()