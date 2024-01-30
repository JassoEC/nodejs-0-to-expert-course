import { characters } from '../../src/js-foundation/02-destructuring';

describe('Test in the file 02-destructuring.test.ts', () => {

  test('characters should contain Goku, Vegeta and Trunks',
    () => {
      expect(characters).toEqual(['Goku', 'Vegeta', 'Trunks'])
    });

  test('characters should contain Trunks',
    () => {
      const [, , trunks] = characters;

      expect(trunks).toBe('Trunks')
    })
});