import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

// Твои рабочие картинки
import originalImg from "@/assets/original-hero.png"; 
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-4xl">
        
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
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
          <div
