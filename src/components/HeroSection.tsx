import { Sparkles, Coins, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

        <div className="text-center mb-12 text-white">
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-tight mb-4 uppercase">Создавай свои стикеры</h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
              Создай стикерпак в 5 премиум стилях за 30 сек. <br/>
              Загрузи фото — получи стикеры для Телеграм.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-4">
              <Button asChild className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-12 px-8 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all border-none">
                <a href="#generator" className="flex items-center gap-3"><Sparkles className="w-5 h-5" /><span>Создать первый стикер бесплатно</span></a>
              </Button>
              <div className="text-[10px] text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Coins className="w-3 h-3" /> 15</span> бесплатно — хватит на 2 анимации
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-24">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0 text-white">
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

        <div className="text-center w-full mb-24 text-white">
          <ScrollReveal><h2 className="text-4xl md:text-5xl font-black uppercase mb-8">Один персонаж — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">пять стилей</span></h2></ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <div className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border-2 border-purple-500/30 bg-card/50 shadow-xl shrink-0">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <div className="text-2xl text-purple-500/60 font-bold">→</div>
              <div className="flex flex-row items-center gap-3 overflow-x-auto no-scrollbar">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="w-[120px] h-[120px] md:w-[155px] md:h-[155px] rounded-[28px] overflow-hidden border border-white/10 bg-card/50 shrink-0">
                    <img src={img} className="w-full h-full object-cover" alt="Результат" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div id="generator" className="mb-24 w-full max-w-6xl mx-auto px-4 text-center text-white">
          <ScrollReveal><h2 className="text-4xl md:text-5xl font-black uppercase mb-10">Создать <span className="text-primary">стикер</span></h2></ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-10 mb-10 backdrop-blur-md">
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase text-purple-500 text-left">1. Фото</span>
              <div className="flex-1 min-h-[250px] border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center bg-white/[0.01]">📤</div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase text-purple-500 text-left">2. Стиль</span>
              <div className="grid grid-cols-3 gap-2">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-white/5 hover:border-purple-500/50 cursor-pointer group">
                    <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt="Стиль" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase text-purple-500 text-left">3. Эмоции</span>
              <div className="grid grid-cols-4 gap-2 p-3 bg-black/20 rounded-[24px]">
                {['😊', '😎', '😡', '😱', '😭', '🤩', '🤔', '🔥', '😇', '🤡', '🤮', '😴', '👍', '❤️', '👀', '✨'].map((emoji, i) => (
                  <button key={i} className="aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded-lg">{emoji}</button>
                ))}
              </div>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl">СОЗДАТЬ СТИКЕРПАК</Button>
        </div>
        {/* --- FAQ СЕКЦИЯ --- */}
        <div className="w-full max-w-4xl mx-auto mb-20 text-white text-left">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black uppercase mb-4">Частые вопросы</h2>
              <p className="text-gray-400 italic">Всё о создании премиум стикеров</p>
            </div>
          </ScrollReveal>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs">Где взять премиум стикеры тг бесплатно?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Вы можете создать их сами! Наш генератор — лучший способ получить <span className="text-white font-bold italic underline">премиум стикер тг</span> из фото. Телеграм премиум стикеры будут в формате ВебП (WebP) с идеальной анимацией.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs">Как создать и добавить свои стикеры в МАКС?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Чтобы <span className="text-white font-bold italic underline">создать стикеры в макс</span>, загрузите фото и выберите стиль. Отправьте файл в бот мессенджера <span className="text-purple-400 font-bold uppercase">МАКС</span>. В максе можно создавать стикеры самостоятельно или перенести свои наборы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs">Как сделать 3д стикер лица в стиле Пиксар?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Выберите стиль 'Пиксар' (Pixar). Наш <span className="text-white font-bold italic underline">стикер лицо</span> нейросеть отрисует в объеме. Это лучший путь, <span className="text-purple-400 font-bold uppercase">как сделать 3d стикер</span> с вашим сходством.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6 border-purple-500/50 bg-purple-500/5 shadow-xl">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs text-purple-400">🎁 Получить бесплатные монеты за отзыв</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm">
                Оставьте отзыв в соцсетях или ТГ и получите бонус на баланс! Подробности в личном кабинете.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
