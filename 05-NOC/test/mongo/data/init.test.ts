import mongoose from 'mongoose'
import { MongoDatabase } from '../../../src/data/mongo/init'

describe('App can connect with mongodb', () => { 

  afterAll(()=>{
    mongoose.connection.close()
  })

  test('should connect to the database', async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.DB_NAME!
    })


    expect(connected).toBe(true)
  })


  test('connection should throw an error', async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: 'mongodb://emanuel:123456@localhostttt:27017',
        dbName: 'NOC-TEST'
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

 })