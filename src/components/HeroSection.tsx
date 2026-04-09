import { useState, useRef } from "react";
import { Sparkles, Coins, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useTokens } from "@/components/TokenContext";

// Карта соответствия эмодзи и типов анимации
const EMOTION_TEMPLATES: Record<string, string> = {
  '😊': 'wave_hand_smile',
  '😎': 'cool_glasses_tilt',
  '😡': 'angry_shout',
  '🤩': 'star_eyes_delight',
  '🤔': 'think_doubt',
  '👍': 'thumbs_up',
  '❤️': 'heart_hands',
};

const HeroSection = () => {
  const { balance } = useTokens();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("Pixar");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleEmoji = (emoji: string) => {
    if (!EMOTION_TEMPLATES[emoji]) {
      alert("Для этого эмодзи сценарий в разработке!");
      return;
    }
    setSelectedEmojis(prev => 
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  const handleGenerate = () => {
    if (!selectedFile) return alert("Загрузите фото!");
    if (selectedEmojis.length === 0) return alert("Выберите эмоции!");
    
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Запрос отправлен!");
    }, 2000);
  };

  // Используем пути как строки, чтобы избежать ошибок импорта
  const styles = [
    { name: "Pixar", img: "/demo-pixar.png" },
    { name: "GTA", img: "/demo-gta.png" },
    { name: "Miyazaki", img: "/demo-ghibli.png" },
    { name: "Cyberpunk", img: "/demo-cyberpunk.png" },
    { name: "Line Art", img: "/demo-lineart.png" }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-10 px-4 bg-[#0a0a0c]">
      <div className="container max-w-7xl">
        
        {/* Экран 1: Заголовок */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">Создавай свои стикеры</h1>
            <p className="text-gray-400 mb-8">Загрузи фото — получи живые стикеры для Telegram</p>
            <Button onClick={() => document.getElementById('generator')?.scrollIntoView({behavior:'smooth'})} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl h-12 px-8 font-bold">
              Попробовать бесплатно
            </Button>
          </ScrollReveal>
        </div>

        {/* Экран 4: Генератор */}
        <div id="generator" className="mt-20 p-8 bg-white/[0.02] border border-white/10 rounded-[40px] backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. Фото */}
            <div className="lg:col-span-4">
              <span className="text-[10px] font-black uppercase text-purple-500 mb-2 block">1. Ваше фото</span>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 transition-all overflow-hidden"
              >
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Upload className="text-gray-500" />}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            {/* 2. Стили */}
            <div className="lg:col-span-5">
              <span className="text-[10px] font-black uppercase text-purple-500 mb-2 block">2. Стиль</span>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((s) => (
                  <div 
                    key={s.name} 
                    onClick={() => setSelectedStyle(s.name)}
                    className={`aspect-square rounded-xl border-2 cursor-pointer transition-all ${selectedStyle === s.name ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 opacity-40'}`}
                  >
                    <div className="flex items-center justify-center h-full text-[10px] text-white font-bold uppercase">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Эмоции */}
            <div className="lg:col-span-3">
              <span className="text-[10px] font-black uppercase text-purple-500 mb-2 block">3. Эмоции</span>
              <div className="grid grid-cols-4 gap-2 bg-black/20 p-3 rounded-2xl">
                {Object.keys(EMOTION_TEMPLATES).map(emoji => (
                  <button 
                    key={emoji} 
                    onClick={() => toggleEmoji(emoji)}
                    className={`aspect-square text-xl rounded-lg transition-all ${selectedEmojis.includes(emoji) ? 'bg-purple-600 scale-110' : 'hover:bg-white/5'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="bg-gradient-to-r from-indigo-600 to-pink-600 h-16 px-12 text-xl font-black rounded-2xl w-full md:w-auto"
            >
              {isGenerating ? "ЗАГРУЗКА..." : "СОЗДАТЬ СТИКЕРПАК"}
            </Button>
            <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
              Баланс: {balance} монет
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
