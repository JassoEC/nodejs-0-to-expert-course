import { Request, Response } from "express";
import { CreateCategoryDto, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";
import { handleError } from "../helpers";

export class CategoryController {

  constructor(private readonly service: CategoryService) { }

  getCategories = (req: Request, resp: Response) => {

    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return resp.status(400).json({ error });

    this.service.getCategories(paginationDto!)
      .then((categories) => {
        resp.status(200).json(categories);
      })
      .catch((error) => { handleError(error, resp) })

  }

  createCategory = (req: Request, resp: Response) => {

    const [error, dto] = CreateCategoryDto.create(req.body);

    if (error) return resp.status(400).json({ error });

    this.service.createCategory(dto!, req.body.user)
      .then((category) => {
        resp.status(201).json(category);
      })
      .catch((error) => { handleError(error, resp) })
  }

}