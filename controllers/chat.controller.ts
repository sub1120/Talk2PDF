import { Request, Response } from "express";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CohereEmbeddings } from "langchain/embeddings/cohere";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { Cohere } from "langchain/llms/cohere";
import { Document } from "langchain/document";

export const getAnswer = async (req: Request, res: Response) => {
  // const loader = new CheerioWebBaseLoader(
  //   "https://lilianweng.github.io/posts/2023-06-23-agent/"
  // );
  // const data = await loader.load();

  const doc = new Document({
    pageContent:
      "The Wii[g] is a home video game console developed and marketed by Nintendo. It was released on November 19, 2006, in North America and in December 2006 for most other regions of the world. It is Nintendo's fifth major home game console, following the GameCube and is a seventh-generation console alongside Microsoft's Xbox 360 and Sony's PlayStation 3. The Wii[g] is a home video game console developed and marketed by Nintendo. It was released on November 19, 2006, in North America and in December 2006 for most other regions of the world. It is Nintendo's fifth major home game console, following the GameCube and is a seventh-generation console alongside Microsoft's Xbox 360 and Sony's PlayStation 3.",
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 20,
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments([doc]);

  const embeddings = new CohereEmbeddings();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const relevantDocs = await vectorStore.similaritySearch(
    "What is task decomposition?"
  );

  const model = new Cohere({
    maxTokens: 20,
  });

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const response = await chain.call({
    query: "What is task decomposition?",
  });

  console.log(response);

  res.send({
    data: response,
  });
};
