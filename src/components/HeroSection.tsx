import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-4xl">
        
        <ScrollReveal>
          {/* ГЛАВНЫЙ ЗАГОЛОВОК */}
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {/* ПОДЗАГОЛОВОК С ТЕКСТОМ */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Создай стикерпак в 5 премиум стилях за 30 сек.<br />
            Загрузи фото — получи стикеры для Телеграм.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* КНОПКА С ТВОИМ ТЕКСТОМ */}
            <Button asChild className="bg-gradient-primary text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-6 h-6 mr-3" />
                Создать первый стикер бесплатно
              </a>
            </Button>

            {/* БРИЛЛИАНТ С ЦИФРОЙ 15 */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-semibold mt-2">
              <div className="relative flex items-center justify-center w-8 h-8 bg-primary/10 rotate-45 border border-primary/30 rounded-sm">
                <span className="-rotate-45 text-primary text-xs font-bold">15</span>
              </div>
              <span>бесплатно — хватит на 2 анимации</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {/* ПОПРОБОВАТЬ СЕЙЧАС И СТРЕЛКА */}
          <div className="mb-20">
            <a href="#generator" className="inline-flex flex-col items-center gap-2 text-md text-primary hover:underline font-bold group">
              Попробовать сейчас
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>

        {/* КРУПНЫЙ ТЕКСТ ПРО СТИЛИ */}
        <ScrollReveal delay={400}>
          <div className="space-y-12">
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-foreground">
              Один персонаж — пять стилей
            </h2>
            
            {/* ПРИМЕРЫ (Картинки подгрузятся, если они есть в assets) */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] overflow-hidden border-2 border-primary/20 shadow-2xl">
                   <img src="/src/assets/original-hero.png" alt="Оригинал" className="w-full h-full object-cover" 
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400/9b87f5/white?text=Фото")} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Оригинал</span>
              </div>
              
              <div className="text-primary/40 text-4xl font-light">→</div>

              {[
                { name: "3D Pixar", path: "demo-pixar-hello-v2.png" },
                { name: "GTA Style", path: "demo-gta-like-v2.png" },
                { name: "Miyazaki", path: "demo-ghibli-think-v2.png" },
                { name: "Cyberpunk", path: "demo-cyberpunk-cool-v2.png" },
                { name: "Line Art", path: "demo-lineart-love-v2.png" }
              ].map((style, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-border/50 bg-card shadow-lg">
                    <img src={`/src/assets/${style.path}`} alt={style.name} className="w-full h-full object-contain p-1" 
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100/f3f4f6/6b7280?text=Стиль")} />
                  </div>
                  <span className="text-[8px] font-bold uppercase text-muted-foreground">{style.name}</span>
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
