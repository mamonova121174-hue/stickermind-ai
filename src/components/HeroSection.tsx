import { useState, useRef } from "react";
import { Sparkles, Coins, Upload, ArrowRight, Camera, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTokens } from "@/components/TokenContext";

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
    setSelectedEmojis(prev => 
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  const handleGenerate = () => {
    if (!selectedFile) return alert("Загрузите ваше фото!");
    if (selectedEmojis.length === 0) return alert("Выберите хотя бы одну эмоцию!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Запрос отправлен в нейросеть!");
    }, 2000);
  };

  const styles = ["Pixar", "GTA", "Miyazaki", "Cyberpunk", "Line Art"];

  return (
    <section className="relative min-h-screen bg-[#0a0a0c] pt-20 pb-10 px-4">
      <div className="container max-w-7xl mx-auto">
        
        {/* БЛОК 1: ПРИВЕТСТВИЕ */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 leading-tight italic">
            Создавай свои <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">стикеры</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Один селфи — целый пак живых эмоций. Технологии будущего в твоем чате.
          </p>
          <Button 
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black hover:bg-gray-200 h-14 px-10 rounded-2xl text-xl font-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            ПОПРОБОВАТЬ БЕСПЛАТНО
          </Button>
        </div>

        {/* БЛОК 2: ЛИНЕЙКА СТИЛЕЙ */}
        <div className="mb-32">
          <h2 className="text-center text-white font-black uppercase text-3xl mb-12">Один персонаж — 5 стилей</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gray-500 font-bold uppercase">Твое фото</div>
            <div className="flex items-center text-indigo-500"><ArrowRight /></div>
            {styles.map(s => (
              <div key={s} className="w-32 h-32 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/5 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Palette size={20} />
                </div>
                <span className="text-[10px] text-white font-black uppercase tracking-tighter">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* БЛОК 3: ИНСТРУКЦИЯ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { icon: <Camera />, t: "ЗАГРУЗИ", d: "Качественное селфи" },
            { icon: <Palette />, t: "ВЫБЕРИ", d: "Стиль и эмоции" },
            { icon: <Zap />, t: "ЗАБИРАЙ", d: "Готовый пак в Telegram" }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 mb-6">{item.icon}</div>
              <h3 className="text-white font-black uppercase text-xl mb-2">{item.t}</h3>
              <p className="text-gray-500 text-sm">{item.d}</p>
            </div>
          ))}
        </div>

        {/* БЛОК 4: ГЕНЕРАТОР */}
        <div id="generator" className="bg-white/[0.02] border border-white/10 rounded-[48px] p-8 md:p-12 backdrop-blur-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase text-indigo-500">1. Твое фото</span>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/5] border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all overflow-hidden"
              >
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Upload className="text-gray-700 w-10 h-10" />}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase text-indigo-500">2. Выбери стиль</span>
              <div className="grid grid-cols-2 gap-3">
                {styles.map(s => (
                  <div 
                    key={s} 
                    onClick={() => setSelectedStyle(s)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center font-black uppercase text-[12px] ${selectedStyle === s ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/5 text-gray-600'}`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase text-indigo-500">3. Выбери эмоции</span>
              <div className="grid grid-cols-4 gap-2 bg-black/40 p-4 rounded-[32px]">
                {Object.keys(EMOTION_TEMPLATES).map(emoji => (
                  <button 
                    key={emoji} 
                    onClick={() => toggleEmoji(emoji)}
                    className={`aspect-square text-2xl rounded-xl transition-all ${selectedEmojis.includes(emoji) ? 'bg-indigo-600 scale-110 shadow-lg' : 'hover:bg-white/5 opacity-40'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase">
                <span>Баланс: {balance}</span>
                <span>Итог: {selectedEmojis.length * 10}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="bg-indigo-600 hover:bg-indigo-500 text-white h-16 px-16 text-xl font-black rounded-2xl w-full md:w-auto shadow-xl"
            >
              {isGenerating ? "ГЕНЕРАЦИЯ..." : "СОЗДАТЬ СТИКЕРПАК"}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
