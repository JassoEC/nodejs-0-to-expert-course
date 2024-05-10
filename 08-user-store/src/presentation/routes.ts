import { Request, Response, Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './categories/routes';
import { ProductRoutes } from './products/routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/categories', CategoryRoutes.routes)
    router.use('/api/products', ProductRoutes.routes)

    router.get('/health', (req: Request, res: Response) => {
      res.status(200).send('OK');
    })

    return router;
  }


}

