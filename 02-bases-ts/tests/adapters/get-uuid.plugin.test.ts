import { getUuid } from '../../src/adapters/get-uuid.plugin';

describe('getUuid plugin', () => {
  test('getUuid should return a uuid', () => {

    const uuid = getUuid();

    expect(typeof uuid).toBe('string');

    expect(uuid).toMatch(/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i);

  });
});