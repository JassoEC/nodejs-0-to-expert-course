import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new TodosController();

    router.get("/", controller.getTodos);
    router.get("/:id", controller.getTodoById);
    router.post("/", controller.createTodo);
    router.put("/:id", controller.updateTodo);
    router.delete("/:id", controller.deleteTodo);

    return router;
  }
}
