import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDataSourceImp implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto });
    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const allTodos = await prisma.todo.findMany();
    return allTodos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity | undefined> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw "Todo not found";
    }

    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id,
      },
      data: updateTodoDto,
    });

    return TodoEntity.fromObject(updatedTodo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
