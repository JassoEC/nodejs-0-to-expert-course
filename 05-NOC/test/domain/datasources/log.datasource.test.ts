import {
  LogDataSource,
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain";

describe("log.datasource.ts", () => {
  const logMock = new LogEntity({
    message: "test",
    level: LogSeverityLevel.high,
    createdAt: new Date(),
    origin: "log.datasource.test.ts",
  });

  class MockLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
      return [logMock];
    }
  }

  test("should test the abstract class", async () => {
    const logDataSource = new MockLogDataSource();
    expect(logDataSource).toBeInstanceOf(MockLogDataSource);

    // Intance of LogDataSource should have the following properties
    expect(typeof logDataSource.saveLog).toBe("function");
    expect(typeof logDataSource.getLogs).toBe("function");

    // Test the saveLog method depends of parameters
    await logDataSource.saveLog(logMock);
    const logs = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
