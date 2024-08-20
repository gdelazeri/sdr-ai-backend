import dotenv from 'dotenv';

dotenv.config()

export const accountSid = process.env.TWILIO_ACCOUNT_SID
export const authToken = process.env.TWILIO_AUTH_TOKEN
export const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER