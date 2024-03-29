import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repositories/log.repository';

export class LogRepositoryImp implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }
  async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severity);
  }
}
