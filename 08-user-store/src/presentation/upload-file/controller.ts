import { Request, Response } from "express";
import { FileUploadService } from "../services/file-upload.service";
import { handleError } from "../helpers";
import { UploadedFile } from "express-fileupload";

export class UploadFileController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type;
    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService.uploadSingle(file, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => handleError(error, res));
  }

  uploadMultipleFiles = (req: Request, res: Response) => {
    const type = req.params.type;
    const files = req.body.files as UploadedFile[];

    this.fileUploadService.uploadMultiple(files, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => handleError(error, res));
  }
}