import { Router } from "express";
import { deleteDocs, loadDocs } from "../controllers/doc.controller";

import uploadFile from "../middleware/uploader.middleware";

const docRouter = Router();

docRouter.post("/upload", uploadFile, loadDocs);
docRouter.delete("/delete", deleteDocs);

export default docRouter;
