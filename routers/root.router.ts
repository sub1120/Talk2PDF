import { Router } from "express";
import { getAnswer } from "../controllers/chat.controller";

const rootRouter = Router();

rootRouter.get("/chat", getAnswer);

export default rootRouter;
