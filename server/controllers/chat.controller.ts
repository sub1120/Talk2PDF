import { Request, Response } from "express";
import { RetrievalQAChain } from "langchain/chains";
import { FaissStore } from "langchain/vectorstores/faiss";
import { GooglePaLM } from "langchain/llms/googlepalm";
import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm";

import { CustomError } from "../utils/helpers";
import config from "../config";

/******************************************************
 * @GET_ANSWER
 * @route http://localhost:4000/api/v1/answer
 * @description Controller to generate answer to question.
 * @parameters A query
 * @returns Answer to the question
 ******************************************************/
export const getAnswer = async (req: Request, res: Response) => {
  try {
    //check if question exists
    const question = req.body.question;
    if (!question) {
      throw new CustomError("Please provide question.", 400);
    }

    //load vector store
    const embeddings = new GooglePaLMEmbeddings();
    const vectorStore = await FaissStore.load(config.STORE_PATH, embeddings);

    //load LLM model
    const model = new GooglePaLM();
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

    //Retrive Answer
    const response = await chain.call({
      query: question,
      timeout: 20000,
    });

    //send success response
    res.send({
      success: true,
      message: "Retrived answer successfully",
      answer: response.text,
    });
  } catch (error: any) {
    console.log(error);

    //send error response
    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};
