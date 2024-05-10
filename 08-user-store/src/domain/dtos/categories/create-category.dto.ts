export class CreateCategoryDto {
  private constructor(
     readonly name: string,
     readonly available: boolean,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {

    const { name, available = false } = object;
    let availableBoolean = available

    if (!name) return ['name is required'];
    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true';
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean)];
  }
}