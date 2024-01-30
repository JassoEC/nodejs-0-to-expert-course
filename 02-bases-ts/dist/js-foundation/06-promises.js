"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonNameById = void 0;
const adapters_1 = require("../adapters");
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
const getPokemonNameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokemon = yield adapters_1.http.get(url);
        return pokemon.name;
    }
    catch (error) {
        throw (`Pokemon with id ${id} not found`);
    }
});
exports.getPokemonNameById = getPokemonNameById;
