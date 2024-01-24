const getAgePlugin = require('get-age')

const getAge = (birthDate) => {

  if (!birthDate) throw new Error('birthDate is required')

  return getAgePlugin(birthDate)
}

module.exports = { getAge }