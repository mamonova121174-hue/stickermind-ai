import { Sparkles } from "lucide-react";
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
            <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
              <a href="#generator" className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span>Создать первый стикер бесплатно</span>
              </a>
            </Button>
          </ScrollReveal>
        </div>

        {/* ЭКРАН 2: ЛИНЕЙКА (ОДИН ПЕРСОНАЖ — ПЯТЬ СТИЛЕЙ) */}
        <div className="mt-10 text-center w-full mb-24">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 bg-card/50">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
                </div>
                <span className="text-[9px] font-black uppercase text-purple-400 italic">Оригинал</span>
              </div>
              <div className="text-2xl text-purple-500/60 font-bold">→</div>
              <div className="flex flex-row items-center gap-3 overflow-x-auto py-2 no-scrollbar">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border border-white/10 bg-card/50 shadow-lg shrink-0">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ЭКРАН 3: ГЕНЕРАТОР (РАБОЧАЯ ЗОНА) */}
        <div id="generator" className="mt-12 mb-16 w-full max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
              Создать <span className="text-primary text-shadow-glow">стикер</span>
            </h2>
            {/* Твоя исправленная строчка-инструкция */}
            <p className="text-gray-400 text-base md:text-lg max-w-4xl mx-auto mb-10 font-medium leading-relaxed">
              Загрузи фото, выбери стиль и те эмодзи, с эмоциями которых ты хочешь сделать стикеры из фото.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-6 md:p-10 mb-10 backdrop-blur-md">
              
              {/* 1. ВАШЕ ФОТО */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 text-left">1. Ваше фото</span>
                <div className="flex-1 min-h-[250px] border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center gap-3 group hover:border-purple-500/50 transition-all cursor-pointer">
                  <div className="text-4xl group-hover:scale-110 transition-transform">📤</div>
                  <span className="text-white font-bold text-xs uppercase">Нажмите для загрузки</span>
                </div>
              </div>

              {/* 2. ВЫБЕРИТЕ СТИЛЬ */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 text-left">2. Выберите стиль</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { img: demoPixar, name: "Pixar" },
                    { img: demoGta, name: "GTA" },
                    { img: demoGhibli, name: "Miyazaki" },
                    { img: demoCyberpunk, name: "Cyberpunk" },
                    { img: demoLineart, name: "Line Art" }
                  ].map((s, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/5 hover:border-purple-500/50 transition-all cursor-pointer group">
                      <img src={s.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt={s.name} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1">
                        <span className="text-[8px] font-bold text-white uppercase">{s.name}</span>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-square rounded-xl border-2 border-dashed border-white/5 flex items-center justify-center text-[7px] font-bold text-gray-600 uppercase">Soon</div>
                </div>
              </div>

              {/* 3. ЭМОЦИИ */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 text-left">3. Эмоции</span>
                <div className="grid grid-cols-4 gap-2 p-3 bg-black/20 rounded-[24px] border border-white/5">
                  {['😊', '😎', '😡', '😱', '😭', '🤩', '🤔', '🔥', '😇', '🤡', '🤮', '😴', '👍', '❤️', '👀', '✨'].map((emoji, i) => (
                    <button key={i} className="aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded-lg transition-colors">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* КНОПКА СОЗДАТЬ */}
          <ScrollReveal delay={400}>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-all border-none group">
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                <span>СОЗДАТЬ СТИКЕРПАК</span>
              </Button>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-50">
                Бесплатно — осталось 15 генераций
              </p>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
