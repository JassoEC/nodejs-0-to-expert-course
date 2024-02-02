import { yarg } from "./config/plugins/args.plugin"
import { ServerApp } from "./config/presentation/server-app"
/**
 * Todo lo que se ejecuta en el archivo principal de la aplicación
 * es sincrono, por lo que no es necesario usar async/await
 *
 *
 * await Promise.resolve() // No es permitido porque debe estar dentro de un modulo
 */

/**
 * Una alternativa para ejecutar código asincrono en el archivo principal
 * es usar una funcion anonima autoinvocada asincrona
 *
 * es una funcion que se ejecuta inmediatamente que el proceso se ejecuta
 */

// (async () => {
//   console.log('Hola mundo')
// })();

(async () => {
  await main()
})()

async function main() {

  const { b: base, l: limit, s: displayTable, n: fileName, d: fileDestination } = yarg
  ServerApp.run({ base, limit, displayTable, fileDestination, fileName })
}

