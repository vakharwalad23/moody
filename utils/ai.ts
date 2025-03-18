import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from "zod";
import { PromptTemplate } from "@langchain/core/prompts";
import { QuestionEntry } from "./definitions";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const promptSchemaParser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("a quick summary of the entire entry."),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "whether the journal entry is negative? (i.e. does it contain negative emotions?)."
      ),
    color: z
      .string()
      .describe(
        "a hexadecimal color code that represents the mood of the journal entry. Example #0101fe for blue representing happiness."
      ),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = promptSchemaParser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const promptString = await prompt.format({
    entry: content,
  });

  return promptString;
};

export const analyze = async (content: string) => {
  const inputPrompt = await getPrompt(content);
  const geminiModel = new ChatGoogleGenerativeAI({
    temperature: 0,
    modelName: "gemini-1.5-pro",
    apiKey: process.env.GOOGLE_API_KEY,
  });
  const result = await geminiModel.invoke(inputPrompt);

  try {
    // Handle potential complex MessageContent structure
    const textContent =
      typeof result.content === "string"
        ? result.content
        : Array.isArray(result.content)
        ? result.content
            .map((part) => (typeof part === "string" ? part : part || ""))
            .join("")
        : JSON.stringify(result.content);

    return promptSchemaParser.parse(textContent);
  } catch (error) {
    console.error("Error parsing AI response:", error);
  }
};

export const QA = async (question: string, entries: QuestionEntry[]) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.id,
        createdAt: entry.createdAt,
      },
    });
  });

  const enhancedQuestion = `I want you to act as a helpful AI assistant analyzing personal journal entries. Provide thoughtful, accurate responses based solely on the content provided. Maintain a supportive and empathetic tone. If information isn't available in the entries, acknowledge this limitation rather than making assumptions. Consider emotional context and nuance when interpreting the journal content.Please answer the question based on the journal entries provided. If the question is not related to the journal entries, please respond with "I cannot answer that." \n\nOriginal question: ${question}`;

  const model = new ChatGoogleGenerativeAI({
    temperature: 0,
    modelName: "gemini-1.5-pro",
    apiKey: process.env.GOOGLE_API_KEY,
  });
  const chain = loadQARefineChain(model);
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "text-embedding-004",
  });
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const releventDocs = await store.similaritySearch(question);

  const resp = await chain._call({
    input_documents: releventDocs,
    question: enhancedQuestion,
  });

  return resp.output_text;
};
