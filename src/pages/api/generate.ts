import { replicate } from "../../lib/replicate-client";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { image, style, motionUrl } = req.body;

    // Запускаем модель LivePortrait на Replicate
    // Мы передаем фото пользователя и ссылку на твое видео-движение
    const prediction = await replicate.predictions.create({
      version: "live-portrait-version-id-here", // Сюда мы вставим ID модели позже
      input: {
        face_image: image,
        driving_video: motionUrl,
        output_format: "webp",
        remove_background: true
      },
    });

    return res.status(200).json(prediction);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
