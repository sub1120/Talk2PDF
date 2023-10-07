import { Router } from "express";
import { getAnswer, loadDocs } from "../controllers/chat.controller";
import { upload } from "../utils/helpers";

const rootRouter = Router();

rootRouter.get("/upload", upload.array("doc"), loadDocs);
rootRouter.get("/answer", getAnswer);

export default rootRouter;
