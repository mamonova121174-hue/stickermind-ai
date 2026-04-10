import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Это временный ответ, чтобы проверить, что кнопка "ожила"
    return res.status(200).json({ 
      success: true, 
      message: "Связь с сервером установлена! Мы скоро запустим генерацию." 
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
