import OpenAI from 'openai'
import { OPENAI_API_KEY } from '../constants/environment'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const getOpenAiChatCompletion = async (input: string): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          "role": "system",
          "content": "You will be provided with text, and your task is to translate it into emojis. Do not use any regular text. Do your best with emojis only."
        },
        {
          "role": "user",
          "content": input
        }
      ],
      temperature: 0.8,
      max_tokens: 64,
      top_p: 1
    })
    return completion.choices[0].message.content
  } catch (error) {
    console.error(`Error getting chat completion from OpenAI: ${error}`)
    return null
  }
}