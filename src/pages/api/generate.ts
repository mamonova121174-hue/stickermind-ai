import { VercelRequest, VercelResponse } from '@vercel/node';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, 
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Нужно загрузить изображение' });
    }

    const prediction = await replicate.predictions.create({
      version: "f1094040a83021da3342377488009137d7a469f64e030225ba1292023023e670",
      input: {
        image: image,
        steps: 20,
        outline_width: 10,
        output_format: "webp",
        prompt: prompt || "a sticker of this person", 
      },
    });

    return res.status(201).json({ id: prediction.id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
