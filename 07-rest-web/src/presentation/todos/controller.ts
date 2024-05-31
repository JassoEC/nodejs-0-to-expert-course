import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetTodo(this.todoRepository)
      .execute(+id)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((resp) => res.status(201).json(resp))
      .catch((error) => res.status(500).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updatedTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updatedTodoDto!)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(500).json({ error }));
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    new DeleteTodo(this.todoRepository)
      .execute(+id)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(500).json({ error }));
  };
}
