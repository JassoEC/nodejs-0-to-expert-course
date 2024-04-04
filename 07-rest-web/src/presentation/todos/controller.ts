import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy some milk", createdAt: new Date() },
  { id: 2, text: "Buy some bread", createdAt: new Date() },
  { id: 3, text: "Buy some juice", createdAt: new Date() },
  { id: 4, text: "Buy some butter", createdAt: new Date() },
];
export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const todo = todos.find((todo) => todo.id === +id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const todo = { id: todos.length + 1, text, createdAt: new Date() };
    todos.push(todo);
    res.status(201).json(todo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const todo = todos.find((todo) => todo.id === +id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.text = text;

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const index = todos.findIndex((todo) => todo.id === +id);

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(index, 1);

    res.json({ message: "Todo deleted" });
  };
}
