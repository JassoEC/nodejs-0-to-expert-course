import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService{
  constructor(){}

  async getCategories(){
    try {
      const categories = await CategoryModel.find();

      return categories.map((category) => CategoryEntity.fromObject(category))
      
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createCategory(dto:CreateCategoryDto, user: UserEntity){
    const categoryExists = await CategoryModel.findOne({
      name: dto.name,
    });

    if(categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...dto,
        user: user.id,
      });

      await category.save();

      return{
        id: category._id,
        name: category.name,
        available: category.available,
      }
      
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}