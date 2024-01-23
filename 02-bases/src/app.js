/**
 * Importing the file
 * Each time you import a file, it is executed
 */

// 01-template.js is not necessary to write the extension
const templateExports = require('./js-foundation/01-template') // contiene todo lo que se exporto en el archivo


console.log(templateExports) // imprime el objeto que se exporto

console.log(templateExports.emailTemplate) // imprime el string que se exporto