import { Film, Sparkles, Zap, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import ChromaKeyVideo from "./ChromaKeyVideo";
import { useTokens } from "@/components/TokenContext";

// Импорты демо-ассетов (проверь, что пути верные)
import demoPixar from "@/assets/demo-pixar-hello-v2.png"; // 
import demoPixarVideo from "@/assets/demo-pixar-hello-animated.mp4"; //
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const demoAnimatedStickers = [
  { 
    id: 1, 
    image: demoPixar, // 
    video: demoPixarVideo, // 
    label: "Привет", // [cite: 1]
    style: "Pixar", // 
    delay: 0 
  },
  { 
    id: 2, 
    image: demoGta, // [cite: 7]
    video: undefined, 
    label: "Лайк", // [cite: 1]
    style: "GTA", // [cite: 7]
    delay: 80 
  },
  { 
    id: 3, 
    image: demoGhibli, // [cite: 8]
    video: undefined, 
    label: "Думаю", // [cite: 1]
    style: "Ghibli", // [cite: 8]
    delay: 160 
  },
  { 
    id: 4, 
    image: demoCyberpunk, // [cite: 9]
    video: undefined, 
    label: "Злюсь", // [cite: 1]
    style: "Cyberpunk", // [cite: 9]
    delay: 240 
  },
  { 
    id: 5, 
    image: demoLineart, // [cite: 10]
    video: undefined, 
    label: "Любовь", // [cite: 1]
    style: "Line Art", // [cite: 10]
    delay: 320 
  },
];

const AnimatedStickersSection = () => {
  const { balance } = useTokens();

  return (
    <section className="py-16 scroll-mt-20 overflow-hidden">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Анимированные стикеры
            </h2>
          </div>
          <p className="text-center text-muted-foreground text-sm max-w-lg mx-auto mb-10">
            Оживите свой стикерпак — каждый персонаж двигается и выражает эмоции в формате MP4
          </p>
        </ScrollReveal>

        {/* Ищи этот фрагмент в AnimatedStickersSection.tsx */}
<div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
  {demoAnimatedStickers.map((s) => (
    <ScrollReveal key={s.id} delay={s.delay}>
      <div className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
        
        {/* ВОТ ЭТОТ БЛОК МЫ МЕНЯЕМ (Картинка + Видео) */}
        <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden mb-2 relative">
          {/* 1. Картинка Pixar теперь всегда на фоне, чтобы не было пустоты */}
          <img
            src={s.image}
            alt={s.label}
            className={`w-full h-full object-contain animate-[sticker-float_2.5s_ease-in-out_infinite] ${
              s.video ? "absolute inset-0 z-0" : ""
            }`}
          />
          
          {/* 2. Видео накладывается сверху только если оно прописано */}
          {s.video && (
            <div className="relative z-10 w-full h-full">
              <ChromaKeyVideo
                src={s.video}
                className="w-full h-full"
                tolerance={0.38}
                softness={0.1}
              />
            </div>
          )}
        </div>

        <span className="text-[10px] font-medium text-foreground truncate w-full text-center">
          {s.label}
        </span>
        <span className="text-[8px] text-muted-foreground/60">{s.style}</span>

        {/* 3. Убираем значок MP4 только для Pixar (id: 1) */}
        {s.id !== 1 && (
          <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-primary/20 text-primary">
            MP4
          </span>
        )}
      </div>
    </ScrollReveal>
  ))}
</div>

        {/* НИЖНЯЯ ЧАСТЬ С КНОПКОЙ */}
        <ScrollReveal delay={300}>
          <div className="text-center flex flex-col items-center">
            <Button
              className="bg-gradient-primary text-primary-foreground h-11 px-8 font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-150 glow-primary"
              onClick={() => {
                document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Film className="w-4 h-4 mr-2" />
              ХОЧУ ТАКИЕ ЖЕ СТИКЕРЫ
            </Button>
            
            <div className="mt-4 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <Coins className="w-3 h-3 text-yellow-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Ваш баланс: <span className="text-white">{balance} 🪙</span> — Анимация: 7 🪙
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AnimatedStickersSection;
