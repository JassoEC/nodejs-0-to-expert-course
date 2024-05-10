import { Request, Response } from "express";

export class ProductController {

  constructor() { }

  getProducts = (req: Request, resp: Response) => {
    resp.json('Get all products');
  }

  createProduct = (req: Request, resp: Response) => {
    resp.json('Create product');
  }
}