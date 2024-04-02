import { error } from 'console';
import mongoose from 'mongoose';

interface ConnectionOptions{
  mongoUrl:string;
  dbName:string;
}

export class MongoDatabase{
   static async connect(options:ConnectionOptions):Promise<boolean>{
    const {mongoUrl, dbName} = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log('Connected to the mongo database');

      return true;
    } catch (aw) {
      console.log('Error connecting to the database', error);
      throw error
    }
  }
}