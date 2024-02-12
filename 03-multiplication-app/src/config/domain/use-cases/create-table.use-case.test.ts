import { CreateTable } from './create-table.use-case';

describe('Create table use case', () => {
  test('should create table with default values', async () => {
    const createTable = new CreateTable();

    const defaultBase = 2;

    const table = (createTable.execute({ base: defaultBase }));

    const rows = table.split('\n');

    expect(createTable).toBeInstanceOf(CreateTable);

    expect(table).toContain('2 x 1 = 2');

    expect(table).toContain('2 x 10 = 20');

    expect(rows.length).toBe(10);

  });


  test('should create table with custom options', async () => {

    const options = {
      base: 3,
      limit: 20
    }

    const createTable = new CreateTable();

    const table = (createTable.execute(options));

    const rows = table.split('\n');

    expect(table).toContain('3 x 1 = 3');

    expect(table).toContain('3 x 5 = 15');

    expect(rows.length).toBe(options.limit);

  });
})