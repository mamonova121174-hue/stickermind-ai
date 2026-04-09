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

const EMOTION_TEMPLATES: Record<string, string> = {
  '😊': 'wave_hand_smile.mp4', // Заменишь, когда загрузишь машущую руку
  '😎': 'he_adjusts_his_glasses.mp4', // Твое видео с очками
  '🤩': 'he opens his eyes and mouth wide in surprise, grabbing his.mp4', // Твое видео с удивлением
  '😡': 'angry_shout.mp4',
  '🤔': 'think_doubt.mp4',
  '👍': 'thumbs_up.mp4',
  '❤️': 'heart_hands.mp4',
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
      alert("Сценарий для этого эмодзи в разработке!");
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
      alert("Магия началась!");
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-10 px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">

        {/* ЭКРАН 1: ГЛАВНЫЙ */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-tight mb-4 uppercase text-white">
              Создавай свои стикеры
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-4">
              <Button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span className="leading-none">Создать первый стикер бесплатно</span>
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

        {/* СЕТКА С ЛИПКОЙ КНОПКОЙ */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-0 mb-24 p-0">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-start">
              {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 bg-card/50 border-white/5 hover:border-purple-500/30 transition-all">
                    <img src={img} className="w-full h-full object-cover" alt="Стиль" />
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center shrink-0 sticky top-24 z-50 self-start group">
                <a href="#generator" className="relative w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] flex flex-col items-center justify-center gap-4 overflow-hidden transition-all duration-700 bg-[#0d0d10] border-2 border-dashed border-rose-500/20 group-hover:border-purple-500/80 group-hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] shadow-[0_0_20px_rgba(225,29,72,0.2)]">
                  <div className="absolute inset-0 bg-rose-600/10 animate-[pulse_1.5s_infinite] group-hover:bg-purple-600/20 transition-colors duration-500" />
                  <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 group-hover:from-fuchsia-600 group-hover:to-purple-600 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 mx-auto">
                      <Sparkles className="w-8 h-8 text-white animate-[bounce_2s_infinite]" />
                    </div>
                    <span className="text-[11px] md:text-sm font-black uppercase tracking-widest text-amber-300 group-hover:text-white leading-tight">
                      Создать свой <br/> <span className="text-white group-hover:text-fuchsia-300">стикер</span>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ЭКРАН 2: ЛИНЕЙКА */}
        <div id="styles" className="mt-10 text-center w-full mb-24">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>
            <div className="flex flex-row items-center justify-center gap-4 w-full overflow-x-auto no-scrollbar pb-4">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 bg-card/50 shadow-xl">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
                </div>
                <span className="text-[9px] font-black uppercase text-purple-400 italic text-center">Оригинал</span>
              </div>
              <div className="text-2xl text-purple-500/60 font-bold">→</div>
              {[
                { img: demoPixar, name: "Pixar" },
                { img: demoGta, name: "GTA" },
                { img: demoGhibli, name: "Miyazaki" },
                { img: demoCyberpunk, name: "Cyberpunk" },
                { img: demoLineart, name: "Line Art" }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border border-white/10 bg-card/50 shadow-lg">
                    <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
                  </div>
                  <span className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-tighter text-center">{s.name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ЭКРАН 3: ИНСТРУКЦИЯ */}
        <div className="mt-12 mb-20 w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { step: "01", title: "Загрузи фото", desc: "Выбери качественное селфи. ИИ автоматически удалит фон.", icon: "📸" },
              { step: "02", title: "Выбери стили", desc: "Выбирай разные стили для каждой эмоции или сгенерируй пак сразу.", icon: "🎨" },
              { step: "03", title: "Забирай пак", desc: "Добавь их в Telegram в один клик.", icon: "🚀" }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-[36px] bg-white/[0.03] border border-white/10 overflow-hidden group">
                <div className="absolute -right-2 -top-2 text-9xl font-black text-white/[0.03] group-hover:text-purple-500/10 transition-colors">{item.step}</div>
                <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-3xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 uppercase">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ЭКРАН 4: ГЕНЕРАТОР */}
        <div id="generator" className="mt-12 mb-16 w-full max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">Создать <span className="text-primary">стикер</span></h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-6 md:p-10 mb-10 backdrop-blur-md text-left">
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">1. Ваше фото</span>
              <div onClick={() => fileInputRef.current?.click()} className="relative flex-1 min-h-[250px] border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center gap-3 hover:border-purple-500/50 transition-all cursor-pointer bg-white/[0.01] overflow-hidden">
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" /> : <><Upload className="w-10 h-10 text-gray-500" /><span className="text-white font-bold text-xs uppercase">Нажмите для загрузки</span></>}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">2. Выберите стиль</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { img: demoPixar, name: "Pixar" },
                  { img: demoGta, name: "GTA" },
                  { img: demoGhibli, name: "Miyazaki" },
                  { img: demoCyberpunk, name: "Cyberpunk" },
                  { img: demoLineart, name: "Line Art" }
                ].map((s, i) => (
                  <div key={i} onClick={() => setSelectedStyle(s.name)} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedStyle === s.name ? 'border-purple-500 scale-95 shadow-lg shadow-purple-500/30' : 'border-white/5 opacity-50'}`}>
                    <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">3. Эмоции</span>
              <div className="grid grid-cols-4 gap-2 p-3 bg-black/20 rounded-[24px] border border-white/5">
                {Object.keys(EMOTION_TEMPLATES).map((emoji, i) => (
                  <button key={i} onClick={() => toggleEmoji(emoji)} className={`aspect-square flex items-center justify-center text-xl rounded-lg transition-all ${selectedEmojis.includes(emoji) ? 'bg-purple-600 scale-110 shadow-lg' : 'hover:bg-white/10'}`}>
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-all border-none">
            {isGenerating ? "МАГИЯ В ПРОЦЕССЕ..." : <><Sparkles className="w-6 h-6 mr-3" /><span>СОЗДАТЬ СТИКЕРПАК</span></>}
          </Button>
          <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
            {selectedEmojis.length * 10} монет • {balance} доступно
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
