import { LogEntity, LogSeverityLevel } from "../../../src/domain";

const logPayload = {
  message: "Hello from test",
  level: LogSeverityLevel.high,
  createdAt: new Date(),
  origin: "log.entity.test.ts",
};

describe("LogEntity", () => {
  test("should create a new LogEntity", () => {
    const newLog = new LogEntity({ ...logPayload });

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe(logPayload.message);
    expect(newLog.level).toBe(logPayload.level);
    expect(newLog.createdAt).toBeInstanceOf(Date);
    expect(newLog.origin).toBe(logPayload.origin);
  });

  test("should create a instance from json", () => {
    const json = `{"level":"low","message":"Service https://www.google.com is working properly","createdAt":"2024-05-29T20:09:25.519Z","origin":"check-service.ts"}`;
    const logPayload = JSON.parse(json);

    const newLog = LogEntity.fromJson(json);
    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe(logPayload.message);
    expect(newLog.level).toBe(LogSeverityLevel.low);
    expect(newLog.createdAt).toBeInstanceOf(Date);
  });

  test("should create a instance from object", () => {
    const newLog = LogEntity.fromObject(logPayload);
    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe(logPayload.message);
    expect(newLog.level).toBe(logPayload.level);
    expect(newLog.createdAt).toBeInstanceOf(Date);
    expect(newLog.origin).toBe(logPayload.origin);
  });
});
