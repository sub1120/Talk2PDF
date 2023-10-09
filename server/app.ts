import express, { Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routers/root.router";

const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());
expressApp.use("/api/v1", rootRouter);

export default expressApp;
