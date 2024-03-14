import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;

type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly repository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogRepository = (log: LogEntity) => {
    this.repository.forEach((repo) => {
      repo.saveLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    const origin = 'check-service.ts';
    
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const newLog = new LogEntity({
        message: `Service ${url} is working properly`,
        level: LogSeverityLevel.low,
        origin,
      });
      this.callLogRepository(newLog);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      this.callLogRepository(
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
