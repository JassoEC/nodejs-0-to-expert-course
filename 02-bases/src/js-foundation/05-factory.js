
const buildMakePerson = ({ getUuid, getAge }) => {
  return ({ name, birthDate }) => {
    return {
      id: getUuid(),
      name,
      birthDate,
      age: getAge(birthDate)
    }
  }
}

module.exports = { buildMakePerson }