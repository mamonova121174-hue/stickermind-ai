import { useState } from "react";
import { Camera, Palette, Rocket, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import stylePixar from "@/assets/style-3d-pixar.png";
import styleGta from "@/assets/style-gta.png";
import styleGhibli from "@/assets/style-ghibli.png";
import styleCyberpunk from "@/assets/style-cyberpunk.png";
import styleLineart from "@/assets/style-lineart.png";

const previewStyles = [
  { id: "pixar", name: "3D Pixar", image: stylePixar },
  { id: "gta", name: "GTA", image: styleGta },
  { id: "ghibli", name: "Miyazaki", image: styleGhibli },
  { id: "cyberpunk", name: "Cyberpunk", image: styleCyberpunk },
  { id: "lineart", name: "Line Art", image: styleLineart },
];

const goldenReactions = [
  { emoji: "👋", label: "Привет" },
  { emoji: "👌", label: "Окей" },
  { emoji: "👍", label: "Лайк" },
  { emoji: "🫶", label: "Любовь" },
  { emoji: "🤦‍♂️", label: "Фейспалм" },
  { emoji: "💻", label: "Работаю" },
  { emoji: "😤", label: "Злюсь" },
  { emoji: "🤔", label: "Думаю" },
  { emoji: "💰", label: "Успех" },
  { emoji: "🎉", label: "Ура!" },
  { emoji: "😴", label: "Сплю" },
  { emoji: "😮", label: "Шок" },
  { emoji: "⚖️", label: "Закон" },
  { emoji: "💪", label: "Вперёд" },
  { emoji: "🙋", label: "Пока" },
];

const AnimatedArrow = () => (
  <div className="hidden lg:flex items-center justify-center shrink-0 w-12">
    <div className="flex items-center gap-0.5 text-primary/40 animate-pulse-arrow">
      <ChevronRight className="w-5 h-5" />
      <ChevronRight className="w-5 h-5 -ml-3" />
    </div>
  </div>
);

const HowItWorksSection = () => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  return (
    <section className="py-10 scroll-mt-20 overflow-hidden">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-3"
            style={{ textWrap: "balance" }}
          >
            Путь к идеальному стикерпаку
          </h2>
          <p className="text-muted-foreground text-center mb-14 text-sm max-w-md mx-auto">
            Три простых шага — от селфи до живого стикерпака в Telegram
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
          {/* Step 1 */}
          <ScrollReveal delay={0} className="flex-1">
            <div className="surface-elevated rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider">Шаг 1</span>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                    Загрузи селфи 👋
                  </h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Загрузи одно фото — нейросеть запомнит твоё лицо и создаст уникальную основу для всех стикеров.
              </p>
              <div className="mt-auto rounded-xl bg-secondary/50 border border-border/50 p-4 flex items-center justify-center min-h-[120px]">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary/60" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold animate-bounce">
                    +
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <AnimatedArrow />

          {/* Step 2 */}
          <ScrollReveal delay={150} className="flex-1">
            <div className="surface-elevated rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider">Шаг 2</span>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                    Выбери стиль 🎨
                  </h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Выбирай из 5 премиум-стилей: GTA, Pixar, Miyazaki, Cyberpunk и Line Art.
              </p>
              <div className="mt-auto grid grid-cols-5 gap-1.5">
                {previewStyles.map((style) => (
                  <div
                    key={style.id}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredStyle(style.id)}
                    onMouseLeave={() => setHoveredStyle(null)}
                  >
                    <div
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        hoveredStyle === style.id
                          ? "border-primary scale-110 z-10 shadow-lg shadow-primary/20"
                          : "border-border/30 hover:border-primary/40"
                      }`}
                    >
                      <img
                        src={style.image}
                        alt={`Стиль ${style.name}`}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          hoveredStyle === style.id ? "scale-110 rotate-2" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-foreground whitespace-nowrap bg-card px-1.5 py-0.5 rounded border border-border/50 shadow-sm transition-all duration-200 ${
                        hoveredStyle === style.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                      }`}
                    >
                      {style.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <AnimatedArrow />

          {/* Step 3 */}
          <ScrollReveal delay={300} className="flex-1">
            <div className="surface-elevated rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider">Шаг 3</span>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                    Оживи и скачай! 🚀
                  </h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Добавь анимацию одним кликом и экспортируй живой пак прямо в Telegram.
              </p>
              <div className="mt-auto grid grid-cols-5 gap-1.5">
                {goldenReactions.map((r, i) => (
                  <div
                    key={r.label}
                    className="group relative flex flex-col items-center"
                  >
                    <div
                      className="w-full aspect-square rounded-lg bg-secondary/60 border border-border/30 flex items-center justify-center text-lg cursor-default hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 hover:scale-110"
                      style={{
                        animation: `golden-bounce 2s ease-in-out ${i * 0.13}s infinite`,
                      }}
                    >
                      {r.emoji}
                    </div>
                    <span className="text-[8px] text-muted-foreground/60 mt-0.5 truncate w-full text-center">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
