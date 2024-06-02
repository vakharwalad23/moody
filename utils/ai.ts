import { OpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import z from "zod"
import { PromptTemplate } from "@langchain/core/prompts"
import { QuestionEntry } from "./definitions"
import { Document } from "langchain/document"
import { loadQARefineChain } from "langchain/chains"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

const promptSchemaParser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
            .string()
            .describe('the mood of the person who wrote the journal entry.'),
        summary: z
            .string()
            .describe('a quick summary of the entire entry.'),
        subject: z
            .string()
            .describe('the subject of the journal entry.'),    
        negative: z
            .boolean()
            .describe('whether the journal entry is negative? (i.e. does it contain negative emotions?).'),
        color: z
            .string()
            .describe('a hexadecimal color code that represents the mood of the journal entry. Example #0101fe for blue representing happiness.'),
        sentimentScore: z
            .number()
            .describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.')    
    })
)

const getPrompt = async (content: string) => {
    const format_instructions = promptSchemaParser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template: 'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })

    const promptString = await prompt.format({
        entry: content,
    })

    return promptString
}

export const analyze = async (content: string) => {
    const inputPrompt = await getPrompt(content)
    const openaiModel = new OpenAI({
        temperature: 0,
        model: "gpt-3.5-turbo",
    })
    const result = await openaiModel.invoke(inputPrompt)

    try {
        return promptSchemaParser.parse(result)
    } catch (error) {
        console.error('Error parsing AI response:', error)
    }
}

export const QA = async (question: string, entries: QuestionEntry[]) => {
    const docs = entries.map((entry) => {
        return new Document({
            pageContent: entry.content,
            metadata: {
                id: entry.id,
                createdAt: entry.createdAt,
            }
        })
    })

    const model = new OpenAI({
        temperature: 0,
        model: "gpt-3.5-turbo",
    })
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const releventDocs = await store.similaritySearch(question)

    const resp = await chain._call({
        input_documents: releventDocs,
        question,
    })

    return resp.output_text
}