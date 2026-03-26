import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-10 overflow-hidden px-4 bg-[#0a0a0c]">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">
        
        {/* --- ЭКРАН 1: ГЛАВНЫЙ (КОМПАКТНЫЙ) --- */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-tight mb-2 uppercase text-white">
              Создавай свои стикеры
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-3">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <a href="#generator" className="flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span className="leading-none">Создать первый стикер бесплатно</span>
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* СЕТКА (КАК БЫЛО) */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-0 mb-20 p-0">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 bg-card/50 border-white/5">
                    <img src={img} className="w-full h-full object-cover" alt="Стиль" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* --- ЭКРАН 2: ЛИНЕЙКА СТИЛЕЙ (КАК БЫЛО) --- */}
        <div className="mt-10 text-center w-full mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-6 leading-tight">
              Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20">
                ⚡️ Стикеры для Telegram
              </span>
              <span className="px-7 py-3.5 bg-[#7c3aed] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20">
                🤖 Создай стикер для МАКС
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full px-2">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 shadow-xl bg-card/50">
                  <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
                </div>
                <span className="text-[9px] font-black uppercase text-purple-400 italic tracking-widest">Оригинал</span>
              </div>
              <div className="text-2xl text-purple-500/60 font-bold px-1 md:px-2">→</div>
              <div className="flex flex-row items-center gap-2 md:gap-4 overflow-x-auto py-2">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="flex flex-col items-center shrink-0">
                    <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-[28px] overflow-hidden border border-white/10 bg-card/50 shadow-lg hover:border-purple-500/40 hover:scale-105 transition-all">
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- ЭКРАН 3: КАК СДЕЛАТЬ СТИКЕР (SEO ИСПРАВЛЕНИЯ) --- */}
        <div className="mt-12 mb-16 w-full max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
                Как сделать <span className="text-primary">свой стикер</span> за 30 секунд?
              </h2>
              {/* ПОПРАВКА 1: Строка описания в одну линию на десктопе */}
              <p className="text-gray-400 text-base md:text-lg max-w-none mx-auto font-medium leading-relaxed md:whitespace-nowrap">
                Инструкция, как быстро создать премиум стикерпак из обычного фото с помощью нейросети.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Загрузи фото", 
                // ПОПРАВКА 2: Убрали "наш", теперь 3 строчки ровно
                desc: "Чтобы сделать стикерпак, выбери качественное селфи. ИИ автоматически удалит фон.", 
                icon: "📸" 
              },
              { step: "02", title: "Выбери стили", desc: "Создавай премиум стикеры в одном стиле или выбирай разные для каждой эмоции.", icon: "🎨" },
              { step: "03", title: "Забирай пак", desc: "Сгенерируй анимированные стикеры и добавь их в Telegram в один клик. Пак готов!", icon: "🚀" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className="relative p-8 rounded-[36px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-sm shadow-2xl overflow-hidden">
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

        {/* --- ПОПРАВКА 3: УДАЛЯЕМ УСТАРЕВШУЮ ГРАФИКУ И ПЕРЕХОДИМ К ГЕНЕРАТОРУ --- */}
        {/* Старый блок с мелкими стикерами удален. На его место ставим SEO заголовок. */}

        {/* --- ЭКРАН 4: ГЕНЕРАТОР (ПОСЛЕДНИЙ БОСС) --- */}
        <div id="generator" className="mt-16 mb-20 w-full max-w-7xl mx-auto px-4 text-center">
          <ScrollReveal>
            {/* ПОПРАВКА 4: Высокочастотный заголовок "Создать стикер" */}
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6">
              Создать <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">стикер</span> прямо сейчас
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-16 font-medium leading-relaxed">
              Загрузи фото, выбери стили и эмодзи — через 30 секунд твой уникальный пак готов.
            </p>
          </ScrollReveal>

          {/* Тут будет блок с ВАШЕ ФОТО и Выбором стиля (я поставлю заглушку) */}
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 mb-10 text-gray-600 text-sm font-bold uppercase tracking-widest border-dashed">
            [Здесь блок с загрузкой фото и выбором 5 стилей — мы соберем его дальше]
          </div>

          {/* ПОПРАВКА 5: Переименованная кнопка */}
          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-3">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-14 px-10 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none group">
                <Sparkles className="w-5 h-5 mr-3 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                <span>Создать стикерпак</span>
              </Button>
              <div className="text-[10px] text-gray-500 font-medium">Бесплатная генерация может занять до 15 секунд</div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
