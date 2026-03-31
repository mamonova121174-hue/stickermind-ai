import { Film, Sparkles, Zap, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import ChromaKeyVideo from "./ChromaKeyVideo";
import { useTokens } from "@/components/TokenContext";

// ... твои импорты демо-картинок ...

const AnimatedStickersSection = ({ results }: { results: string[] | null }) => {
  const { balance } = useTokens();

  return (
    <section className="py-20 scroll-mt-20 overflow-hidden mt-10">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-10 text-center">
             <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Film className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Анимированные стикеры
                </h2>
             </div>
             <p className="text-muted-foreground text-sm max-w-lg mx-auto">
               Оживите свой стикерпак — каждый персонаж двигается и выражает эмоции
             </p>
          </div>
        </ScrollReveal>

        {/* Сетка стикеров (результаты пользователя или демо) */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
          {/* Тут будет логика отображения results, если они есть */}
          {/* Пока оставляем демо-сетку из твоего кода */}
        </div>

        {/* Кнопка и УМНЫЙ БАЛАНС */}
        <ScrollReveal delay={300}>
          <div className="text-center flex flex-col items-center gap-6">
            <Button
              className="bg-gradient-primary text-primary-foreground h-14 px-10 text-lg font-bold rounded-2xl glow-primary shadow-xl shadow-primary/20"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Film className="w-5 h-5 mr-2" />
              ХОЧУ ТАКИЕ ЖЕ СТИКЕРЫ
            </Button>
            
            {/* Вот этот блок должен быть ОДИН */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full shadow-lg backdrop-blur-md">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Ваш баланс: <span className="text-white">{balance} 🪙</span> — Анимация: 7 🪙
              </span>
            </div>
            
            {/* СТАРАЯ ПОДПИСЬ УДАЛЕНА */}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AnimatedStickersSection;
