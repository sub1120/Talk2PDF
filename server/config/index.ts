import dotenv from "dotenv";
import { Config } from "../types";
dotenv.config();

const config: Config = {
  PORT: process.env.PORT || 4000,
  UPLOAD_PATH: "./files/uploads/",
  STORE_PATH: "./files/vectorstore/",
  CHUNK_SIZE: 30,
  CHUNK_OVERLAP: 0,
};

export default config;
