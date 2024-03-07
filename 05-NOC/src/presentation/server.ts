import { CheckService } from "../domain/usecases/checks/check-service";
import { FileSystemDataSource } from "../infraestrucure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infraestrucure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-sevice";

const logRepository = new LogRepositoryImp(new FileSystemDataSource());

export class Server {
  public static start() {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService().execute('https://www.google.com')

      const url = "http://localhost:3000/";
      // const url = "https://www.google.com";

      new CheckService(
        logRepository,
        () => console.log(`Success on check service: ${url}`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
