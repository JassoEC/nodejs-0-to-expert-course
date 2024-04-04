import { Request, Response } from "express";

export class HealthController {
  static getHealth(req: Request, res: Response) {
    res.json({ message: "Server is running on port 3000" });
  }
}
