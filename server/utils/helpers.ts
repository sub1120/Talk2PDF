const fs = require("fs");

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
