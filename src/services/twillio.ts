import twilio from 'twilio'
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '../constants/environment'

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const sendWhatsappMessage = async (to: string, body: string): Promise<void> => {
  try {
    await client.messages.create({
      from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
      to,
      body
    })
  } catch (error) {
    console.error(`Error sending whatsapp message to ${to}: ${error}`)
  }
}