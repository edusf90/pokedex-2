const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

// Pokemon Inicial
let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIresponse.status == 200) {
    const data = await APIresponse.json()
    console.log(data.id)

    return data
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Poke Não Existe'
  }
}

// Renderizando pokemon
const renderPokemon = async pokemon => {
  pokemonNumber.innerHTML = ''
  pokemonName.innerHTML = 'Carregando...'

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
  }
  pokemonNumber.innerHTML = data.id + ' - '
  pokemonName.innerHTML = data.name
  pokemonImage.src =
    data['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ]
}
// FIM

// evento da barra de pesquisa
form.addEventListener('submit', function (event) {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
  input.value = ''
})
// FIM

// eventos do botão de -1
buttonPrev.addEventListener('click', function () {
  console.log(searchPokemon)

  searchPokemon = searchPokemon - 1
  if (searchPokemon < 1) {
    searchPokemon = 1
  }
  renderPokemon(searchPokemon)
})
// FIM

// eventos do botão de +1
buttonNext.addEventListener('click', function () {
  // console.log(searchPokemon)
  searchPokemon = searchPokemon + 1
  if (searchPokemon > 649) {
    searchPokemon = 649
  }
  renderPokemon(searchPokemon)
})
// FIM

// Pokemon inicial
renderPokemon(searchPokemon)
// FIM
