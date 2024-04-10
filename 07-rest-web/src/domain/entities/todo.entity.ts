export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: { [key: string]: any }): TodoEntity {
    let newCompletedAt = null;

    const { id, text, completedAt } = obj;

    if (!id || !text) {
      throw "Invalid object";
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (isNaN(newCompletedAt.getTime())) {
        throw "Invalid date";
      }
    }
    return new TodoEntity(id, text, completedAt);
  }
}
