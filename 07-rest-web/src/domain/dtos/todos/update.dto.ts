export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnValue: { [key: string]: any } = {};

    if (this.text) {
      returnValue.text = this.text;
    }

    if (this.completedAt) {
      returnValue.completedAt = this.completedAt;
    }

    return returnValue;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let completedAtDate = completedAt;

    if (!id || isNaN(+id)) {
      return ["Id is required", undefined];
    }

    if (completedAt) {
      completedAtDate = new Date(completedAt);

      if (completedAtDate.toString() === "Invalid Date") {
        return ["Invalid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, completedAtDate)];
  }
}
