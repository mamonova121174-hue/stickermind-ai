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
  const styles = [
    { i: demoPixar, n: "Pixar 3D" },
    { i: demoGta, n: "GTA Style" },
    { i: demoGhibli, n: "Miyazaki" },
    { i: demoCyberpunk, n: "Cyberpunk" },
    { i: demoLineart, n: "Line Art" }
  ];

  return (
    <section className="relative min-h-screen pt-20 pb-20 px-4 bg-[#0a0a0c] text-white overflow-hidden font-display">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto flex flex-col items-center relative z-10 text-center">
        
        {/* ЭКРАН 1: ГЛАВНЫЙ ОФФЕР */}
        <ScrollReveal>
          <div className="mb-24">
            <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 leading-[0.85] tracking-tighter">
              Создавай свои <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]">стикеры</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Создай стикерпак в 5 премиум стилях за 30 секунд. <br/>
              Загрузи фото — получи уникальные наборы для <span className="text-white italic">Телеграм</span> и <span className="text-purple-400 italic">МАКС</span>.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-20 px-16 rounded-[32px] text-2xl font-black shadow-[0_20px_50px_rgba(168,85,247,0.4)] hover:scale-105 transition-all border-none uppercase italic group">
                <a href="#generator" className="flex items-center gap-4">
                  <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" /> 
                  <span>Создать бесплатно</span>
                </a>
              </Button>
              <div className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                <span className="text-purple-400 flex items-center gap-2"><Coins className="w-4 h-4" /> 15</span> 
                БЕСПЛАТНО — ХВАТИТ НА 2 АНИМАЦИИ
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ЭКРАН 2: ЛИНЕЙКА СТИЛЕЙ */}
        <div className="w-full mb-32">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tight">
            Один персонаж — <span className="text-purple-500 underline decoration-purple-500/30 underline-offset-8">5 стилей</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <span className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest italic hover:bg-purple-600 transition-colors cursor-default shadow-xl">⚡️ Стикеры для Telegram</span>
            <span className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest italic hover:bg-purple-600 transition-colors cursor-default shadow-xl">🤖 Создай стикер для МАКС</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-8 w-full px-4 overflow-x-auto no-scrollbar py-10">
            <div className="shrink-0 flex flex-col items-center gap-5">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-[48px] border-2 border-purple-500/50 shadow-2xl overflow-hidden">
                <img src={originalImg} className="w-full h-full object-cover" alt="orig" />
              </div>
              <span className="text-[11px] font-black uppercase text-purple-400 tracking-[0.3em] italic">Original</span>
            </div>
            <ArrowRight className="text-purple-500/20 w-12 h-12 shrink-0 mx-4" />
            <div className="flex gap-6">
              {styles.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-5 shrink-0">
                  <div className="w-44 h-44 md:w-52 md:h-52 rounded-[48px] border border-white/10 overflow-hidden shadow-2xl">
                    <img src={s.i} className="w-full h-full object-cover" alt="style" />
                  </div>
                  <span className="text-[11px] font-black uppercase text-gray-600 tracking-widest italic uppercase">{s.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ЭКРАН 3: ИНСТРУКЦИЯ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32 w-full max-w-6xl text-left px-4">
          {[
            {s:"01", t:"Загрузи фото", d:"Чтобы сделать стикерпак в тг, выбери качественное селфи. ИИ удалит фон автоматически.", i:"📸"},
            {s:"02", t:"Выбери стили", d:"Создавай премиум стикеры в одном стиле или выбирай разные для каждой эмоции.", i:"🎨"},
            {s:"03", t:"Забирай пак", d:"Сгенерируй анимированные стикеры и добавь их в Telegram или МАКС в один клик.", i:"🚀"}
          ].map((item, idx) => (
            <div key={idx} className="relative p-12 rounded-[60px] bg-white/[0.02] border border-white/10 min-h-[360px] flex flex-col justify-end overflow-hidden group backdrop-blur-xl">
              <div className="absolute -right-8 -top-8 text-[220px] font-black text-white/[0.02] italic leading-none">{item.s}</div>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[28px] flex items-center justify-center text-5xl mb-10 border border-white/5 relative z-10 shadow-inner">{item.i}</div>
              <h3 className="text-3xl font-black mb-5 uppercase relative z-10 tracking-tight">{item.t}</h3>
              <p className="text-gray-400 text-base leading-relaxed relative z-10 opacity-80">{item.d}</p>
            </div>
          ))}
        </div>

        {/* ЭКРАН 4: ГЕНЕРАТОР */}
        <div id="generator" className="w-full max-w-6xl mb-32 p-14 bg-white/[0.01] border border-white/10 rounded-[72px] backdrop-blur-3xl text-left relative overflow-hidden shadow-2xl">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 text-center tracking-tighter">Создать <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-shadow-glow">стикер</span></h2>
          <p className="text-gray-400 text-center mb-14 max-w-3xl mx-auto font-medium">Загрузи фото, выбери стиль и те эмодзи, с эмоциями которых ты хочешь сделать стикеры из фото.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-bold italic">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <label className="text-[12px] font-black uppercase text-purple-500 tracking-[0.5em] ml-4">1. ВАШЕ ФОТО 📤</label>
              <div className="flex-1 min-h-[350px] border-2 border-dashed border-purple-500/30 rounded-[48px] bg-white/[0.02] flex flex-col items-center justify-center gap-6 group cursor-pointer shadow-inner hover:bg-white/[0.04] transition-all">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform italic">📤</div>
                <span className="font-black text-[11px] uppercase tracking-widest opacity-60">Нажмите для загрузки</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <label className="text-[12px] font-black uppercase text-purple-500 tracking-[0.5em] ml-4">2. ВЫБЕРИТЕ СТИЛЬ 🎨</label>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((s, i) => (
                  <div key={i} className="relative aspect-square rounded-[24px] overflow-hidden border-2 border-white/5 hover:border-purple-500/60 transition-all cursor-pointer shadow-xl group">
                    <img src={s.i} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" alt="s" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-md py-1.5 text-center">
                      <span className="text-[8px] font-black uppercase tracking-tighter text-white/90">{s.n}</span>
                    </div>
                  </div>
                ))}
                <div className="aspect-square rounded-[24px] border-2 border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]"><span className="text-[8px] font-black text-gray-700 uppercase italic">Soon</span></div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-6 font-display">
              <label className="text-[12px] font-black uppercase text-purple-500 tracking-[0.5em] ml-4">3. ЭМОЦИИ ✨</label>
              <div className="grid grid-cols-4 gap-4 p-8 bg-black/40 rounded-[48px] border border-white/5 shadow-inner items-center h-full">
                {['😊','😎','😡','😱','😭','🤩','🤔','🔥','😇','🤡','🤮','😴','👍','❤️','👀','✨'].map(e => (
                  <button key={e} className="text-3xl hover:scale-150 transition-transform leading-none">{e}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-20 gap-4">
            <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 h-24 px-20 text-3xl font-black rounded-[36px] shadow-[0_30px_70px_rgba(168,85,247,0.5)] hover:scale-105 transition-all border-none uppercase italic tracking-tighter">
              <Sparkles className="w-10 h-10 mr-5" /> СОЗДАТЬ СТИКЕРПАК
            </Button>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 italic">Бесплатно — осталось 15 генераций</p>
          </div>
        </div>
        {/* ЭКРАН 5: FAQ */}
        <div className="w-full max-w-4xl mx-auto text-left mb-32 px-4">
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-20 text-center tracking-tighter italic">FAQ</h2>
          <Accordion type="single" collapsible className="w-full space-y-6">
            <AccordionItem value="1" className="border-white/10 bg-white/[0.02] rounded-[40px] px-12 border transition-all hover:border-purple-500/30">
              <AccordionTrigger className="font-black py-10 uppercase text-sm tracking-[0.2em] hover:no-underline">Где взять премиум стикеры тг бесплатно?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-10 text-base leading-relaxed">
                Наш генератор — лучший способ получить <span className="text-white font-bold italic underline">премиум стикер тг</span> из вашего фото. Вы узнаете, <span className="text-purple-400 font-bold uppercase">как сделать стикерпак в тг</span> за 30 секунд.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2" className="border-white/10 bg-white/[0.02] rounded-[40px] px-12 border transition-all hover:border-purple-500/30">
              <AccordionTrigger className="font-black py-10 uppercase text-sm tracking-[0.2em] hover:no-underline">Как сделать стикеры в МАКС и 3D лица?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-10 text-base leading-relaxed">
                Чтобы <span className="text-white font-bold italic underline text-xs">создать стикеры в макс</span>, выберите стиль. Наш <span className="text-purple-400 font-bold uppercase italic tracking-widest text-xs">3D стикер лица</span> нейросеть отрисует в объеме.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3" className="border-white/10 bg-white/[0.02] rounded-[40px] px-12 border transition-all hover:border-purple-500/30">
              <AccordionTrigger className="font-black py-10 text-[11px] uppercase text-gray-500 italic tracking-[0.3em] hover:no-underline">Privacy: Токены и Безопасность фото</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-10 text-base leading-relaxed">
                Вы получаете 15 токенов при регистрации. Ваши фото <span className="text-white font-bold underline italic underline-offset-4">удаляются автоматически</span> сразу после создания пака.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="4" className="border-white/10 bg-white/[0.02] rounded-[40px] px-12 border-purple-500/50 bg-purple-500/5 shadow-2xl">
              <AccordionTrigger className="font-black py-10 uppercase text-sm text-purple-400 italic hover:no-underline flex items-center gap-4">🎁 Подарок за отзыв</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-10 text-base flex flex-col gap-4">
                <span>Оставьте отзыв и получите бонусные токены на баланс!</span>
                <a href="/dashboard" className="w-fit px-10 py-4 bg-purple-500/20 text-purple-400 rounded-2xl font-black uppercase text-[11px] tracking-widest border border-purple-500/30 hover:bg-purple-500/40 transition-all italic underline">Личный кабинет →</a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
