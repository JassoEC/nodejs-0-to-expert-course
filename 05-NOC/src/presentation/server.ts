import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/usecases/checks/check-service';
import { CheckServiceMultiple } from '../domain/usecases/checks/check-service-multiple';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
// import { SendEmailLog } from '../domain/usecases/emails/send-email-logs';
// import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgreSqlDataSource } from '../infrastructure/datasources/postgresql-log.datasource';
import { LogRepositoryImp } from '../infrastructure/repositories/log.repository.imp';
import { CronService } from './cron/cron-service';
// import { EmailService } from './email/email.service';

const postgresLogRepository = new LogRepositoryImp(new PostgreSqlDataSource());
const mongoLogRepository = new LogRepositoryImp(new MongoLogDataSource());
const fsLogRepository = new LogRepositoryImp(new FileSystemDataSource());
// const emailService: EmailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started');

    // new SendEmailLog(emailService, logRepository)
    // .execute("isw.ecamposj@gmail.com");

    // emailService.sendEmail({
    //   from:'emanuel@kingtide.com' ,
    //   to: "isw.ecamposj@gmail.com",
    //   subject: "Test",
    //   htmlBody: `
    //   <h1>Test</h1>
    //   <p>Test</p>
    //   `
    // });

    CronService.createJob('*/5 * * * * *', () => {
      // new CheckService().execute('https://www.google.com')

      // const url = "http://localhost:3000/";
      const url = 'https://www.google.com';

      // new CheckServiceMultiple(
      //   [
      //     postgresLogRepository,
      //     mongoLogRepository,
      //     fsLogRepository,
      //   ],
      //   () => console.log(`Success on check service: ${url}`),
      //   (error) => console.error(error)
      // ).execute(url);
    });

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log('Logs', logs);
  }
}
