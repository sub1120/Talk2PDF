import { Router } from "express";
import chatRouter from "./chat.router";
import docRouter from "./docs.router";

const rootRouter = Router();

rootRouter.use("/doc", docRouter);
rootRouter.use("/chat", chatRouter);

export default rootRouter;
