import { PrismaClient } from '@prisma/client';
import { envs } from './configs/plugins/envs.plugin';
import {  MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  // const prisma = new PrismaClient();

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Hello World Postgres',
  //     origin: 'app.ts',
  //     level: 'HIGH',
  //   }
  // })

  // console.log('Log created', newLog)

  // const logs = await prisma.logModel.findMany({
  //   where:{
  //     level: 'HIGH'
  //   }
  // });

  // console.log('Logs', logs);


  // const newLog = await LogModel.create({
  //   message: 'Hello World',
  //   origin: 'app.ts',
  //   level: 'low',
  // })

  // await  newLog.save();

  // console.log('Log created', newLog)


  // const logs = await LogModel.find({});

  // console.log('Logs', logs);




  Server.start();

  // console.log(envs);
}
