import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {

    const { name, available = false, price, description, user, category } = props;
    let availableBoolean = available

    if (!name) return ['name is required'];
    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true';
    }
    if (!price) return ['price is required'];
    if (!description) return ['description is required'];
    if (!user) return ['user is required'];
    if (!category) return ['category is required'];

    if (!Validators.isMongoId(category))
      return ['category is invalid'];

    if (!Validators.isMongoId(user))
      return ['user is invalid'];

    return [undefined, new CreateProductDto(name, availableBoolean, price, description, user, category)];
  }
}