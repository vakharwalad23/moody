import { initializePinecone } from "../utils/init-pinecone";

async function setupPinecone() {
  try {
    console.log("Setting up Pinecone...");
    await initializePinecone();
    console.log("Pinecone setup complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error setting up Pinecone:", error);
    process.exit(1);
  }
}

setupPinecone();
