import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-10 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">
        
        {/* ЭКРАН 1: ГЛАВНЫЙ */}
        <div className="text-center mb-6">
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
            <div className="flex flex-col items-center gap-3">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <a href="#generator" className="flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span className="leading-none">Создать первый стикер бесплатно</span>
                </a>
              </Button>
              <div className="text-[10px] text-gray-500 font-medium flex items-center gap-2">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">15</span>
                бесплатно — хватит на 2 анимации
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-4">
            <a href="#generator" className="inline-flex flex-col items-center gap-1 text-[10px] text-purple-400 font-bold uppercase tracking-widest opacity-70">
              Попробовать сейчас
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>

        {/* ПЕРВАЯ СЕТКА (КАРТИНКИ ПОДНЯТЫ ВЫШЕ К ТЕКСТУ) */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-2 mb-24">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { img: demoPixar, label: "3D Pixar" },
                { img: demoGta, label: "GTA Style" },
                { img: demoGhibli, label: "Miyazaki" },
                { img: demoCyberpunk, label: "Cyberpunk" },
                { img: demoLineart, label: "Line Art" },
                { img: null, label: "И еще 10+ стилей", isMore: true }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                  <div className={`w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 flex items-center justify-center transition-all ${
                    s.isMore ? "bg-white/5 border-dashed border-white/20 hover:border-white/30" : "bg-card/50 border-white/5 hover:border-primary/40 hover:scale-105"
                  }`}>
                    {s.img ? (
                      <img src={s.img} className="w-full h-full object-cover" alt={s.label} />
                    ) : (
                      <span className="text-[10px] text-gray-500 font-bold text-center px-4 uppercase tracking-wider leading-relaxed">{s.label}</span>
                    )}
                  </div>
                  {!s.isMore && (
                    <span className="text-[12px] font-bold uppercase tracking-widest text-gray-400">
                      {s.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ЭКРАН 2: ЛИНЕЙНЫЙ РЯД (С ЗАПАСОМ РАССТОЯНИЯ СВЕРХУ) */}
        <div className="mt-16 text-center w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-6 leading-tight">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20">
                ⚡️ Стикеры для Telegram
              </span>
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20">
                🤖 Создай стикер для МАКС
              </span>
            </div>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
              Посмотри, как одно фото превращается в уникальных персонажей на прозрачном фоне. <br/>
              StickerMind создаст идеальный пак за 30 секунд.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 shadow-xl bg-card/50 hover:scale-105 transition-all">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 italic">Оригинал</span>
              </div>

              <div className="text-2xl text-purple-500/60 font-bold px-1 md:px-2">→</div>

              <div className="flex flex-row items-center gap-2 md:gap-4 overflow-x-auto py-2">
                {[
                  { img: demoPixar, label: "3D Pixar" },
                  { img: demoGta, label: "GTA Style" },
                  { img: demoGhibli, label: "Miyazaki" },
                  { img: demoCyberpunk, label: "Cyberpunk" },
                  { img: demoLineart, label: "Line Art" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                    <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-[28px] overflow-hidden border border-white/10 bg-card/50 shadow-lg hover:border-purple-500/40 hover:scale-105 transition-all">
                      <img src={s.img} className="w-full h-full object-cover" alt={s.label} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-tight text-white/40">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
