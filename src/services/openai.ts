import OpenAI from 'openai'
import { OPENAI_API_KEY } from '../constants/environment'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const getOpenAiChatCompletion = async (input: string): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: input }]
    })
    return completion.choices[0].message.content
  } catch (error) {
    console.error(`Error getting chat completion from OpenAI: ${error}`)
    return null
  }
}