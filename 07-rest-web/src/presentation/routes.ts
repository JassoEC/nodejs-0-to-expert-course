import { Router } from "express";
import { HealthController } from "./HealthController";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/api/health", HealthController.getHealth);

    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
