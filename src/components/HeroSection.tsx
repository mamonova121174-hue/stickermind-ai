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
    <section className="relative min-h-screen flex flex-col items-center pt-24 pb-16 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-6xl">
        
        {/* ВЕРХНИЙ БЛОК: ТЕКСТ И КНОПКА */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-7xl font-black leading-[1.1] tracking-tight mb-6 uppercase text-white">
              Создавай свои стикеры
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-6">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 transition-all border-none">
                <a href="#generator" className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-3" />
                  Создать первый стикер бесплатно
                </a>
              </Button>
              <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
                <span className="bg-white/10 px-2 py-1 rounded-md">15</span>
                бесплатно — хватит на 2 анимации
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-12">
              <a href="#generator" className="inline-flex flex-col items-center gap-2 text-sm text-purple-400 font-bold group hover:text-purple-300 transition-colors">
                Попробовать сейчас
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ОСНОВНОЙ КОНТЕНТ: ОРИГИНАЛ + СЕТКА */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 mt-10">
            
            {/* Левая колонка: Оригинал */}
            <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-[40px] overflow-hidden border-2 border-primary/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] bg-card/50">
                <img src={originalImg} className="w-full h-full object-cover" alt="Твой оригинал" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">
                Твой оригинал
              </span>
            </div>

            {/* Правая колонка: Сетка стилей */}
            <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {styles.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className={`w-full aspect-square rounded-[32px] overflow-hidden border-2 transition-all duration-300 hover:scale-[1.05] flex items-center justify-center ${
                    s.isMore ? "bg-white/5 border-dashed border-white/20" : "bg-card/50 border-white/5 hover:border-primary/40"
                  }`}>
                    {s.img ? (
                      <img src={s.img} className="w-full h-full object-cover" alt={s.label} />
                    ) : (
                      <span className="text-[10px] text-gray-500 text-center px-4 font-bold uppercase">{s.label}</span>
                    )}
                  </div>
                  {!s.isMore && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
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
