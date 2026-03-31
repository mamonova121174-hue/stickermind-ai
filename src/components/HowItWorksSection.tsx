import { Sparkles, Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useTokens } from "@/components/TokenContext";

import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HowItWorksSection = () => {
  const { balance } = useTokens();

  return (
    <section className="py-20 bg-[#0a0a0c]">
      <div className="container max-w-6xl">
        {/* БЛОК ЛИНЕЙКА */}
        <ScrollReveal>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-12">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>
            <div className="flex flex-row items-center justify-center gap-4">
               <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 shrink-0">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
               </div>
               <ArrowRight className="w-8 h-8 text-purple-500 animate-pulse hidden md:block" />
               <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                    <div key={i} className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border border-white/10 shrink-0 bg-card">
                      <img src={img} className="w-full h-full object-contain" alt="Стиль" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </ScrollReveal>

        {/* БЛОК ИНСТРУКЦИЯ И ФИНАЛЬНАЯ КНОПКА */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-12">
              Как сделать <span className="text-primary">свой стикер</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { step: "01", title: "Загрузи фото", desc: "Выбери селфи. ИИ удалит фон.", icon: "📸" },
                { step: "02", title: "Выбери стили", desc: "Создавай в одном стиле или в разных.", icon: "🎨" },
                { step: "03", title: "Забирай пак", desc: "Добавляй в Telegram в один клик.", icon: "🚀" }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-[36px] bg-white/[0.03] border border-white/10 text-left group hover:border-purple-500/50 transition-all">
                  <div className="absolute -right-2 -top-2 text-9xl font-black text-white/[0.03] pointer-events-none">{item.step}</div>
                  <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-3xl mb-5">{item.icon}</div>
                  <h3 className="text-xl font-black text-white mb-3 uppercase">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* ТВОЯ ЛЮБИМАЯ КНОПКА */}
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                СОЗДАТЬ СТИКЕРПАК
              </Button>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Ваш баланс: <span className="text-white">{balance} 🪙</span> — Хватит на 2 анимации
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
