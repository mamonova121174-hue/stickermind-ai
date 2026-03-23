import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-4xl">
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-8xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild className="bg-gradient-primary text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <a href="#generator">
                <Sparkles className="w-6 h-6 mr-3" />
                Создать бесплатно
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-4"> 
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground/90 mb-4">
              Один персонаж — пять стилей
            </h3>
            <p className="text-sm text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Посмотри, как одно фото превращается в уникальных персонажей на прозрачном фоне
            </p>
            
            <a href="#generator" className="inline-flex items-center gap-2 text-md text-primary hover:underline font-bold transition-all">
              Попробовать сейчас <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
