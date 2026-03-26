import { Sparkles, Coins, HelpCircle } from "lucide-react";
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
  return (
    <section className="relative min-h-screen pt-16 pb-10 px-4 bg-[#0a0a0c] text-white overflow-hidden">
      <div className="container max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* ЭКРАН 1: ОФФЕР */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-tight tracking-tighter">Создавай свои стикеры</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 font-medium">Создай стикерпак в 5 премиум стилях за 30 секунд. <br/>Загрузи фото — получи уникальные стикеры для Телеграм.</p>
            <div className="flex flex-col items-center gap-4">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-14 px-10 rounded-[20px] text-xl font-black shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-all border-none uppercase">
                <a href="#generator" className="flex items-center gap-3"><Sparkles className="w-6 h-6" /> Создать бесплатно</a>
              </Button>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Coins className="w-3 h-3" /> 15</span> БЕСПЛАТНО — ХВАТИТ НА 2 ПАКА
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ЭКРАН 2: ЛИНЕЙКА СТИЛЕЙ */}
        <div className="w-full mb-32 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span></h2>
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 flex items-center gap-2 italic ring-1 ring-white/10">⚡️ Стикеры для Telegram</span>
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 flex items-center gap-2 italic ring-1 ring-white/10">🤖 Создай стикер для МАКС</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-row items-center justify-center gap-4 w-full px-4 overflow-x-auto no-scrollbar py-6">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-[32px] overflow-hidden border-2 border-purple-500/40 bg-card/50 shadow-2xl"><img src={originalImg} className="w-full h-full object-cover" /></div>
                <span className="text-[10px] font-black uppercase text-purple-400 italic tracking-widest">Твой оригинал</span>
              </div>
              <div className="text-3xl text-purple-500/40 font-black px-2">→</div>
              <div className="flex flex-row items-center gap-4 shrink-0">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-[32px] overflow-hidden border border-white/10 bg-card/50 shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ЭКРАН 3: ИНСТРУКЦИЯ 01-03 */}
        <div className="mb-32 w-full max-w-6xl mx-auto px-6">
          <ScrollReveal><h2 className="text-4xl md:text-5xl font-black uppercase mb-16 text-center">Как сделать <span className="text-primary text-shadow-glow">свой стикер</span> за 30 секунд?</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-left">
            {[
              { s: "01", t: "Загрузи фото", d: "Чтобы сделать стикерпак, выбери селфи. ИИ удалит фон.", i: "📸" },
              { s: "02", t: "Выбери стили", d: "Создавай премиум стикеры в одном стиле или выбирай разные.", i: "🎨" },
              { s: "03", t: "Забирай пак", d: "Сгенерируй анимированные стикеры и добавь их в Telegram.", i: "🚀" }
            ].map((item, idx) => (
              <div key={idx} className="relative p-10 rounded-[44px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-md shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-end">
                <div className="absolute -right-6 -top-4 text-[150px] font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-purple-500/10 transition-colors z-0 italic">{item.s}</div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner relative z-10 border border-white/5">{item.i}</div>
                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight relative z-10">{item.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium relative z-10">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ЭКРАН 4: ГЕНЕРАТОР */}
        <div id="generator" className="w-full max-w-6xl mb-32 p-10 bg-white/[0.02] border border-white/10 rounded-[48px] backdrop-blur-xl relative">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-center">Создать <span className="text-purple-500">стикер</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase text-purple-500 ml-2 tracking-widest italic font-bold">1. Ваше фото</span>
              <div className="flex-1 min-h-[280px] border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.03] transition-all group cursor-pointer shadow-inner">
                <div className="text-5xl group-hover:scale-110 transition-transform">📤</div>
                <span className="font-bold text-[10px] uppercase italic opacity-40 tracking-widest">Кликните для загрузки</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase text-purple-500 ml-2 tracking-widest italic font-bold">2. Выберите стиль</span>
              <div className="grid grid-cols-3 gap-3">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-[20px] overflow-hidden border-2 border-white/5 hover:border-purple-500/50 transition-all cursor-pointer shadow-lg group">
                    <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
                <div className="aspect-square rounded-[20px] border-2 border-dashed border-white/5 flex items-center justify-center text-[8px] font-black text-gray-700 uppercase italic leading-none">Скоро...</div>
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase text-purple-500 ml-2 tracking-widest italic font-bold">3. Эмоции</span>
              <div className="grid grid-cols-4 gap-2.5 p-4 bg-black/40 rounded-[32px] border border-white/5 shadow-inner">
                {['😊','😎','😡','😱','😭','🤩','🤔','🔥','😇','🤡','🤮','😴','👍','❤️','👀','✨'].map(e => <button key={e} className="aspect-square flex items-center justify-center text-xl hover:bg-white/10 hover:scale-125 transition-all leading-none">{e}</button>)}
              </div>
            </div>
          </div>
          <Button size="lg" className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-18 px-14 text-2xl font-black rounded-[24px] shadow-[0_10px_40px_rgba(168,85,247,0.3)] hover:scale-105 transition-all border-none uppercase italic tracking-tighter">
            <Sparkles className="w-7 h-7 mr-4" /> Создать стикерпак
          </Button>
        </div>
