import { CheckService, LogEntity } from "../../../../src/domain";

describe("Test suite for check-service.ts", () => {
  const logRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    logRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should call successCallback when fetch returns true", async () => {
    const isOk = await checkService.execute("https://google.com");

    expect(isOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("Should call errorCallback when fetch returns false", async () => {
    const isOk = await checkService.execute("invalid-url");

    expect(isOk).toBe(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();

    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
