import { getPokemonNameById } from "../../src/js-foundation/06-promises";


describe('js-foundation/06-promises', () => {


  test('should return a pokemon name', (done) => {
    const id = 1;
    const name = 'bulbasaur';

    getPokemonNameById(id)
      .then(pokemon => {
        expect(pokemon).toBe(name);
        done();
      })
  });


  test('should return an error if pokemon does not exist', async () => {
    const id = 1000000;

    try {
      await getPokemonNameById(id)
      expect(true).toBe(false);

    } catch (error) {
      expect(error).toBe(`Pokemon with id ${id} not found`);
    }
  });

})