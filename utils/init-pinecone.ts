import { Pinecone } from "@pinecone-database/pinecone";

const initializePinecone = async () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const indexName = process.env.PINECONE_INDEX_NAME!;

  try {
    const indexList = await pinecone.listIndexes();
    const indexExists = indexList.indexes?.some(
      (index) => index.name === indexName
    );

    if (!indexExists) {
      console.log(`Creating index: ${indexName}`);
      await pinecone.createIndex({
        name: indexName,
        dimension: 768,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });

      console.log("Waiting for index to be ready...");
      await new Promise((resolve) => setTimeout(resolve, 60000));
    } else {
      console.log(`Index ${indexName} already exists`);
    }
  } catch (error) {
    console.error("Error initializing Pinecone:", error);
    throw error;
  }
};

export { initializePinecone };
