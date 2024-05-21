import { Request, Response } from "express";
import { CreateProductDto, PaginationDto } from "../../domain";
import { handleError } from "../helpers";
import { ProductService } from "../services";

export class ProductController {

  constructor(private readonly service: ProductService) { }

  getProducts = (req: Request, resp: Response) => {

    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return resp.status(400).json({ error });

    this.service.getProducts(paginationDto!)
      .then((products) => {
        resp.status(200).json(products);
      })
      .catch((error) => { handleError(error, resp) })

  }

  createProduct = (req: Request, resp: Response) => {

    const [error, dto] = CreateProductDto.create({ ...req.body, user: req.body.user.id });

    if (error) return resp.status(400).json({ error });

    this.service.createProduct(dto!)
      .then((Product) => {
        resp.status(201).json(Product);
      })
      .catch((error) => { handleError(error, resp) })
  }

}