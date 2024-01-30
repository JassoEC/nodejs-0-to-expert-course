import { getAge } from '../../src/adapters/get-age.plugin';

describe('getAge plugin', () => {
  test('getAge should return the age of person', () => {

    const birthDate = '1994-01-30';
    const calculatedAge = new Date().getFullYear() - new Date(birthDate).getFullYear();

    const age = getAge('1994-01-30');

    expect(age).toBe(calculatedAge);

  });


  test('get Age should return 0 years', () => {

    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValueOnce(1994);

    const birthDate = '1994-01-30';
    const age = getAge(birthDate);

    expect(typeof age).toBe('number');
    expect(age).toBe(0);
    expect(spy).toHaveBeenCalledTimes(2);

  });

});