import { useState, useRef } from "react";
import { useTokens } from "@/components/TokenContext";

const HeroSection = () => {
  const { balance } = useTokens();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <section className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-4">StickerMind DEBUG MODE</h1>
      <p className="mb-8 text-gray-400">Баланс: {balance} монет</p>
      
      <div className="border-2 border-dashed border-gray-700 p-10 rounded-3xl flex flex-col items-center gap-4">
        {previewUrl && <img src={previewUrl} className="w-40 h-40 object-cover rounded-xl" />}
        <input type="file" onChange={handleFileChange} className="text-sm" />
        <p className="text-xs text-gray-500">Попробуй загрузить фото здесь</p>
      </div>

      <button 
        onClick={() => alert("Работает!")}
        className="mt-10 bg-purple-600 px-8 py-3 rounded-xl font-bold"
      >
        ПРОВЕРИТЬ КНОПКУ
      </button>
    </section>
  );
};

export default HeroSection;
