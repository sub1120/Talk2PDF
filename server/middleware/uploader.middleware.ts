import { NextFunction, Request, Response } from "express";
import path from "path";
import config from "../config";
import multer from "multer";
import { CustomError } from "../utils/helpers";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: config.UPLOAD_PATH,
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    limits: { fileSize: 10000000 },
    fileFilter(req, files, callback) {
      const ext = path.extname(files.originalname);
      const allowed = [".pdf"];
      if (allowed.includes(ext)) {
        callback(null, true);
      } else {
        callback(new CustomError("Only pdf files are allowed", 400));
      }
    },
  }).array("doc");

  upload(req, res, function (error: any) {
    if (error instanceof multer.MulterError) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Something Went Wrong",
      });
    }

    return next();
  });
};

export default uploadFile;
