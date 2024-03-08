import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;

type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly repository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      const origin = "check-service.ts";

      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const newLog = new LogEntity({
        message: `Service ${url} is working properly`,
        level: LogSeverityLevel.low,
        origin,
      });
      this.repository.saveLog(newLog);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      this.repository.saveLog(
        new LogEntity({
          message: `${error} => ${url} it's not ok`,
          level: LogSeverityLevel.high,
          origin,
        })
      );
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
