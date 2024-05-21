import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    router.use(AuthMiddleware.validateToken)

    router.get('/', controller.getProducts);
    router.post('/', controller.createProduct);

    return router;
  }
}