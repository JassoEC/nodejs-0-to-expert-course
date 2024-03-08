import nodemailer from 'nodemailer';
import { envs } from '../../configs/plugins/envs.plugin';
interface Attachment {
  filename: string;
  path: string;
}

interface SendMailOptions {
  from: string;
  to: string| string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export class EmailService{

  private transporter  = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })


  async sendEmail(options: SendMailOptions):Promise<boolean>{
    try {
      
      const {
        from,
        to,
        subject,
        htmlBody,
        attachments=[]
      } =options

       await this.transporter.sendMail({
        from,
        to,
        subject,
        html: htmlBody,
        attachments
      })
      return true;

    } catch (error) {
      return false
    }

  }

 async sendEmailWithAttachment(to:string | string[]): Promise<boolean>{
    const subject ='Server logs'
    const htmlBody = `
      <h1>Server logs</h1>
      <p>Logs from the server</p>
    `

    const attachments:Attachment[] = [
      {
        filename: 'low.log',
        path: './logs/low.log'
      },
      {
        filename: 'medium.log',
        path: './logs/medium.log'
      },
      {
        filename: 'high.log',
        path: './logs/high.log'
      },
    ]

    this.sendEmail({from:envs.MAILER_EMAIL, to, subject, htmlBody, attachments})


    return true
  }
}