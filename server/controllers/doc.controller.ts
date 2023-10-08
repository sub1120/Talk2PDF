import { Request, Response } from "express";
import { FaissStore } from "langchain/vectorstores/faiss";
import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CustomError, createDir, delDir } from "../utils/helpers";
import config from "../config";

/******************************************************
 * @LOAD_PDFs
 * @route http://localhost:4000/api/v1/doc/upload
 * @description Controller to load pdf, split text, create embedding, and save it.
 * @parameters An array of files
 * @returns A message
 ******************************************************/
export const loadDocs = async (req: Request, res: Response) => {
  try {
    //check if files exists
    if (req.files?.length === 0) {
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

/******************************************************
 * @DELETE_PDFs
 * @route http://localhost:4000/api/v1/doc/delete
 * @description Controller to delete pdfs.
 * @parameters NA
 * @returns A message
 ******************************************************/
export const deleteDocs = async (req: Request, res: Response) => {
  try {
    delDir(config.UPLOAD_PATH);
    delDir(config.STORE_PATH);

    //send success response
    res.send({
      success: true,
      message: "Files deleted successfully",
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
