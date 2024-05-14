import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService {
  constructor() { }

  async getCategories(dto: PaginationDto) {

    const { page, limit } = dto;

    try {

      const [categories, total] = await Promise.all([
        CategoryModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit),
        CategoryModel.countDocuments()
      ])

      return {
        limit,
        page,
        total,
        next: `/categories?page=${page + 1}&limit=${limit}`,
        prev: page > 1 ? `/categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map((category) => {
          const { available, name, id } = category;
          return {
            id,
            name,
            available,
          }
        })
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createCategory(dto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: dto.name,
    });

    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...dto,
        user: user.id,
      });

      await category.save();

      return {
        id: category._id,
        name: category.name,
        available: category.available,
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}