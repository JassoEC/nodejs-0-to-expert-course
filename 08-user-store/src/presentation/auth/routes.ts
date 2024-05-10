import { Router } from 'express';
import { AuthController } from './controller';
import { envs } from '../../config';
import { AuthService, EmailService } from '../services';

export class AuthRoutes {
  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
    )
    const authService = new AuthService(emailService)
    const controller = new AuthController(authService);

    router.post('/login', controller.login)
    router.post('/register', controller.register)
    router.get('/validate-email/:token', controller.validateEmail)

    return router;
  }


}

