import { Request, Response, Router } from 'express';
import { AuthRoutes } from './auth/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes)

    router.get('/health', (req: Request, res: Response) => {
      res.status(200).send('OK');
    })

    return router;
  }


}

