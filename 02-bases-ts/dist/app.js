"use strict";
/**
 * Importing the file
 * Each time you import a file, it is executed
 */
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("./adapters");
// import { getAge } from "./adapters/get-age.plugin";
// import { buildLogger } from "./adapters/logger.plugin";
// 01-template.js is not necessary to write the extension
// require('./js-foundation/01-template') // contiene todo lo que se exporto en el archivo
// console.log(templateExports) // imprime el objeto que se exporto
// console.log(templateExports.emailTemplate) // imprime el string que se exporto
//DESTRUCTURING
// require('./js-foundation/02-destructuring')
// const { getUserById } = require('./js-foundation/03-callbacks')
// getUserById(1, (error, user) => {
//   if (error) {
//     throw new Error(error)
//   }
//   console.log('User', user)
// })
// Factory Functions
// const { getUuid, getAge } = require('./adapters')
// const { buildMakePerson } = require('./js-foundation/05-factory')
// const data = { name: 'John', birthDate: '1994-01-30' }
// const makePerson = buildMakePerson({ getUuid, getAge })
// const person = makePerson(data)
// console.log(person)
// Promises
// const { getPokemonById } = require('./js-foundation/06-promises')
// getPokemonById(100)
//   .then(pokemon => console.log(pokemon))
//   .catch(error => console.log(error.message))
//   .finally(() => console.log('End of the promise'))
const logger = (0, adapters_1.buildLogger)('App');
logger.log('Starting app');
const age = (0, adapters_1.getAge)('1994-01-30');
console.log('Age', age);
