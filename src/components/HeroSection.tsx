import { useState, useRef } from "react";
import { Sparkles, Coins, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useTokens } from "@/components/TokenContext";

// Импорты ассетов
import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  const { balance } = useTokens();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Состояния для генератора
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("Pixar");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Обработка выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Выбор/снятие выбора эмодзи
  const toggleEmoji = (emoji: string) => {
    setSelectedEmojis(prev => 
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      alert("Сначала загрузите фото!");
      return;
    }
    setIsGenerating(true);
    // Здесь будет логика запроса к Replicate
    setTimeout(() => {
      setIsGenerating(false);
      alert("Генерация запущена!");
    }, 2000);
  };

  const styles = [
    { img: demoPixar, name: "Pixar" },
    { img: demoGta, name: "GTA" },
    { img: demoGhibli, name: "Miyazaki" },
    { img: demoCyberpunk, name: "Cyberpunk" },
    { img: demoLineart, name: "Line Art" }
  ];

  const emojis = ['😊', '😎', '😡', '😱', '😭', '🤩', '🤔', '🔥', '😇', '🤡', '🤮', '😴', '👍', '❤️', '👀', '✨'];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-10 px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">

        {/* ЭКРАН 1: ЗАГОЛОВОК */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-tight mb-4 uppercase text-white text-center">
              Создавай свои стикеры
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed text-center">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-4">
              <Button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Создать первый стикер бесплатно
                </span>
              </Button>
              <div className="text-[10px] text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Coins className="w-3 h-3" /> {balance}
                </span>
                бесплатно — хватит на {Math.floor(balance / 10)} анимации
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ЭКРАН ГЕНЕРАТОРА */}
        <div id="generator" className="mt-12 mb-16 w-full max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
              Создать <span className="text-indigo-500">стикер</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-6 md:p-10 mb-10 backdrop-blur-md text-left">
            
            {/* 1. ЗАГРУЗКА ФОТО */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">1. Ваше фото</span>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative flex-1 min-h-[250px] border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center gap-3 group hover:border-purple-500/50 transition-all cursor-pointer bg-white/[0.01] overflow-hidden"
              >
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-500 group-hover:scale-110 transition-transform" />
                    <span className="text-white font-bold text-xs uppercase">Нажмите для загрузки</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            {/* 2. ВЫБОР СТИЛЯ */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">2. Выберите стиль</span>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedStyle(s.name)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${selectedStyle === s.name ? 'border-purple-500 scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/5'}`}
                  >
                    <img src={s.img} className={`w-full h-full object-cover ${selectedStyle === s.name ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`} alt={s.name} />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-center">
                      <span className="text-[8px] font-bold text-white uppercase">{s.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. ЭМОЦИИ */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">3. Эмоции</span>
              <div className="grid grid-cols-4 gap-2 p-3 bg-black/20 rounded-[24px] border border-white/5">
                {emojis.map((emoji, i) => (
                  <button 
                    key={i} 
                    onClick={() => toggleEmoji(emoji)}
                    className={`aspect-square flex items-center justify-center text-xl rounded-lg transition-all ${selectedEmojis.includes(emoji) ? 'bg-purple-600 scale-110 shadow-lg' : 'hover:bg-white/10'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ScrollReveal delay={400}>
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-all border-none group"
              >
                {isGenerating ? "МАГИЯ В ПРОЦЕССЕ..." : (
                  <>
                    <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    <span>СОЗДАТЬ СТИКЕРПАК</span>
                  </>
                )}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
