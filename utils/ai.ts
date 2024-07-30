import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'

import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.',
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
  }),
)

export const analyze = async (prompt: string) => {
  const input = await getPrompt(prompt)

  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-4o',
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const result = await model.invoke(input)

    return parser.parse(result)
  } catch (error) {
    console.error('e')
  }
}

const getPrompt = async (content: string) => {
  const formatted_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {format_instructions} \n {entry}`,
    inputVariables: ['entry'],
    partialVariables: { format_instructions: formatted_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

// I'm going to give you an journal entry, I want you to analyze for a few things.
// I need the mood, a summary, what the subject is, and color representing the mood.
// You need to respond back with formatted JSON like so: {"mood": "", "subject" : "", "color":"", "negative" : ""}.
