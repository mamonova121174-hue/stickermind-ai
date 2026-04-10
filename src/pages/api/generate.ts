import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  // ВСТАВЬ СВОЙ КЛЮЧ ВМЕСТО СЛОВА 'ТВОЙ_КЛЮЧ_ТУТ'
  const REPLICATE_API_TOKEN = 'ТВОЙ_КЛЮЧ_ТУТ';

  try {
    const { image, prompt } = req.body;

    // Это запрос к нейросети Replicate
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Здесь указывается модель нейросети (например, для стикеров)
        version: "f1094040a83021da3342377488009137d7a469f64e030225ba1292023023e670",
        input: { 
          image: image,
          prompt: `A professional sticker of ${prompt}, high quality, white border`,
          steps: 20
        },
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Ошибка на стороне нейросети" });
  }
}
