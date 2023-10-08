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

export const delDir = (dirPath: string) => {
  fs.readdir(dirPath, (err: any, files: string[]) => {
    if (err) throw err;

    for (const file of files) {
      console.log(file + " : File Deleted Successfully.");
      fs.unlinkSync(dirPath + file);
    }
  });
};
