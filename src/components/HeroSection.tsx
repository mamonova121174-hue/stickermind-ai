import { Sparkles, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useTokens } from "@/components/TokenContext";

// Импорты ассетов
import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  const { balance } = useTokens();

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-10 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">
        
        {/* ЭКРАН 1: ГЛАВНЫЙ */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-tight mb-4 uppercase text-white">
              Создавай свои стикеры
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-4">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <a href="#generator" className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span className="leading-none">Создать первый стикер бесплатно</span>
                </a>
              </Button>
              
              <div className="text-[10px] text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Coins className="w-3 h-3" /> {balance}
                </span>
                бесплатно — хватит на {Math.floor(balance / 7)} анимации
              </div>
            </div>
          </ScrollReveal>
        </div>

       <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-0 mb-24 p-0">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>

 {/* Сетка со стикерами */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-start relative z-10">
  {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
    <div key={i} className="flex flex-col items-center shrink-0">
      <div className="w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 bg-card/50 border-white/5 hover:border-purple-500/30 transition-all">
        <img src={img} className="w-full h-full object-cover" alt="Стиль стикера" />
      </div>
    </div>
  ))}

  {/* КНОПКА-МИГАЛКА (Шестое место) */}
  <div className="flex flex-col items-center shrink-0 sticky top-24 z-50 self-start">
    <a 
      href="#generator" 
      className="relative w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] flex flex-col items-center justify-center gap-4 overflow-hidden transition-all duration-500 bg-[#0d0d10] group"
    >
      
      {/* 1. ПУЛЬСИРУЮЩИЙ ФОН (Эффект сирены) */}
      <div className="absolute inset-0 bg-rose-600/40 animate-[pulse_1.5s_ease-in-out_infinite]" />
      
      {/* 2. БЕГУЩАЯ РАМКА (Яркая) */}
      <div className="absolute inset-0 border-2 border-dashed border-rose-500/40 rounded-[32px] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
      <div className="absolute inset-0 border-2 border-dashed border-amber-400/30 rounded-[32px]" />

      {/* 3. КОНТЕНТ (Центральный свет) */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        
        {/* Центр, который мигает красно-розовым */}
        <div className="relative">
          {/* Это слой "вспышки" */}
          <div className="absolute inset-0 rounded-full bg-rose-600 blur-[25px] animate-[pulse_0.8s_ease-in-out_infinite]" />
          
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.6)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8 text-white animate-[bounce_2s_infinite]" />
          </div>
        </div>

        {/* Текст с мерцающей тенью */}
        <span className="text-[11px] md:text-sm font-black uppercase tracking-widest text-center px-4 text-white leading-tight drop-shadow-[0_0_8px_rgba(225,29,72,0.9)] animate-pulse">
          Создать свой <br/> <span className="text-amber-400">стикер</span>
        </span>
      </div>

      {/* Автоматически бегающий блик (раз в 3 секунды) */}
      <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3s_infinite]" />
    </a>
  </div>
</div>
          </div>
        </ScrollReveal>

        {/* ЭКРАН 2: ЛИНЕЙКА */}
        {/* --- ЭКРАН 2: ЛИНЕЙКА (ОДИН ПЕРСОНАЖ — ПЯТЬ СТИЛЕЙ) --- */}
