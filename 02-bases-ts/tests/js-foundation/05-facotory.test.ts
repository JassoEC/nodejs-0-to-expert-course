import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe('Test in the file 05-factory.test.ts', () => {

  const getAge = () => 30;
  const getUuid = () => '1234';

  test('should return a function', () => {
    const makePerson = buildMakePerson({ getAge, getUuid });
    expect(typeof makePerson).toBe('function');
  });


  test('should return a person object', () => {
    const makePerson = buildMakePerson({ getAge, getUuid });
    const person = makePerson({ name: 'John Doe', birthDate: '1990-01-01' });

    expect(person).toEqual({
      name: 'John Doe',
      age: 30,
      id: '1234',
      birthDate: '1990-01-01'
    });
  });

});