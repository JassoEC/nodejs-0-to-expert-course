import { SendEmailLog, LogRepository, LogEntity } from "../../../../src/domain";

describe("Test suite for send-email-logs.ts", () => {
  const mockEmailService = {
    sendEmailWithAttachment: jest.fn().mockReturnValue(true),
  };

  const logRepository: LogRepository = {
    saveLog: jest.fn().mockReturnValue(true),
    getLogs: jest.fn().mockReturnValue([]),
  };

  const service = new SendEmailLog(mockEmailService as any, logRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return true if email is sent successfully", async () => {
    const result = await service.execute("isw.ecamposj@gmail.com");

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithAttachment).toHaveBeenCalledTimes(1);
    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithAttachment = jest.fn().mockReturnValue(false);

    const result = await service.execute("isw.ecamposj@gmail.com");

    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithAttachment).toHaveBeenCalledTimes(1);
    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
