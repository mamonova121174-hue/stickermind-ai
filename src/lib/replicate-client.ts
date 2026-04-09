import Replicate from "replicate";

// Этот файл просто настраивает связь, используя твой ключ из .env.local
export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
