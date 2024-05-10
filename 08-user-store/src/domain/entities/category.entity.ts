import { CustomError } from "../errors/custom.error"

export class CategoryEntity{
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean,
    public readonly user: string,
  ){}
  
  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, available, user } = object

    if (!id && !_id) {
      throw CustomError.badRequest('Category id is required')
    }

    if (!name) throw CustomError.badRequest('Category name is required')
    if (available === undefined) throw CustomError.badRequest('Category available is required')
    if (!user) throw CustomError.badRequest('Category user is required')

    return new CategoryEntity(
      id || _id,
      name,
      available,
      user
    )
  }
}