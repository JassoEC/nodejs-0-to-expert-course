export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    if (!props.text) {
      return ["Text is required", undefined];
    }

    if (props.text.length === 0) {
      return ["Text is required", undefined];
    }

    return [undefined, new CreateTodoDto(props.text)];
  }
}
