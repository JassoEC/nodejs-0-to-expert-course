import { CheckService } from "../domain/usecases/checks/check-service"
import { CronService } from "./cron/cron-sevice"

export class Server {
  public static start() {
    console.log('Server started')

    CronService.createJob('*/5 * * * * *', () => {
      // new CheckService().execute('https://www.google.com')

      const url = 'http://localhost:3000/'

      new CheckService(
        () => console.log(`Success on check service: ${url}`),
        (error) => console.error(error)
      ).execute(url)
    })
  }
}