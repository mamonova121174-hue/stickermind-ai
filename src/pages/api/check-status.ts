import { VercelRequest, VercelResponse } from '@vercel/node';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID предсказания отсутствует' });
  }

  try {
    // Получаем актуальные данные о генерации по её ID
    const prediction = await replicate.predictions.get(id as string);
    return res.status(200).json(prediction);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
