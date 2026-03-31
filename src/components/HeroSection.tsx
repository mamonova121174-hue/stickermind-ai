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

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-24 pb-10 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">
        
        {/* --- ГЛАВНЫЙ ОФФЕР --- */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-tight mb-6 uppercase text-white tracking-tighter">
              Создавай свои <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">стикеры</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br className="hidden md:block"/>
              Загрузи одно фото — получи готовый набор для Telegram.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-6">
              <Button 
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-10 text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-all border-none group"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                ПОПРОБОВАТЬ БЕСПЛАТНО
              </Button>
              
              {/* УМНЫЙ БАЛАНС В ХИРО */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-1.5 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md">
                  <Coins className="w-3.5 h-3.5" />
                  <span className="text-xs font-black">{balance}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                  {balance >= 5 ? "Доступно для генерации" : "Пополни баланс для старта"}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- ПРЕВЬЮ СЕТКА (ОРИГИНАЛ -> СТИЛИ) --- */}
        <ScrollReveal delay={400}>
          <div className="w-full max-w-6xl mx-auto bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[50px] backdrop-blur-3xl shadow-3xl">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
              
              {/* Оригинал */}
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-[180px] h-[220px] md:w-[240px] md:h-[300px] rounded-[40px] overflow-hidden border-2 border-purple-500/20 bg-card/50 shadow-2xl transition-transform group-hover:scale-[1.02]">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-purple-500/60 italic">Твой оригинал</span>
              </div>

              {/* Стрелочка */}
              <div className="hidden lg:flex items-center text-purple-500/30">
                <ArrowRight className="w-12 h-12 animate-pulse" />
              </div>

              {/* Сетка стилей */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-8">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <div className="w-[130px] h-[170px] md:w-[160px] md:h-[210px] rounded-[32px] overflow-hidden border-2 border-white/5 bg-card/50 transition-all group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:-translate-y-2">
                      <img src={img} className="w-full h-full object-contain" alt="Стиль стикера" />
                    </div>
                  </div>
                ))}
                {/* Заглушка SOON */}
                <div className="w-[130px] h-[170px] md:w-[160px] md:h-[210px] rounded-[32px] border-2 border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]">
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Soon</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
      
      {/* Фоновое свечение для красоты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default HeroSection;
