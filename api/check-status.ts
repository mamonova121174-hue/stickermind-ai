import { VercelRequest, VercelResponse } from '@vercel/node';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Получаем ID из параметров запроса (например, /api/check-status?id=abc123)
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing prediction ID' });
  }

  try {
    // Спрашиваем у Replicate состояние конкретного предсказания
    const prediction = await replicate.predictions.get(id as string);
    
    // Возвращаем объект предсказания, где есть поле status ("starting", "processing", "succeeded" или "failed")
    return res.status(200).json(prediction);
  } catch (error: any) {
    console.error("Status Check Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
