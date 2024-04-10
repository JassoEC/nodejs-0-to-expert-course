import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await this.todoRepository.findById(+id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const todo = await this.todoRepository.create(createTodoDto!);
    res.status(201).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updatedTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) {
      return res.status(400).json({ error });
    }

    const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const todo = await this.todoRepository.findById(+id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = await this.todoRepository.deleteById(+id);

    if (!deletedTodo) {
      return res.status(500).json({ message: "Error deleting todo" });
    }

    res.json({ todo, deletedTodo, message: "Todo deleted" });
  };
}
