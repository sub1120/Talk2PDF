import dotenv from "dotenv";
import { Config } from "../types";
dotenv.config();

const config: Config = {
  PORT: process.env.PORT || 4000,
};

export default config;
