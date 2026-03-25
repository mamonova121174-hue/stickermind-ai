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
    <section className="relative min-h-screen flex flex-col items-center pt-24 pb-16 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-5xl">
        
        {/* ПЕРВЫЙ ЭКРАН */}
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6 font-medium">
            Создай стикерпак в 5 премиум стилях за 30 сек.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-primary to-purple-600 text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-6 h-6 mr-3" />
                Создать первый стикер бесплатно
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mb-12">
            <a href="#generator" className="inline-flex items-center gap-2 text-md text-primary font-bold group">
              Попробовать сейчас
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>

        {/* СЕТКА №1 (СРАЗУ ПОСЛЕ ПЕРВОГО ЭКРАНА) */}
        <ScrollReveal delay={400}>
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 items-center mb-32">
            <div className="flex flex-col items-center gap-2">
              <div className="w-64 h-64 rounded-[32px] overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img src={originalImg} alt="Original" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary/40 italic">Оригинал</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {[
                { img: demoPixar }, { img: demoGta }, { img: demoGhibli }, { img: demoCyberpunk }, { img: demoLineart }
              ].map((s, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img src={s.img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ВТОРОЙ ЭКРАН: ПРОДАЮЩИЙ БЛОК */}
        <div className="py-20 border-t border-white/5">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-10">
            Один персонаж — <span className="text-primary">пять стилей</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="px-6 py-3 bg-primary text-white rounded-full text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/30">
              ⚡️ Стикеры для Telegram
            </div>
            <div className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer">
              🤖 Создай стикер для МАКС
            </div>
          </div>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Наша нейросеть превратит твоё фото в уникальный набор персонажей. 
            Никакой рутины — только творчество и мгновенный результат.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
