import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImp } from "../../infrastructure/datasources/todo.datasorce.imp";
import { TodoRepositoryImp } from "../../infrastructure/repositories/todo.repository.imp";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const todoDataSource = new TodoDataSourceImp();
    const todoRepository = new TodoRepositoryImp(todoDataSource);
    const controller = new TodosController(todoRepository);

    router.get("/", controller.getTodos);
    router.get("/:id", controller.getTodoById);
    router.post("/", controller.createTodo);
    router.put("/:id", controller.updateTodo);
    router.delete("/:id", controller.deleteTodo);

    return router;
  }
}
