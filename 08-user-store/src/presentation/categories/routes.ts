import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {

  static get routes(): Router {

    const service = new CategoryService();
    const controller = new CategoryController(service);
    const router = Router();

    router.use(AuthMiddleware.validateToken)
    
    router.get('/', controller.getCategories);
    router.post('/', controller.createCategory);

    return router;
  }
}