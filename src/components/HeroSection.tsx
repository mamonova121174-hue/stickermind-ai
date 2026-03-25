import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

// Твои правильные картинки
const originalImg = "";
const demoPixar = "";
const demoGta = "";
const demoGhibli = "";
const demoCyberpunk = "";
const demoLineart = "";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-5xl">
        
        {/* ВЕРХНИЙ БЛОК: ТЕКСТ И КНОПКА */}
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Создай стикерпак в 5 премиум стилях за 30 сек.<br />
            Загрузи фото — получи стикеры для Телеграм.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild className="bg-gradient-primary text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-6 h-6 mr-3" />
                Создать первый стикер бесплатно
              </a>
            </Button>
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-semibold mt-2">
              <div className="relative flex items-center justify-center w-8 h-8 bg-primary/10 rotate-45 border border-primary/30 rounded-sm">
                <span className="-rotate-45 text-primary text-xs font-bold">15</span>
              </div>
              <span>бесплатно — хватит на 2 анимации</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mb-14">
            <a href="#generator" className="inline-flex items-center gap-2 text-md text-primary hover:underline font-bold group">
              Попробовать сейчас
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>

        {/* НИЖНИЙ БЛОК: СТИЛИ (ОСТАВЛЯЕМ ТОЛЬКО ЕГО И ПОДНИМАЕМ) */}
        <ScrollReveal delay={400}>
          <div className="space-y-12">
            {/* КРУПНЫЙ ЗАГОЛОВОК СТИЛЕЙ */}
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-foreground">
              Один персонаж — пять стилей
            </h2>
            
            {/* СТИЛИ В ОДНУ ЛИНИЮ */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-4">
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] overflow-hidden border-2 border-primary/20 shadow-2xl transition-transform hover:scale-105">
                   <img src={originalImg} alt="Оригинал" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Оригинал</span>
              </div>
              
              <div className="text-primary/40 text-4xl font-light select-none">→</div>

              {[
                { name: "3D Pixar", img: demoPixar },
                { name: "GTA Style", img: demoGta },
                { name: "Miyazaki", img: demoGhibli },
                { name: "Cyberpunk", img: demoCyberpunk },
                { name: "Line Art", img: demoLineart }
              ].map((style, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
                  <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-[32px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-xl transition-all hover:scale-110">
  <img 
    src={style.img} 
    alt={style.name} 
    className="w-full h-full object-cover" 
    onError={(e) => {
      // Это на случай, если картинка не найдется - она не будет пустой
      e.currentTarget.style.backgroundColor = '#2D2D2D';
    }}
  />
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
