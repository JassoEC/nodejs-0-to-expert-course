import { Router } from "express";
import { UploadFileController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middleware/file-upload.middleware";

export class UploadFileRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UploadFileController(new FileUploadService());

    router.use(FileUploadMiddleware.containFiles);
    router.use(FileUploadMiddleware.checkType(['products', 'users', 'categories']));

    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}