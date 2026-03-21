import { Film, Sparkles, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const demoAnimatedStickers = [
  { id: 1, emoji: "👋", label: "Привет", delay: 0 },
  { id: 2, emoji: "👍", label: "Лайк", delay: 80 },
  { id: 3, emoji: "🤔", label: "Думаю", delay: 160 },
  { id: 4, emoji: "🎉", label: "Ура!", delay: 240 },
  { id: 5, emoji: "😤", label: "Злюсь", delay: 320 },
  { id: 6, emoji: "💪", label: "Вперёд", delay: 400 },
];

const AnimatedStickersSection = () => {
  return (
    <section className="py-16 scroll-mt-20 overflow-hidden">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-foreground"
              style={{ textWrap: "balance" }}
            >
              Анимированные стикеры
            </h2>
          </div>
          <p className="text-center text-muted-foreground text-sm max-w-lg mx-auto mb-10">
            Оживите свой стикерпак — каждый персонаж двигается, машет рукой
            и выражает эмоции в формате TGS / MP4
          </p>
        </ScrollReveal>

        {/* Demo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {demoAnimatedStickers.map((s) => (
            <ScrollReveal key={s.id} delay={s.delay}>
              <div className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                {/* Placeholder for future Lottie / MP4 */}
                <div className="w-full aspect-square rounded-lg bg-secondary/60 flex items-center justify-center overflow-hidden mb-2 relative animate-[sticker-float_2.5s_ease-in-out_infinite]">
                  <span className="text-4xl animate-[sticker-wobble_3s_ease-in-out_infinite]">
                    {s.emoji}
                  </span>
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/40 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-foreground truncate w-full text-center">
                  {s.label}
                </span>
                <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-primary/20 text-primary">
                  TGS
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Feature highlights */}
        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: Zap,
                title: "AI-анимация",
                desc: "Нейросеть создаёт естественные движения для каждой эмоции",
              },
              {
                icon: Film,
                title: "TGS & MP4",
                desc: "Экспорт в формат Telegram animated stickers или видео",
              },
              {
                icon: Sparkles,
                title: "Премиум-качество",
                desc: "Плавные 60 FPS анимации с сохранением стиля и сходства",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-border/30"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="text-center">
            <Button
              className="bg-gradient-primary text-primary-foreground h-11 px-8 font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-150 glow-primary"
              onClick={() => {
                document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Film className="w-4 h-4 mr-2" />
              Создать анимированный пак
            </Button>
            <p className="text-xs text-muted-foreground/50 mt-3">
              Доступно в Профи и Бизнес тарифах · 7 🪙 за анимированный стикер
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AnimatedStickersSection;
