import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

// Твои правильные картинки
import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-5xl">
        
        {/* ВЕРХНИЙ БЛОК: ТЕКСТ И КНОПКА */}
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase text-white">
            Создавай свои стикеры
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium">
            Создай стикерпак в 5 премиум стилях за 30 сек.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild className="bg-gradient-to-r from-primary to-purple-600 text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-6 h-6 mr-3" />
                Создать первый стикер бесплатно
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mb-20 text-center">
            <a href="#generator" className="inline-flex items-center gap-2 text-md text-primary font-bold group hover:underline">
              Попробовать сейчас
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>

        {/* --- СТРЕЛКА-РАЗДЕЛИТЕЛЬ --- */}
        <div className="flex justify-center -mt-8 mb-24">
          <div className="w-px h-20 bg-gradient-to-b from-primary/80 to-transparent shadow-glow-sm" />
        </div>

        {/* МАРКЕТИНГОВЫЙ БЛОК: ОПУЩЕН К КАРТИНКАМ */}
        <div className="mt-16 mb-20 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
            Один персонаж — <span className="text-primary">пять стилей</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              ⚡️ Стикеры для Telegram
            </span>
            <span className="px-6 py-3 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              🤖 Создай стикер для МАКС
            </span>
          </div>

          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Посмотри, как одно фото превращается в уникальных персонажей на прозрачном фоне. 
            StickerMind создаст идеальный пак за 30 секунд.
          </p>
        </div>

        {/* БОЛЬШАЯ СЕТКА КАРТИНОК (2х3) */}
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 mb-16 text-center">
            {[
              { img: originalImg, label: "Твой оригинал", isSpecial: true },
              { img: demoPixar, label: "3D Pixar" },
              { img: demoGta, label: "GTA Style" },
              { img: demoGhibli, label: "Miyazaki" },
              { img: demoCyberpunk, label: "Cyberpunk" },
              { img: demoLineart, label: "Line Art" }
            ].map((s, i) => (
              <div key={i} className="group flex flex-col items-center gap-4">
                <div className={`w-full aspect-[3/4] rounded-[48px] overflow-hidden border-2 bg-card/50 shadow-2xl transition-all duration-500 hover:scale-[1.03] ${
                  s.isSpecial ? "border-primary/40 shadow-primary/10" : "border-white/10 hover:border-primary/30"
                }`}>
                  <img src={s.img} className="w-full h-full object-cover" alt={s.label} />
                </div>
                <div className={`px-4 py-2 backdrop-blur-md rounded-full border ${
                  s.isSpecial ? "bg-primary/10 border-primary/20" : "bg-white/5 border-white/10"
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    s.isSpecial ? "text-primary italic" : "text-white"
                  }`}>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default HeroSection;
// Ревизия от 25.03.2026 - Финальная сборка для Лены
