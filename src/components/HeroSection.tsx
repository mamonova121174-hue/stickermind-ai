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
  return (
    <section className="relative min-h-screen pt-16 pb-20 px-4 bg-[#0a0a0c] text-white overflow-hidden font-display">
      <div className="container max-w-7xl mx-auto flex flex-col items-center relative z-10 text-center">
        
        {/* --- ЭКРАН 1: ГЛАВНЫЙ ОФФЕР (ВОЗВРАЩЕН) --- */}
        <ScrollReveal>
          <div className="mb-20 mt-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-[0.9] tracking-tighter">
              Создавай свои <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">стикеры</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Создай стикерпак в 5 премиум стилях за 30 секунд. <br/>
              Загрузи фото — получи уникальные наборы для Телеграм и МАКС.
            </p>
            <div className="flex flex-col items-center gap-5">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-16 px-12 rounded-[24px] text-xl font-black shadow-[0_20px_40px_rgba(168,85,247,0.3)] hover:scale-105 transition-all border-none uppercase group">
                <a href="#generator" className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> <span>Создать бесплатно</span>
                </a>
              </Button>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <span className="text-purple-400 flex items-center gap-1 font-bold"><Coins className="w-3 h-3" /> 15</span> МОНЕТ БЕСПЛАТНО ПРИ РЕГИСТРАЦИИ
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* --- ЭКРАН 2: ОДИН ПЕРСОНАЖ — 5 СТИЛЕЙ --- */}
        <div className="w-full mb-32">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-10">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">5 стилей</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 flex items-center gap-2 italic">⚡️ Стикеры для Telegram</span>
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 flex items-center gap-2 italic">🤖 Создай стикер для МАКС</span>
            </div>
          </ScrollReveal>
          <div className="flex flex-row items-center justify-center gap-6 w-full px-4 overflow-x-auto no-scrollbar py-8">
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-[36px] overflow-hidden border-2 border-purple-500/50 bg-card/50 shadow-2xl"><img src={originalImg} className="w-full h-full object-cover" /></div>
              <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest italic font-bold">Original</span>
            </div>
            <ArrowRight className="text-purple-500/30 w-10 h-10 shrink-0" />
            <div className="flex flex-row items-center gap-5 shrink-0">
              {[ {img: demoPixar, n: "Pixar"}, {img: demoGta, n: "GTA"}, {img: demoGhibli, n: "Miyazaki"}, {img: demoCyberpunk, n: "Cyberpunk"}, {img: demoLineart, n: "Line Art"} ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-[36px] overflow-hidden border border-white/10 bg-card/50 shadow-2xl hover:scale-110 hover:border-purple-500/50 transition-all duration-500"><img src={s.img} className="w-full h-full object-cover" /></div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest italic">{s.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* --- ЭКРАН 3: ИНСТРУКЦИЯ 01-03 --- */}
        <div className="mb-32 w-full max-w-6xl mx-auto px-6 text-left">
          <ScrollReveal><h2 className="text-4xl md:text-5xl font-black uppercase mb-20 text-center tracking-tighter">Как сделать <span className="text-purple-500">свой стикер</span> за 30 секунд?</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { s: "01", t: "Загрузи фото", d: "Чтобы сделать стикерпак в тг, выбери селфи. ИИ удалит фон автоматически.", i: "📸" },
              { s: "02", t: "Выбери стили", d: "Создавай премиум стикеры в одном стиле или выбирай разные для каждой эмоции.", i: "🎨" },
              { s: "03", t: "Забирай пак", d: "Сгенерируй анимированные стикеры и добавь их в Telegram или МАКС в один клик.", i: "🚀" }
            ].map((item, idx) => (
              <div key={idx} className="relative p-12 rounded-[48px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-xl shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-end">
                <div className="absolute -right-8 -top-6 text-[180px] font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-purple-500/10 transition-all italic">{item.s}</div>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[20px] flex items-center justify-center text-4xl mb-8 border border-white/5 relative z-10">{item.i}</div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight relative z-10">{item.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium relative z-10">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- ЭКРАН 4: ГЕНЕРАТОР --- */}
        <div id="generator" className="w-full max-w-6xl mb-32 p-12 bg-white/[0.01] border border-white/10 rounded-[56px] backdrop-blur-3xl relative overflow-hidden text-left">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-14 text-center">Создать <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">стикер</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <label className="text-[11px] font-black uppercase text-purple-500 tracking-[0.3em] ml-2 italic font-bold uppercase">1. Загрузка фото</label>
              <div className="flex-1 min-h-[300px] border-2 border-dashed border-purple-500/20 rounded-[36px] flex flex-col items-center justify-center gap-5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group cursor-pointer shadow-inner">
                <div className="text-5xl group-hover:scale-110 transition-transform">📤</div>
                <span className="font-black text-[10px] uppercase italic opacity-40 tracking-widest text-center px-6">Нажмите для загрузки селфи</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-5">
              <label className="text-[11px] font-black uppercase text-purple-500 tracking-[0.3em] ml-2 italic font-bold uppercase">2. Выбор стиля</label>
              <div className="grid grid-cols-3 gap-3">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-[24px] overflow-hidden border-2 border-white/5 hover:border-purple-500/60 transition-all cursor-pointer shadow-xl group">
                    <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-5">
              <label className="text-[11px] font-black uppercase text-purple-500 tracking-[0.3em] ml-2 italic font-bold uppercase">3. Эмоции</label>
              <div className="grid grid-cols-4 gap-3 p-5 bg-black/40 rounded-[36px] border border-white/5 shadow-2xl">
                {['😊','😎','😡','😱','😭','🤩','🤔','🔥','😇','🤡','🤮','😴','👍','❤️','👀','✨'].map(e => <button key={e} className="text-2xl hover:scale-125 transition-all">{e}</button>)}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-14">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-20 px-16 text-2xl font-black rounded-[28px] shadow-[0_20px_50px_rgba(168,85,247,0.4)] hover:scale-105 transition-all border-none uppercase italic tracking-tighter">
              <Sparkles className="w-8 h-8 mr-4" /> Создать стикерпак
            </Button>
          </div>
        </div>

        {/* --- ЭКРАН 5: ПОЛНЫЙ SEO FAQ --- */}
        <div className="w-full max-w-4xl mx-auto text-left mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-16 text-center tracking-tighter">Частые вопросы</h2>
          <Accordion type="single" collapsible className="w-full space-y-5">
            <AccordionItem value="1" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 transition-all hover:border-purple-500/30 border">
              <AccordionTrigger className="font-black py-7 uppercase text-xs tracking-widest hover:no-underline leading-tight">Где взять премиум стикеры тг бесплатно?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-7 text-sm leading-relaxed">
                Наш генератор — лучший способ получить <span className="text-white font-bold italic underline">премиум стикер тг</span> из фото. Вы узнаете, <span className="text-purple-400 font-bold uppercase">как сделать стикерпак в тг</span> за 30 секунд. Результат в формате WebP.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 border transition-all hover:border-purple-500/30">
              <AccordionTrigger className="font-black py-7 uppercase text-xs tracking-widest hover:no-underline leading-tight">Как создать стикеры в МАКС?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-7 text-sm leading-relaxed">
                Чтобы <span className="text-white font-bold italic underline">создать стикеры в макс</span>, загрузите фото и выберите стиль. Готовый файл отправьте в официальный бот мессенджера <span className="text-purple-400 font-bold uppercase tracking-widest">МАКС</span>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 border transition-all hover:border-purple-500/30">
              <AccordionTrigger className="font-black py-7 uppercase text-[10px] tracking-widest text-gray-500 italic hover:no-underline leading-tight">Privacy: хранятся ли мои фото на сервере?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-7 text-sm">Ваши исходные селфи <span className="text-white font-bold uppercase underline">удаляются автоматически</span> сразу после создания пака. Мы не храним личные данные.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="4" className="border-white/10 bg-white/[0.02] rounded-[32px] px-8 border-purple-500/50 bg-purple-500/5 shadow-xl">
              <AccordionTrigger className="font-black py-7 uppercase text-xs text-purple-400 italic hover:no-underline flex items-center gap-3">🎁 Как получить подарок за отзыв?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-7 text-sm">
                Оставьте отзыв и получите бонусные токены на баланс! <br/>
                <a href="/dashboard" className="inline-block mt-4 px-6 py-2 bg-purple-500/20 text-purple-400 rounded-xl font-black uppercase text-[10px] tracking-widest border border-purple-500/30 hover:bg-purple-500/40 transition-all">В личный кабинет →</a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
