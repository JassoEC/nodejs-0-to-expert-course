import { http } from '../../src/adapters';

describe('src/adapters/http-client.plugin', () => {
  test('http.get should return a string', async () => {

    const data = await http.get('https://jsonplaceholder.typicode.com/todos/1');

    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    })
  });

  test('http client should have a Post,Put,Delete methods', () => {

    expect(typeof http.post).toBe('function');
    expect(typeof http.put).toBe('function');
    expect(typeof http.delete).toBe('function');

  });
})