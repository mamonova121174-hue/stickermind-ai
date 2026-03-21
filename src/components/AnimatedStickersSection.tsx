import { Film, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoPixarVideo from "@/assets/demo-pixar-hello-animated.mp4";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const demoAnimatedStickers = [
  { id: 1, image: demoPixar, video: demoPixarVideo, label: "Привет", style: "Pixar", delay: 0 },
  { id: 2, image: demoGta, video: undefined as string | undefined, label: "Лайк", style: "GTA", delay: 80 },
  { id: 3, image: demoGhibli, video: undefined as string | undefined, label: "Думаю", style: "Ghibli", delay: 160 },
  { id: 4, image: demoCyberpunk, video: undefined as string | undefined, label: "Злюсь", style: "Cyberpunk", delay: 240 },
  { id: 5, image: demoLineart, video: undefined as string | undefined, label: "Любовь", style: "Line Art", delay: 320 },
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
            и выражает эмоции в формате MP4
          </p>
        </ScrollReveal>

        {/* Demo grid — same character, different styles */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
          {demoAnimatedStickers.map((s) => (
            <ScrollReveal key={s.id} delay={s.delay}>
              <div className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden mb-2 relative">
                  {s.video ? (
                    <video
                      src={s.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  ) : (
                    <img
                      src={s.image}
                      alt={`Стикер «${s.label}» в стиле ${s.style}`}
                      className="w-full h-full object-contain animate-[sticker-float_2.5s_ease-in-out_infinite]"
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium text-foreground truncate w-full text-center">
                  {s.label}
                </span>
                <span className="text-[8px] text-muted-foreground/60">{s.style}</span>
                <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-primary/20 text-primary">
                  MP4
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
                title: "Прозрачный фон",
                desc: "Автоматическое удаление фона — только ваш персонаж",
              },
              {
                icon: Sparkles,
                title: "Премиум-качество",
                desc: "Плавные анимации с сохранением стиля и сходства лица",
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
              Создать и анимировать пак
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
