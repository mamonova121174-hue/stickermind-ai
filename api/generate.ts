import { VercelRequest, VercelResponse } from '@vercel/node';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, 
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Создаем предсказание в Replicate
    // Мы передаем ID модели и входные данные (prompt)
    const prediction = await replicate.predictions.create({
      version: "f1094040a83021da3342377488009137d7a469f64e030225ba1292023023e670",
      input: {
        prompt: prompt,
        steps: 20,
        output_format: "webp",
        output_quality: 100,
      },
    });

    // Важно: Мы возвращаем только ID. Весь процесс займет меньше секунды,
    // и Vercel не прервет выполнение по тайм-ауту.
    return res.status(201).json({ id: prediction.id });
  } catch (error: any) {
    console.error("Replicate Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
