import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendWhatsappMessage } from './services/twillio';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config()

const port = 3000

app.post('/chat/send', async (req: Request<any>, res: Response<any>) => {
  const { to, body } = req.body
  console.log({ to, body })
  try {
    await sendWhatsappMessage(to, body)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})