import { Request } from "express"
import multer from "multer"
import ApiErrors from "../utils/apiErrors"
import { FileFields } from "../Apps/moreInterfaces/uploadFiles"

const uploadOption = (): multer.Multer => {
  const multerStorage = multer.memoryStorage()

  function multerFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new ApiErrors('Not an image! Please upload only images', 400))
    }
  }

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
}


export const uploadSingleImage = (fieldName: string) => uploadOption().single(fieldName);
// export const uploadSingleImage = (name: void, fieldName: string, Image?: new (width?: number, height?: number) => HTMLImageElement, p0?: string) => uploadOption().single(fieldName);
export const uploadMultiImages = (fields: FileFields[]) => uploadOption().fields(fields);