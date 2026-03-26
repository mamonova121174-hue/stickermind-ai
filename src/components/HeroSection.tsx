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
  return (
    <section className="relative min-h-screen pt-16 pb-20 px-4 bg-[#0a0a0c] text-white">
      <div className="container max-w-7xl mx-auto flex flex-col items-center">
        
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-tight">Создавай свои <span className="text-purple-500">стикеры</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-medium italic underline">Создай стикерпак в 5 премиум стилях за 30 секунд.</p>
            <Button asChild className="bg-gradient-to-r from-indigo-600 to-pink-600 h-14 px-10 rounded-2xl font-bold uppercase border-none"><a href="#generator">Создать бесплатно</a></Button>
          </div>
        </ScrollReveal>

        <div className="w-full mb-32 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-10 italic">Один персонаж — <span className="text-purple-500 underline">5 стилей</span></h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-5 py-2 bg-purple-600 rounded-full text-[10px] font-black uppercase italic tracking-widest">⚡️ Стикеры для Telegram</span>
            <span className="px-5 py-2 bg-purple-600 rounded-full text-[10px] font-black uppercase italic tracking-widest">🤖 Создай стикер для МАКС</span>
          </div>
          <div className="flex items-center justify-center gap-6 overflow-x-auto no-scrollbar py-6">
             <div className="shrink-0 flex flex-col items-center gap-2">
                <img src={originalImg} className="w-40 h-40 rounded-[32px] border-2 border-purple-500/50 shadow-2xl" alt="orig" />
                <span className="text-[10px] font-black uppercase text-purple-400 italic">Original</span>
             </div>
             <ArrowRight className="text-purple-500/30 w-8 h-8 shrink-0" />
             <div className="flex gap-4">
               {styles.map((img, i) => (
                 <div key={i} className="w-40 h-40 rounded-[32px] border border-white/10 overflow-hidden hover:scale-110 transition-transform"><img src={img} className="w-full h-full object-cover" alt="s" /></div>
               ))}
             </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 w-full max-w-6xl text-left">
          {[
            { s: "01", t: "Загрузи фото", d: "Чтобы сделать стикерпак в тг, выбери селфи. ИИ удалит фон.", i: "📸" },
            { s: "02", t: "Выбери стили", d: "Создавай премиум стикеры в одном или разных стилях.", i: "🎨" },
            { s: "03", t: "Забирай пак", d: "Добавь в Telegram или МАКС в один клик.", i: "🚀" }
          ].map((item, idx) => (
            <div key={idx} className="relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 overflow-hidden min-h-[280px] flex flex-col justify-end">
              <div className="absolute -right-4 -top-4 text-[120px] font-black text-white/[0.02] italic leading-none">{item.s}</div>
              <div className="text-4xl mb-6 relative z-10">{item.i}</div>
              <h3 className="text-2xl font-black mb-2 uppercase relative z-10 font-display">{item.t}</h3>
              <p className="text-gray-400 text-sm relative z-10 font-display">{item.d}</p>
            </div>
          ))}
        </div>

        <div id="generator" className="w-full max-w-6xl mb-32 p-10 bg-white/[0.02] border border-white/10 rounded-[48px] backdrop-blur-xl text-center">
          <h2 className="text-4xl font-black uppercase mb-12">Создать <span className="text-purple-500">стикер</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left italic font-bold">
            <div className="lg:col-span-4 h-64 border-2 border-dashed border-purple-500/20 rounded-[32px] flex items-center justify-center opacity-40 uppercase text-[10px] bg-white/[0.01]">Загрузить фото 📤</div>
            <div className="lg:col-span-5 grid grid-cols-3 gap-2">
              {styles.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border-2 border-white/5 bg-black/20 hover:border-purple-500/50 transition-all"><img src={img} className="w-full h-full object-cover opacity-60" alt="s" /></div>
              ))}
            </div>
            <div className="lg:col-span-3 p-4 bg-black/40 rounded-[32px] border border-white/5 grid grid-cols-4 gap-2 h-fit">
              {['😊','😎','😡','😱','😭','🤩','🤔','🔥','😇','🤡','🤮','😴','👍','❤️','👀','✨'].map(e => (
                <button key={e} className="text-xl hover:scale-125 transition-transform">{e}</button>
              ))}
            </div>
          </div>
          <Button size="lg" className="mt-12 bg-gradient-to-r from-indigo-600 to-pink-600 h-16 px-12 text-xl font-black rounded-2xl border-none shadow-2xl uppercase tracking-tighter">СОЗДАТЬ СТИКЕРПАК</Button>
        </div>
        <div className="w-full max-w-4xl mx-auto text-left mb-20 px-4">
          <h2 className="text-4xl font-black uppercase mb-12 text-center font-display tracking-tight">FAQ</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="1" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 border transition-all hover:border-purple-500/30 font-display">
              <AccordionTrigger className="font-black py-6 uppercase text-xs tracking-widest hover:no-underline leading-tight">Где взять премиум стикеры тг бесплатно?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6 text-sm leading-relaxed">
                Наш генератор — способ получить <span className="text-white font-bold italic underline">премиум стикер тг</span>. Вы узнаете, как сделать стикерпак в тг (телеграм) за 30 секунд.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 border transition-all hover:border-purple-500/30 font-display">
              <AccordionTrigger className="font-black py-6 uppercase text-xs tracking-widest hover:no-underline leading-tight">Как сделать стикеры в МАКС?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6 text-sm leading-relaxed">
                Чтобы <span className="text-white font-bold italic underline">создать стикеры в макс</span>, загрузите фото и выберите стиль. Готовый ВебП файл отправьте в бот мессенджера <span className="text-purple-400 font-black uppercase">МАКС</span>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 border-purple-500/50 bg-purple-500/5 shadow-xl font-display">
              <AccordionTrigger className="font-black py-6 uppercase text-xs text-purple-400 italic hover:no-underline flex items-center gap-2 leading-tight">🎁 Подарок за отзыв</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6 text-sm">
                Оставьте отзыв и получите токены! <br/>
                <a href="/dashboard" className="inline-block mt-4 text-white font-black uppercase text-[10px] underline hover:text-purple-400 transition-colors tracking-widest italic">Личный кабинет →</a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
