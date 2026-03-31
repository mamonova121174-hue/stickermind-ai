import { Sparkles, Coins, ArrowRight } from "lucide-react";
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

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-24 pb-10 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">
        
        {/* --- 1. ГЛАВНЫЙ ЭКРАН (ОФФЕР) --- */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-tight mb-6 uppercase text-white tracking-tighter">
              Создавай свои <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">стикеры</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-6">
              <Button 
                onClick={scrollToGenerator}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-10 text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-all border-none group"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                ПОПРОБОВАТЬ БЕСПЛАТНО
              </Button>
              
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-1.5 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md text-xs font-black">
                  <Coins className="w-3.5 h-3.5" /> {balance}
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Бесплатно — хватит на {Math.floor(balance/7)} анимации
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- 2. СЕТКА СТИЛЕЙ --- */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-24">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                <div key={i} className="w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 bg-card/50 border-white/5 hover:border-purple-500/30 transition-all">
                  <img src={img} className="w-full h-full object-cover" alt="Стиль" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* --- 3. ОДИН ПЕРСОНАЖ — ПЯТЬ СТИЛЕЙ (ЛИНЕЙКА) --- */}
        <div className="w-full mb-32 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>
            <div className="flex flex-row items-center justify-center gap-4">
               <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30">
                  <img src={originalImg} className="w-full h-full object-cover" />
               </div>
               <ArrowRight className="w-8 h-8 text-purple-500 animate-pulse" />
               <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                    <div key={i} className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border border-white/10 shrink-0">
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- 4. ИНСТРУКЦИЯ (ШАГИ) --- */}
        <div className="w-full mb-20 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-12">
              Как сделать <span className="text-primary">свой стикер</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Загрузи фото", desc: "Выбери качественное селфи. ИИ удалит фон.", icon: "📸" },
                { step: "02", title: "Выбери стили", desc: "Создавай стикеры в одном стиле или в разных.", icon: "🎨" },
                { step: "03", title: "Забирай пак", desc: "Генерируй и добавляй в Telegram в один клик.", icon: "🚀" }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-[36px] bg-white/[0.03] border border-white/10 text-left overflow-hidden group hover:border-purple-500/50 transition-all">
                  <div className="absolute -right-2 -top-2 text-9xl font-black text-white/[0.03] tracking-tighter group-hover:text-purple-500/10 transition-colors">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-3xl mb-5">{item.icon}</div>
                  <h3 className="text-xl font-black text-white mb-3 uppercase">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* --- 5. ЗАГОЛОВОК ДЛЯ ГЕНЕРАТОРА (ФОРМА САМА ИДЕТ СЛЕДУЮЩИМ БЛОКОМ) --- */}
        <div className="text-center mb-10">
          <ScrollReveal>
             <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
                Создать <span className="text-primary">стикер</span>
             </h2>
             <p className="text-gray-400 max-w-2xl mx-auto">
                Загрузи фото, выбери стиль и те эмодзи, которые хочешь превратить в стикеры.
             </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
