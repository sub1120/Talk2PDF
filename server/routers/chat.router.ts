import { Router } from "express";
import { getAnswer } from "../controllers/chat.controller";

const chatRouter = Router();

chatRouter.post("/answer", getAnswer);

export default chatRouter;
