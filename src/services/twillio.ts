import twilio from 'twilio'
import { accountSid, authToken, fromPhoneNumber } from '../constants/environment'

const client = twilio(accountSid, authToken)

export const sendWhatsappMessage = async (to: string, body: string): Promise<void> => {
  try {
    console.log({
      from: `whatsapp:${fromPhoneNumber}`,
      to: `whatsapp:${to}`,
      body
    })
    const resp = await client.messages.create({
      from: `whatsapp:${fromPhoneNumber}`,
      to: `whatsapp:${to}`,
      body
    })
    console.log(resp)
  } catch (error) {
    console.error(`Error sending whatsapp message to ${to}: ${error}`)
  }
}