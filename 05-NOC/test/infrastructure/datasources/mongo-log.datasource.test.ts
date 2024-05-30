import mongoose from "mongoose";
import { envs } from "../../../src/configs";
import { LogModel, MongoDatabase } from "../../../src/data/mongo";
import { MongoLogDataSource } from "../../../src/infrastructure";
import { LogEntity, LogSeverityLevel } from "../../../src/domain";

describe("Mongo Log DataSource", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  const logDataSource = new MongoLogDataSource();

  const log = new LogEntity({
    message: "test",
    level: LogSeverityLevel.high,
    origin: "mongo-log.datasource.test.ts",
  });

  test("should save a log", async () => {
    const logSpy = jest.spyOn(console, "log");
    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log created",
      expect.any(String)
    );
  });

  test("should get all logs", async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(log.level);

    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe(log.message);
  });
});
