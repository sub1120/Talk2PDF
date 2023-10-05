import express, { Request, Response } from "express";
import cors from "cors";

const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());
expressApp.use("/api/v1/ping", (req: Request, res: Response) => {
  return res.send("pong");
});

export default expressApp;
