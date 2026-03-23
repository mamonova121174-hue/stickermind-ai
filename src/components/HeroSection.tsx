import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-4xl">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Нейросеть нового поколения</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
            Нейро-стикеры по фото:<br />твоё лицо — твой бренд
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Создай персональный стикерпак в 5 премиум-стилях за 30 секунд.<br />
            Загрузи фото — получи уникальные стикеры для Telegram.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col items-center gap-4">
            <Button asChild className="bg-primary text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-6 h-6 mr-3" />
                Создать первый стикер бесплатно
              </a>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/60 font-medium mt-4">
              <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] border border-border/50 font-bold">15</span>
              <span>⚪ бесплатно — хватит на 2 анимации</span>
            </div>
            <a href="#generator" className="inline-flex items-center gap-2 text-md text-primary hover:underline mt-6 font-bold">
              Попробовать сейчас <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
