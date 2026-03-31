import { useState } from "react";
import { Sparkles, Coins, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useTokens } from "@/components/TokenContext"; // Подключаем кошелек

// Импорты ассетов
import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HowItWorksSection = () => {
  // --- ЛОГИКА КОШЕЛЬКА ---
  const { balance, useTokens } = useTokens();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]); // Для примера, как мы считаем
  
  // Стоимость пака: 25 токенов за 5 штук (статику)
  const PACK_COST = 25; 
  const canAfford = balance >= PACK_COST;

  const handleCreatePack = async () => {
    if (!canAfford) {
      // Здесь открыть PricingModal, если он подключен
      alert("Недостаточно токенов!");
      return;
    }

    setIsGenerating(true);
    
    // Пытаемся списать токены
    const success = useTokens(PACK_COST);
    
    if (success) {
      console.log(`Запуск генерации пака: стиль, эмоции. Стоимость: ${PACK_COST}`);
      
      // Имитация работы нейросети
      setTimeout(() => {
        setIsGenerating(false);
        alert(`Списано ${PACK_COST} токенов. Генерация началась! Проверьте галерею.`);
      }, 2000);
    } else {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="py-20 scroll-mt-20 overflow-hidden bg-[#0a0a0c]">
      <div className="container max-w-7xl flex flex-col items-center">
        
        {/* --- ЭКРАН 1: ОФФЕР И ДЕМО-СЕТКА --- */}
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
                onClick={handleCreatePack}
                className={`bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-10 text-xl font-black rounded-2xl shadow-xl hover:scale-105 transition-all border-none group ${
                   canAfford ? "glow-primary shadow-primary/20" : "grayscale opacity-80"
                }`}
              >
                {isGenerating ? (
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                ) : (
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                )}
                <span>{isGenerating ? "ОБРАБОТКА..." : "СОЗДАТЬ ПАК СТИКЕРОВ"}</span>
              </Button>
              
              {/* НАШ НОВЫЙ УМНЫЙ БАЛАНС В ЭТОМ БЛОКЕ */}
              <div className={`flex items-center gap-3 bg-white/5 border px-5 py-2 rounded-fullbackdrop-blur-sm shadow-xl ${
                !canAfford ? "border-red-500 animate-pulse bg-red-500/10" : "border-white/10 bg-white/5"
              }`}>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-black ${
                  !canAfford ? "bg-red-500/20 text-red-500" : "bg-purple-500/20 text-purple-400"
                }`}>
                  <Coins className={`w-3.5 h-3.5 ${!canAfford ? "text-red-500" : "text-yellow-500"}`} /> 
                  <span className="tabular-nums">{balance}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                   !canAfford ? "text-red-500" : "text-gray-400 opacity-50"
                }`}>
                   {!canAfford 
                     ? `Не хватает ${PACK_COST - balance} токенов` 
                     : `Стоимость пака (5 шт) — ${PACK_COST} 🪙`}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- ЭКРАН 2: ЛИНЕЙКА (ОДИН ПЕРСОНАЖ — ПЯТЬ СТИЛЕЙ) --- */}
        <div className="w-full mb-32 text-center bg-white/[0.01] p-10 rounded-3xl border border-white/5">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8">
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
          </ScrollReveal>
        </div>

        {/* --- ЭКРАН 3: ИНСТРУКЦИЯ (ШАГИ 01, 02, 03) --- */}
        <div className="w-full mb-20 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-12 tracking-tight">
              Как быстро <span className="text-primary text-shadow-glow">создать</span> стикеры?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { step: "01", title: "Загрузи фото", desc: "Выбери качественное селфи. ИИ удалит фон автоматически.", icon: "📸" },
                { step: "02", title: "Выбери стили", desc: "Создавай в одном стиле или в разных для каждой эмоции.", icon: "🎨" },
                { step: "03", title: "Забирай пак", desc: "Добавляй анимированные стикеры в Telegram в один клик.", icon: "🚀" }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-[36px] bg-white/[0.02] border border-white/10 group hover:border-purple-500/50 transition-all backdrop-blur-sm overflow-hidden text-left">
                  <div className="absolute -right-2 -top-2 text-9xl font-black text-white/[0.03] group-hover:text-purple-500/10 transition-colors pointer-events-none">{item.step}</div>
                  <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-inner">{item.icon}</div>
                  <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
