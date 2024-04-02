import { envs } from '../../../src/configs/plugins/envs.plugin';

describe('EnvsPlugin', () => {
  test('should return envs options', () => {

    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'emanuel@kingtide.com',
      MAILER_SECRET_KEY: 'amocxavzgwlhuvef',
      MAILER_SERVICE: 'gmail',
      PROD: false,
      MONGO_URL: 'mongodb://emanuel:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'emanuel',
      MONGO_PASS: '123456',
      POSTGRES_URL: 'postgresql://postgres:123456@localhost:5432/NOC-TEST',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_PASSWORD: '123456'
    });
    
  });

  test('should return error if not found', async() => {


    jest.resetModules();
    process.env.PORT = 'ABC'

    try{
      await import ('../../../src/configs/plugins/envs.plugin');
      expect(true).toBe(false);

    }catch(e){
      expect(`${e}`).toContain('"PORT" should be a valid integer');
    }
  })
});
