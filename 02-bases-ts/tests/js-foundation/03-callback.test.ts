import { getUserById } from '../../src/js-foundation/03-callbacks';


describe('Test in the file 03-callback.test.ts', () => {

  test('getUserById should return an user object', (done) => {
    const id = 1;
    const name = 'John Doe';

    getUserById(id, (err, user) => {
      expect(user).toBeDefined();
      expect(user!.id).toBe(id);
      expect(user!.name).toBe(name);

      done();
    });
  });

  test('getUserById should return an error if user does not exist', (done) => {
    const id = 10;

    getUserById(id, (err, user) => {
      expect(err).toBeDefined();
      expect(user).toBeUndefined();

      done();
    });
  });

  test('getUserById should return a user object (promise)', (done) => {

    const id = 1;
    const name = 'John Doe';

    getUserById(id, (err, user) => {
      expect(user).toBeDefined();
      expect(user).toEqual({ id, name });

      done();
    })
  });
});