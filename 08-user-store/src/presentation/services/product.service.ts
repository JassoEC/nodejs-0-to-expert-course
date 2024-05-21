import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class ProductService {
  constructor() { }

  async getProducts(dto: PaginationDto) {

    const { page, limit } = dto;

    try {

      const [products, total] = await Promise.all([
        ProductModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category'),
        ProductModel.countDocuments()
      ])

      return {
        limit,
        page,
        total,
        next: `/products?page=${page + 1}&limit=${limit}`,
        prev: page > 1 ? `/products?page=${page - 1}&limit=${limit}` : null,
        products
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createProduct(dto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: dto.name,
    });

    if (productExists) throw CustomError.badRequest('product already exists');

    try {
      const product = new ProductModel({ ...dto });

      await product.save();

      return product;

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}