<div className="mt-10 text-center w-full mb-24">
  <ScrollReveal>
    <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8">
      Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
    </h2>
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">⚡️ Стикеры для Telegram</span>
      <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">🤖 Создай стикер для МАКС</span>
    </div>
  </ScrollReveal>

  <ScrollReveal delay={200}>
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      {/* Возвращаем ОРИГИНАЛ */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 bg-card/50 shadow-xl">
          <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
        </div>
        <span className="text-[9px] font-black uppercase text-purple-400 italic">Оригинал</span>
      </div>

      <div className="text-2xl text-purple-500/60 font-bold">→</div>

      {/* СТИЛИ С ВАШИМИ ПОДПИСЯМИ */}
      <div className="flex flex-row items-center gap-3 overflow-x-auto py-2 no-scrollbar">
        {[
          { img: demoPixar, name: "Pixar" },
          { img: demoGta, name: "GTA" },
          { img: demoGhibli, name: "Miyazaki" },
          { img: demoCyberpunk, name: "Cyberpunk" },
          { img: demoLineart, name: "Line Art" }
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border border-white/10 bg-card/50 shadow-lg">
              <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
            </div>
            {/* Ваша подпись внизу */}
            <span className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-tighter">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </ScrollReveal>
</div>

        {/* ЭКРАН 3: ИНСТРУКЦИЯ */}
        <div className="mt-12 mb-20 w-full max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
                Как сделать <span className="text-primary">свой стикер</span> за 30 секунд?
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-none mx-auto font-medium leading-relaxed">
                Инструкция, как быстро создать премиум стикерпак из обычного фото с помощью нейросети.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Загрузи фото", desc: "Чтобы сделать стикерпак, выбери качественное селфи. ИИ автоматически удалит фон.", icon: "📸" },
              { step: "02", title: "Выбери стили", desc: "Создавай премиум стикеры в одном стиле или выбирай разные для каждой эмоции.", icon: "🎨" },
              { step: "03", title: "Забирай пак", desc: "Сгенерируй анимированные стикеры и добавь их в Telegram в один клик. Пак готов!", icon: "🚀" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className="relative p-8 rounded-[36px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-sm shadow-2xl overflow-hidden text-left">
                  <div className="absolute -right-2 -top-2 text-9xl font-black text-white/[0.03] tracking-tighter group-hover:text-purple-500/10 transition-colors pointer-events-none">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ЭКРАН 4: ГЕНЕРАТОР */}
        <div id="generator" className="mt-12 mb-16 w-full max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
              Создать <span className="text-primary text-shadow-glow">стикер</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-4xl mx-auto mb-10 font-medium leading-relaxed">
              Загрузи фото, выбери стиль и те эмодзи, с эмоциями которых ты хочешь сделать стикеры из фото.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-6 md:p-10 mb-10 backdrop-blur-md text-left">
              <div className="lg:col-span-4 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">1. Ваше фото</span>
                <div className="flex-1 min-h-[250px] border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center gap-3 group hover:border-purple-500/50 transition-all cursor-pointer bg-white/[0.01]">
                  <div className="text-4xl group-hover:scale-110 transition-transform">📤</div>
                  <span className="text-white font-bold text-xs uppercase">Нажмите для загрузки</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">2. Выберите стиль</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { img: demoPixar, name: "Pixar" },
                    { img: demoGta, name: "GTA" },
                    { img: demoGhibli, name: "Miyazaki" },
                    { img: demoCyberpunk, name: "Cyberpunk" },
                    { img: demoLineart, name: "Line Art" }
                  ].map((s, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/5 hover:border-purple-500/50 transition-all cursor-pointer group">
                      <img src={s.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt={s.name} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1">
                        <span className="text-[8px] font-bold text-white uppercase">{s.name}</span>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-square rounded-xl border-2 border-dashed border-white/5 flex items-center justify-center text-[7px] font-bold text-gray-600 uppercase">Soon</div>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-2">3. Эмоции</span>
                <div className="grid grid-cols-4 gap-2 p-3 bg-black/20 rounded-[24px] border border-white/5">
                  {['😊', '😎', '😡', '😱', '😭', '🤩', '🤔', '🔥', '😇', '🤡', '🤮', '😴', '👍', '❤️', '👀', '✨'].map((emoji, i) => (
                    <button key={i} className="aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded-lg transition-colors">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-all border-none group">
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                <span>СОЗДАТЬ СТИКЕРПАК</span>
              </Button>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-50">
                Бесплатно — осталось {balance} генераций
              </p>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
