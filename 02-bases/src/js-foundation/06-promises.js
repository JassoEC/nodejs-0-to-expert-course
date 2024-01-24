const { http } = require("../adapters")

// const getPokemonById = (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`
//   return fetch(url)
//     .then(response => response.json())
//     // .then((() => { throw new Error('Error when obtaining pokemon') }))
//     .then(pokemon => pokemon.name)
// }

// const getPokemonById = async (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`
//   const response = await fetch(url)
//   const pokemon = await response.json()
//   return pokemon.name
// }


const getPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const pokemon = await http.get(url)
  return pokemon.name
}

module.exports = { getPokemonById }