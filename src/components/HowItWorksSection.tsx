import { useState } from "react";
import { Camera, Palette, Rocket, ChevronRight, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import stylePixar from "@/assets/style-3d-pixar.png";
import styleGta from "@/assets/style-gta.png";
import styleGhibli from "@/assets/style-ghibli.png";
import styleCyberpunk from "@/assets/style-cyberpunk.png";
import styleLineart from "@/assets/style-lineart.png";
import originalPhoto from "@/assets/original-photo.png";

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
        {/* Before → After Showcase */}
        <ScrollReveal delay={100}>
          <div className="mt-14">
            <h3 className="font-display text-lg sm:text-xl font-bold text-center mb-2" style={{ textWrap: "balance" }}>
              Один персонаж — пять стилей
            </h3>
            <p className="text-xs text-muted-foreground text-center mb-8 max-w-sm mx-auto">
              Посмотри, как одно фото превращается в уникальных персонажей
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
              {/* Original photo */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                  <img src={originalPhoto} alt="Оригинальное фото" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Оригинал</span>
              </div>

              {/* Arrow */}
              <div className="flex items-center text-primary/50">
                <ArrowRight className="w-8 h-8 animate-pulse" />
              </div>

              {/* Style results grid */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {previewStyles.map((style) => (
                  <div key={style.id} className="flex flex-col items-center gap-1.5 group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-border/50 shadow-md transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:scale-105">
                      <img src={style.image} alt={`Стиль ${style.name}`} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">{style.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorksSection;
