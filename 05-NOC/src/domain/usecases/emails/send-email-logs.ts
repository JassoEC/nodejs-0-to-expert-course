import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendEmailLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLog implements SendEmailLogsUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) { }
  async execute(to: string | string[]): Promise<boolean> {

    try {
      const sent = await this.emailService.sendEmailWithAttachment(to)

    if(!sent){
      throw new Error('Error sending email')
      return false
    }

    this.logRepository.saveLog(new LogEntity({
      message: `Email sent to ${to}`,
      level: LogSeverityLevel.low,
      origin: 'send-email-logs.ts'
      })
    )
      return true
    }
    catch (error) {

      this.logRepository.saveLog(new LogEntity({
        message: `Error sending email`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs.ts'
      }))
      
      return false
    }
  }
}