import { useRef } from "react";
import { Film, Sparkles, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

import animHello from "@/assets/anim-hello.png";
import animLike from "@/assets/anim-like.png";
import animThink from "@/assets/anim-think.png";
import animParty from "@/assets/anim-party.png";
import animAngry from "@/assets/anim-angry.png";
import animStrong from "@/assets/anim-strong.png";

import animCyberpunkGif from "@/assets/demo-cyberpunk-animated.gif";

const demoAnimatedStickers: { id: number; image: string; label: string; delay: number; gifUrl?: string }[] = [
  { id: 1, image: animHello, label: "Привет", delay: 0 },
  { id: 2, image: animLike, label: "Лайк", delay: 80 },
  { id: 3, image: animThink, label: "Думаю", delay: 160 },
  { id: 4, image: animParty, label: "Ура!", delay: 240 },
  { id: 5, image: animAngry, label: "Злюсь", delay: 320, gifUrl: animCyberpunkGif },
  { id: 6, image: animStrong, label: "Вперёд", delay: 400 },
];

const DemoStickerCard = ({ sticker }: { sticker: typeof demoAnimatedStickers[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden mb-2 relative bg-secondary/30">
        {sticker.videoUrl ? (
          <video
            ref={videoRef}
            src={sticker.videoUrl}
            className="w-full h-full object-contain rounded-lg"
            loop
            muted
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={sticker.image}
            alt={`Анимированный стикер ${sticker.label}`}
            className="w-full h-full object-contain animate-[sticker-float_2.5s_ease-in-out_infinite]"
          />
        )}
        {!sticker.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/40 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
            </div>
          </div>
        )}
      </div>
      <span className="text-[10px] font-medium text-foreground truncate w-full text-center">
        {sticker.label}
      </span>
      <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-primary/20 text-primary">
        {sticker.videoUrl ? "MP4" : "MP4"}
      </span>
    </div>
  );
};

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

        {/* Demo grid with real transparent stickers */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {demoAnimatedStickers.map((s) => (
            <ScrollReveal key={s.id} delay={s.delay}>
              <DemoStickerCard sticker={s} />
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
                desc: "Автоматическое удаление фона — только ваш персонаж, без квадратов",
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
