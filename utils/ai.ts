import { OpenAI } from "@langchain/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import z from "zod"
import { PromptTemplate } from "@langchain/core/prompts"

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