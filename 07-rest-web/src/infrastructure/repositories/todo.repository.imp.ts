import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImp implements TodoRepository {
  constructor(private readonly todoDataSource: TodoDataSource) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.create(createTodoDto);
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.updateById(updateTodoDto);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.deleteById(id);
  }

  async getAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.getAll();
  }

  async findById(id: number): Promise<TodoEntity | undefined> {
    return this.todoDataSource.findById(id);
  }
}
