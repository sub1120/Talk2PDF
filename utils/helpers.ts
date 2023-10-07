const fs = require("fs");
import multer from "multer";
import config from "../config";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createDir = (dirPath: string) => {
  fs.access(dirPath, (error: any) => {
    if (error) {
      fs.mkdir(dirPath, (error: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Directory created successfully !!");
        }
      });
    } else {
      console.log("Directory already exists !!");
    }
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
