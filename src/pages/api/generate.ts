import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const REPLICATE_API_TOKEN = 'ТВОЙ_КЛЮЧ_ТУТ'; // Вставь свой ключ сюда

  try {
    const { image, prompt } = req.body;

    // 1. Создаем задачу
    const startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "f1094040a83021da3342377488009137d7a469f64e030225ba1292023023e670",
        input: { image, prompt: `Sticker style, ${prompt}, white border`, steps: 20 }
      }),
    });

    let prediction = await startResponse.json();

    // 2. Ждем результата (цикл ожидания)
    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Ждем 2 секунды
      const checkResponse = await fetch(prediction.urls.get, {
        headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` },
      });
      prediction = await checkResponse.json();
    }

    return res.status(200).json(prediction);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
