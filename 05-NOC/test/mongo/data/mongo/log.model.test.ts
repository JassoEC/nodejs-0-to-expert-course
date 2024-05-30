import mongoose from "mongoose";
import { MongoDatabase } from "../../../../src/data/mongo/init";

import { LogModel } from "../../../../src/data/mongo/models/log.model";

describe("log.model.test", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.DB_NAME!,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test",
      message: "should return LogModel",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test("Should return the same schema object", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
      })
    );
  });
});
