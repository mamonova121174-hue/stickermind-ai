import { Sparkles, Coins } from "lucide-react";
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

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-10 px-4 bg-[#0a0a0c]">
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
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <a href="#generator" className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span className="leading-none">Создать первый стикер бесплатно</span>
                </a>
              </Button>
              
              <div className="text-[10px] text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Coins className="w-3 h-3" /> {balance}
                </span>
                бесплатно — хватит на {Math.floor(balance / 7)} анимации
              </div>
            </div>
          </ScrollReveal>
        </div>

   <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-0 mb-24 p-0">
            {/* КАРТОЧКА ОРИГИНАЛА */}
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>

            {/* СЕТКА ИЗ 5 СТИКЕРОВ (6-е место оставляем пустым, так как кнопка теперь "летает") */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-start">
              {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 bg-card/50 border-white/5 hover:border-purple-500/30 transition-all">
                    <img src={img} className="w-full h-full object-cover" alt="Стиль стикера" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ЭКРАН 2: ЛИНЕЙКА */}
        <div className="mt-10 text-center w-full mb-24">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">⚡️ Стикеры для Telegram</span>
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">🤖 Создай стикер для МАКС</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 bg-card/50 shadow-xl">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
                </div>
                <span className="text-[9px] font-black uppercase text-purple-400 italic">Оригинал</span>
              </div>
              <div className="text-2xl text-purple-500/60 font-bold">→</div>
              <div className="flex flex-row items-center gap-3 overflow-x-auto py-2 no-scrollbar">
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
                    <span className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-tighter">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ЭКРАН 3: ИНСТРУКЦИЯ */}
        <div className="mt-12 mb-20 w-full max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12 text-white">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Как сделать <span className="text-purple-500">свой стикер</span>?</h2>
            </div>
          </ScrollReveal>
          {/* ... здесь твоя сетка шагов (01, 02, 03), она остается без изменений ... */}
        </div>

        {/* ЭКРАН 4: ГЕНЕРАТОР */}
        <div id="generator" className="mt-12 mb-16 w-full max-w-6xl mx-auto px-4 text-center">
             {/* ... код генератора ... */}
        </div>

      </div>

      {/* ФИНАЛЬНАЯ ЛЕТАЮЩАЯ КНОПКА (FIXED) — Всегда под рукой! */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] group">
        <a 
          href="#generator" 
          className="relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-700 bg-[#0d0d10]/90 backdrop-blur-xl border-2 border-rose-500/40 shadow-[0_0_40px_rgba(225,29,72,0.4)] group-hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] group-hover:border-purple-500 group-hover:scale-110 active:scale-95"
        >
          {/* Анимация Сирены/Мигалки */}
          <div className="absolute inset-0 bg-rose-600/10 animate-[pulse_1s_infinite] group-hover:bg-purple-600/20" />
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-rose-600 blur-[20px] animate-pulse group-hover:bg-purple-500" />
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 group-hover:from-fuchsia-600 group-hover:to-purple-600 flex items-center justify-center shadow-lg transition-all duration-500">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-center px-3 text-white leading-tight">
              Создать <br/> <span className="text-amber-400 group-hover:text-fuchsia-300 transition-colors">свой стикер</span>
            </span>
          </div>

          {/* Бегающий блик */}
          <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3s_infinite]" />
        </a>
      </div>

    </section>
  );
};

export default HeroSection;
