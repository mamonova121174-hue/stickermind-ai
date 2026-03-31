import { ArrowRight, Sparkles, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useTokens } from "@/components/TokenContext";

import originalPhoto from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const previewStyles = [
  { id: "pixar", name: "3D Pixar", image: demoPixar },
  { id: "gta", name: "GTA", image: demoGta },
  { id: "ghibli", name: "Miyazaki", image: demoGhibli },
  { id: "cyberpunk", name: "Cyberpunk", image: demoCyberpunk },
  { id: "lineart", name: "Line Art", image: demoLineart },
];

const HowItWorksSection = () => {
  const { balance } = useTokens();

  return (
    <section className="py-10 scroll-mt-20 overflow-hidden">
      <div className="container max-w-6xl">
        <ScrollReveal delay={100}>
          <div className="mt-14">
            <h3 className="font-display text-lg sm:text-xl font-bold text-center mb-2 uppercase tracking-tight text-white">
              Один персонаж — пять стилей
            </h3>
            <p className="text-xs text-muted-foreground text-center mb-8 max-w-sm mx-auto">
              Посмотри, как одно фото превращается в уникальных персонажей на прозрачном фоне
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center mb-20">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                  <img src={originalPhoto} alt="Оригинал" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Оригинал</span>
              </div>
              <div className="flex items-center text-primary/50">
                <ArrowRight className="w-8 h-8 animate-pulse" />
              </div>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {previewStyles.map((style) => (
                  <div key={style.id} className="flex flex-col items-center gap-1.5 group">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-border/50 transition-all group-hover:scale-105">
                      <img src={style.image} alt={style.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{style.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ИНСТРУКЦИЯ (твои маленькие карточки) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { step: "01", title: "Загрузи фото", desc: "Выбери селфи. ИИ удалит фон.", icon: "📸" },
                { step: "02", title: "Выбери стили", desc: "Создавай в одном или разных стилях.", icon: "🎨" },
                { step: "03", title: "Забирай пак", desc: "Добавляй в Telegram в один клик.", icon: "🚀" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-card/40 border border-border/50 text-left relative overflow-hidden group hover:border-primary/50 transition-all">
                  <span className="absolute right-4 top-4 text-4xl font-black opacity-5 group-hover:opacity-10">{item.step}</span>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="text-sm font-bold text-white uppercase mb-1">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* КНОПКА С БАЛАНСОМ */}
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-14 px-10 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                СОЗДАТЬ СТИКЕРПАК
              </Button>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <Coins className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Ваш баланс: <span className="text-white">{balance} 🪙</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorksSection;
