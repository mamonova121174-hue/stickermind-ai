import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

// Импортируем картинки (проверь, что названия в папке assets совпадают)
import originalImg from "@/assets/original-hero.png"; 
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-10 overflow-hidden px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 text-center max-w-4xl">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Нейросеть нового поколения</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {/* ГЛАВНЫЙ ЗАГОЛОВОК КРУПНО */}
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Создай персональный стикерпак в 5 премиум-стилях за 30 секунд.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col items-center gap-4 mb-10">
            <Button asChild className="bg-gradient-primary text-white h-14 px-8 text-lg font-semibold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-5 h-5 mr-2" />
                Создать первый стикер бесплатно
              </a>
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-medium">
              <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-[10px] border border-border/50">15</span>
              <span>⚪ бесплатно — хватит на 2 анимации</span>
            </div>
          </div>
        </ScrollReveal>

        {/* СЕКЦИЯ С ПРИМЕРАМИ (ПОДНЯЛИ ВЫШЕ К КНОПКЕ) */}
        <ScrollReveal delay={400}>
          <div className="mt-8"> 
            {/* ТЕКСТ КРУПНЕЕ - В ПОЛОВИНУ ЗАГОЛОВКА */}
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground/90 mb-6">
              Один персонаж — пять стилей
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-10">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] overflow-hidden border-2 border-primary/20 shadow-2xl transition-transform group-hover:scale-105">
                   <img src={originalImg} alt="Оригинал" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Оригинал</span>
              </div>
              
              <div className="text-primary/40 text-3xl font-light select-none">→</div>

              {[
                { name: "3D Pixar", img: demoPixar },
                { name: "GTA Style", img: demoGta },
                { name: "Miyazaki", img: demoGhibli },
                { name: "Cyberpunk", img: demoCyberpunk },
                { name: "Line Art", img: demoLineart }
              ].map((style, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-border/50 bg-card/50 shadow-lg transition-all group-hover:scale-110 group-hover:border-primary/30">
                    <img src={style.img} alt={style.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-tighter text-muted-foreground/80">{style.name}</span>
                </div>
              ))}
            </div>

            <a href="#generator" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium transition-all">
              Попробовать сейчас <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
