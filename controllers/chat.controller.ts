import { Request, Response } from "express";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RetrievalQAChain } from "langchain/chains";
import { FaissStore } from "langchain/vectorstores/faiss";
import { GooglePaLM } from "langchain/llms/googlepalm";
import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CustomError, createDir } from "../utils/helpers";
import config from "../config";

/******************************************************
 * @LOAD_PDFs
 * @route http://localhost:4000/api/v1/upload
 * @description Controller to load pdf, split text, create embedding, and save it.
 * @parameters An array of files
 * @returns A message
 ******************************************************/
export const loadDocs = async (req: Request, res: Response) => {
  try {
    //check if files exists
    if (!req.files) {
      throw new CustomError("At least one PDF file is required", 400);
    }

    // load pdfs
    const loader = new DirectoryLoader(config.UPLOAD_PATH, {
      ".pdf": (path) => new PDFLoader(path),
    });
    const docs = await loader.load();

    //split docs text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: config.CHUNK_SIZE,
      chunkOverlap: config.CHUNK_OVERLAP,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);

    //load embeddings and create a vectorstore
    const embeddings = new GooglePaLMEmbeddings();
    const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);

    //save vectorstore
    createDir(config.STORE_PATH);
    await vectorStore.save(config.STORE_PATH);

    //send success response
    res.send({
      success: true,
      message: "Files uploaded successfully",
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

export const getAnswer = async (req: Request, res: Response) => {
  const embeddings = new GooglePaLMEmbeddings();
  const vectorStore = await FaissStore.load("./files/vectorstore", embeddings);

  const model = new GooglePaLM();
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const response = await chain.call({
    query: "What is candidate name?",
    timeout: 20000,
  });

  res.send({
    data: response,
  });
};
