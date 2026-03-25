import { Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

// Твои правильные картинки
import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden px-4">
      <div className="container relative z-10 text-center max-w-5xl">
        
        {/* ВЕРХНИЙ БЛОК: ТЕКСТ И КНОПКА */}
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight mb-8 uppercase">
            Создавай свои стикеры
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
            Создай стикерпак в 5 премиум стилях за 30 сек.<br />
            Загрузи фото — получи стикеры для Телеграм.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-4 mb-8">
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
          <div className="mb-2">
            <a href="#generator" className="inline-flex items-center gap-2 text-md text-primary hover:underline font-bold group">
              Попробовать сейчас
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </ScrollReveal>
{/* --- СТРЕЛКА-РАЗДЕЛИТЕЛЬ --- */}
        <div className="flex justify-center -mt-8 mb-20">
          <ScrollReveal delay={300} repeat={false}>
            <div className="w-px h-20 bg-gradient-to-b from-primary/80 to-transparent shadow-glow-sm" />
          </ScrollReveal>
        </div>
        {/* МАРКЕТИНГОВЫЙ БЛОК: ОДИН ПЕРСОНАЖ — ПЯТЬ СТИЛЕЙ */}
        <div className="mt-12 mb-16 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
            Один персонаж — <span className="text-primary">пять стилей</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">
              ⚡️ Создавай стикеры для Telegram
            </span>
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">
              🎨 Сделай стикерпак для WhatsApp
            </span>
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">
              🤖 Сгенерируй стикеры по фото
            </span>
          </div>

          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Посмотри, как одно фото превращается в уникальных персонажей на прозрачном фоне. 
            StickerMind создаст идеальный пак для твоих мессенджеров за 30 секунд.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 group">
          <div className="w-full max-w-[320px] aspect-square rounded-[40px] overflow-hidden border-4 border-primary/20 bg-card shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:scale-105">
            <img 
              src={originalImg} 
              alt="Original" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-primary/60">Твой оригинал</span>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: СЕТКА 5 СТИЛЕЙ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { name: "3D Pixar", img: demoPixar },
            { name: "GTA Style", img: demoGta },
            { name: "Miyazaki", img: demoGhibli },
            { name: "Cyberpunk", img: demoCyberpunk },
            { name: "Line Art", img: demoLineart },
          ].map((style, i) => (
            <div key={i} className="group flex flex-col items-center gap-3">
              <div className="w-full aspect-square rounded-[32px] overflow-hidden border-2 border-primary/10 bg-card/50 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-primary/20">
                <img 
                  src={style.img} 
                  alt={style.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                {style.name}
              </span>
            </div>
          ))}
          
          {/* Пустая шестая ячейка для красоты сетки на десктопе */}
          <div className="hidden sm:flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-primary/5 bg-primary/5 p-4">
            <span className="text-[10px] font-bold text-primary/40 uppercase text-center">И еще 10+ стилей</span>
          </div>
        </div>

      </div>
    </ScrollReveal>

      </div>
    </section>
  );
};

export default HeroSection;
