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
  const styles = [
    { img: demoPixar, label: "3D Pixar" },
    { img: demoGta, label: "GTA Style" },
    { img: demoGhibli, label: "Miyazaki" },
    { img: demoCyberpunk, label: "Cyberpunk" },
    { img: demoLineart, label: "Line Art" },
    { img: null, label: "И еще 10+ стилей", isMore: true }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-10 pb-4 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-6xl flex flex-col items-center">
        
        {/* ВЕРХНИЙ БЛОК */}
        <div className="text-center mb-4">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl font-black leading-tight mb-2 uppercase text-white">
              Создавай свои стикеры
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-4">
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

        {/* СЕТКА КАРТИНОК */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 mt-4">
            
            {/* Левая колонка: Оригинал */}
            <div className="w-full max-w-[280px] lg:w-1/3 flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-[32px] overflow-hidden border-2 border-primary/20 bg-card/50">
                <img src={originalImg} className="w-full h-full object-cover" alt="Твой оригинал" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">
                Твой оригинал
              </span>
            </div>

            {/* Правая колонка: Сетка стилей */}
            <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {styles.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className={`w-full aspect-square rounded-[24px] overflow-hidden border-2 transition-all duration-300 hover:scale-[1.05] flex items-center justify-center ${
                    s.isMore ? "bg-white/5 border-dashed border-white/20" : "bg-card/50 border-white/5 hover:border-primary/40"
                  }`}>
                    {s.img ? (
                      <img src={s.img} className="w-full h-full object-cover" alt={s.label} />
                    ) : (
                      <span className="text-[9px] text-gray-500 text-center px-2 font-bold uppercase">{s.label}</span>
                    )}
                  </div>
                  {!s.isMore && (
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">
                      {s.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default HeroSection;
