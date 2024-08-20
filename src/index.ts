import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sendWhatsappMessage } from './services/twillio';
import { PORT } from './constants/environment';
import { getOpenAiChatCompletion } from './services/openai';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/chat/send', async (req: Request<any>, res: Response<any>) => {
  const { to, body } = req.body
  try {
    await sendWhatsappMessage(`whatsapp:${to}`, body)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
});

app.post('/chat/receive', async (req: Request<any>, res: Response<any>) => {
  const { Body: messageReceived, From: to } = req.body

  try {
    const completion = await getOpenAiChatCompletion(messageReceived)
    if (completion) {
      await sendWhatsappMessage(to, completion)
    }
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})