import { Router } from "express";
import { getAnswer, loadDocs } from "../controllers/chat.controller";
import multer from "multer";
import config from "../config";

const rootRouter = Router();

// create a multer uploader
export const upload = multer({
  storage: multer.diskStorage({
    destination: config.UPLOAD_PATH,
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

rootRouter.get("/upload", upload.array("doc"), loadDocs);
rootRouter.get("/answer", getAnswer);

export default rootRouter;
