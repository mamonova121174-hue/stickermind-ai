import { Sparkles, Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  const styles = [demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart];
  const steps = [
    { s: "01", t: "Загрузи фото", d: "ИИ удалит фон автоматически.", i: "📸" },
    { s: "02", t: "Выбери стили", d: "Создавай премиум стикеры в разных стилях.", i: "🎨" },
    { s: "03", t: "Забирай пак", d: "Добавь в Telegram или МАКС в один клик.", i: "🚀" }
  ];

  return (
    <section className="relative min-h-screen pt-16 pb-20 px-4 bg-[#0a0a0c] text-white">
      <div className="container max-w-7xl mx-auto flex flex-col items-center">
        
        {/* БЛОК 1: ОФФЕР */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-tight">Создавай свои <span className="text-purple-500">стикеры</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">Создай стикерпак в 5 премиум стилях за 30 секунд.</p>
            <Button asChild className="bg-gradient-to-r from-indigo-600 to-pink-600 h-14 px-10 rounded-2xl font-bold uppercase border-none">
              <a href="#generator">Создать бесплатно</a>
            </Button>
          </div>
        </ScrollReveal>

        {/* БЛОК 2: ЛИНЕЙКА */}
        <div className="w-full mb-32 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-10">Один персонаж — <span className="text-purple-500">5 стилей</span></h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-5 py-2 bg-purple-600 rounded-full text-[10px] font-black uppercase italic">⚡️ Стикеры для Telegram</span>
            <span className="px-5 py-2 bg-purple-600 rounded-full text-[10px] font-black uppercase italic">🤖 Создай стикер для МАКС</span>
          </div>
          <div className="flex items-center justify-center gap-6 overflow-x-auto no-scrollbar py-4">
             <div className="shrink-0 flex flex-col items-center gap-2">
                <img src={originalImg} className="w-32 h-32 md:w-40 md:h-40 rounded-[28px] border-2 border-purple-500/50" alt="orig" />
                <span className="text-[10px] font-black uppercase text-purple-400 italic">Original</span>
             </div>
             <ArrowRight className="text-purple-500/30 w-8 h-8 shrink-0" />
             {styles.map((img, i) => (
               <img key={i} src={img} className="w-32 h-32 md:w-40 md:h-40 rounded-[28px] border border-white/10 shrink-0" alt="style" />
             ))}
          </div>
        </div>

        {/* БЛОК 3: ШАГИ 01-03 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 w-full max-w-6xl text-left">
          {steps.map((item, idx) => (
            <div key={idx} className="relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 overflow-hidden min-h-[280px] flex flex-col justify-end">
              <div className="absolute -right-4 -top-4 text-[120px] font-black text-white/[0.02] italic leading-none">{item.s}</div>
              <div className="text-4xl mb-6 relative z-10">{item.i}</div>
              <h3 className="text-2xl font-black mb-2 uppercase relative z-10">{item.t}</h3>
              <p className="text-gray-400 text-sm relative z-10">{item.d}</p>
            </div>
          ))}
        </div>

        {/* БЛОК 4: ГЕНЕРАТОР */}
        <div id="generator" className="w-full
