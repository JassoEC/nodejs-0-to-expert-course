const { v4 } = require('uuid')

const getUuid = () => {
  return v4()
}

module.exports = { getUuid }