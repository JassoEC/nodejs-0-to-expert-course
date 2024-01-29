interface BuildMakePersonOptions {
  getUuid: () => string;
  getAge: (birthDate: string) => number;
}

interface PersonOptions {
  name: string;
  birthDate: string;
}
export const buildMakePerson = ({ getUuid, getAge }: BuildMakePersonOptions) => {
  return ({ name, birthDate }: PersonOptions) => {
    return {
      id: getUuid(),
      name,
      birthDate,
      age: getAge(birthDate)
    }
  }
}
