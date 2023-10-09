import { Request, Response, Router } from "express";
import chatRouter from "./chat.router";
import docRouter from "./docs.router";

const rootRouter = Router();

//test route
rootRouter.use("/ping", (req: Request, res: Response) => {
  return res.send("pong");
});

rootRouter.use("/doc", docRouter);
rootRouter.use("/chat", chatRouter);

export default rootRouter;
