import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 text-center max-w-3xl">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-medium text-muted-foreground">Нейросеть нового поколения</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6" style={{ textWrap: "balance" }}>
            Нейро-стикеры по фото: твоё лицо — твой бренд
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed" style={{ textWrap: "pretty" }}>
            Создай персональный стикерпак в 5 премиум-стилях за 30 секунд.
            Загрузи фото — получи уникальные стикеры для Telegram.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-primary text-primary-foreground h-13 px-8 text-base font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-150 glow-primary"
            >
              <a href="#generator">
                <Sparkles className="w-5 h-5 mr-2" />
                Создать первый стикер бесплатно
              </a>
            </Button>
            <p className="text-xs text-muted-foreground/60">
              15 🪙 бесплатно — хватит на 2 анимации
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <a
            href="#generator"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors duration-200 mt-8"
          >
            Попробовать сейчас
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
