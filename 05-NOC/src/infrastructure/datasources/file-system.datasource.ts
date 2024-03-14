import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath = 'logs/low.log';
  private readonly mediumLogsPath = 'logs/medium.log';
  private readonly highLogsPath = 'logs/high.log';

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles(): void {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      }
    );
  }

  public async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(log);

    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`);

    if (log.level === LogSeverityLevel.low) return;

    if (log.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, `${logAsJson}\n`);
    }

    if (log.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, `${logAsJson}\n`);
    }
  }

  public async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severity) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error('Invalid severity level');
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');

    if(!content) return [];

    const logs = content.split('\n').map(LogEntity.fromJson);

    return logs;
  }
}
