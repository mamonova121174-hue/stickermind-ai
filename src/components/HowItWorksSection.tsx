import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import originalPhoto from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const previewStyles = [
  { id: "pixar", name: "3D Pixar", image: demoPixar, emotion: "Привет" },
  { id: "gta", name: "GTA", image: demoGta, emotion: "Лайк" },
  { id: "ghibli", name: "Miyazaki", image: demoGhibli, emotion: "Думаю" },
  { id: "cyberpunk", name: "Cyberpunk", image: demoCyberpunk, emotion: "Злюсь" },
  { id: "lineart", name: "Line Art", image: demoLineart, emotion: "Любовь" },
];



const HowItWorksSection = () => {
  return (
    <section className="py-10 scroll-mt-20 overflow-hidden">
      <div className="container max-w-6xl">
        <ScrollReveal delay={100}>
          <div className="mt-14">
            <h3 className="font-display text-lg sm:text-xl font-bold text-center mb-2" style={{ textWrap: "balance" }}>
              Один персонаж — пять стилей
            </h3>
            <p className="text-xs text-muted-foreground text-center mb-8 max-w-sm mx-auto">
              Посмотри, как одно фото превращается в уникальных персонажей на прозрачном фоне
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

              {/* Style results grid - transparent stickers */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {previewStyles.map((style) => (
                  <div key={style.id} className="flex flex-col items-center gap-1.5 group">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-border/50 shadow-md transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:scale-105 bg-secondary/30"
                    >
                      <img src={style.image} alt={`Стикер в стиле ${style.name}`} className="w-full h-full object-contain" />
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
