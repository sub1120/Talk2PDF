import { Router } from "express";
import { deleteDocs, loadDocs } from "../controllers/doc.controller";
import multer from "multer";
import config from "../config";

const docRouter = Router();
// create a multer uploader
export const upload = multer({
  storage: multer.diskStorage({
    destination: config.UPLOAD_PATH,
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

docRouter.post("/upload", upload.array("doc"), loadDocs);
docRouter.delete("/delete", deleteDocs);

export default docRouter;
