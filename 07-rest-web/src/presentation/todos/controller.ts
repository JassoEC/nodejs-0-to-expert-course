import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    res.json(allTodos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: +id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const todo = await prisma.todo.create({
      data: {
        text,
      },
    });
    res.status(201).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const { text, completedAt } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    let completedAtDate: Date | null = new Date(completedAt);

    if (completedAt && !completedAtDate) {
      return res.status(400).json({ message: "Invalid completedAt date" });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: +id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: +id,
      },
      data: {
        text,
        completedAt: completedAtDate,
      },
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: +id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: +id,
      },
    });

    if (!deletedTodo) {
      return res.status(500).json({ message: "Error deleting todo" });
    }

    res.json({ todo, deletedTodo, message: "Todo deleted" });
  };
}
