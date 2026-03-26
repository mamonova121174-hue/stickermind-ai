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

{/* --- ЭКРАН 3: ИНСТРУКЦИЯ 01-03 (ВОЗВРАЩАЕМ ТЕКСТЫ) --- */}
        <div className="mt-12 mb-24 w-full max-w-6xl mx-auto px-6 text-white text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-16">
              Как сделать <span className="text-primary text-shadow-glow">свой стикер</span> за 30 секунд?
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-left">
            <div className="relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="absolute -right-4 -top-2 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-purple-500/10 transition-colors">01</div>
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner">📸</div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Загрузи фото</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">Чтобы сделать стикерпак, выбери качественное селфи. ИИ автоматически удалит фон.</p>
            </div>

            <div className="relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="absolute -right-4 -top-2 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-purple-500/10 transition-colors">02</div>
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner">🎨</div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Выбери стили</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">Создавай премиум стикеры в одном стиле или выбирай разные для каждой эмоции.</p>
            </div>

            <div className="relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="absolute -right-4 -top-2 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-purple-500/10 transition-colors">03</div>
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner">🚀</div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Забирай пак</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">Сгенерируй анимированные стикеры и добавь их в Telegram в один клик.</p>
            </div>
          </div>
        </div>

        {/* --- ЭКРАН 4: ГЕНЕРАТОР (ВОЗВРАЩАЕМ ЦВЕТА) --- */}
        <div id="generator" className="mt-12 mb-24 w-full max-w-6xl mx-auto px-4 text-center text-white">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-10">Создать <span className="text-primary text-shadow-glow">стикер</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-10 mb-10 backdrop-blur-md">
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase text-purple-500 text-left ml-2 tracking-widest italic">1. Ваше фото</span>
              <div className="flex-1 min-h-[250px] border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center gap-3 cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
                <div className="text-4xl group-hover:scale-110 transition-transform italic">📤</div>
                <span className="font-bold text-xs uppercase italic opacity-50">Нажмите для загрузки</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3 text-left">
              <span className="text-[10px] font-black uppercase text-purple-500 ml-2 tracking-widest italic font-bold">2. Выберите стиль</span>
              <div className="grid grid-cols-3 gap-2">
                {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/5 hover:border-purple-500/50 transition-all cursor-pointer group">
                    <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt="Style" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-3 text-left">
              <span className="text-[10px] font-black uppercase text-purple-500 ml-2 tracking-widest italic font-bold">3. Эмоции</span>
              <div className="grid grid-cols-4 gap-2 p-3 bg-black/20 rounded-[24px] border border-white/5">
                {['😊', '😎', '😡', '😱', '😭', '🤩', '🤔', '🔥', '😇', '🤡', '🤮', '😴', '👍', '❤️', '👀', '✨'].map((emoji, i) => (
                  <button key={i} className="aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded-lg transition-colors leading-none">{emoji}</button>
                ))}
              </div>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-all border-none">
            <Sparkles className="w-6 h-6 mr-3" /><span>СОЗДАТЬ СТИКЕРПАК</span>
          </Button>
        </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* SEO БЛОК 1: Премиум стикеры тг (13к) + тг/телеграм (1.7к/128) */}
            <AccordionItem value="item-1" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6 transition-all hover:border-purple-500/30">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs tracking-wider">Где взять премиум стикеры тг бесплатно?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Наш генератор — лучший способ получить <span className="text-white font-bold italic underline">премиум стикер тг</span> из фото. Вы узнаете, <span className="text-purple-400 font-bold">как сделать стикерпак в тг</span> или телеграм всего за 30 секунд. Результат выдается в формате ВебП (WebP) с идеальной анимацией.
              </AccordionContent>
            </AccordionItem>

            {/* SEO БЛОК 2: МАКС (73к) + Инструкция */}
            <AccordionItem value="item-2" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs tracking-wider">Как создать и добавить свои стикеры в МАКС?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Чтобы <span className="text-white font-bold italic underline">создать стикеры в макс</span>, загрузите фото и выберите стиль. Готовый файл отправьте в бот мессенджера <span className="text-purple-400 font-bold uppercase tracking-widest">МАКС</span>. В максе можно создавать стикеры самостоятельно или перенести свои наборы из ТГ.
              </AccordionContent>
            </AccordionItem>

            {/* SEO БЛОК 3: 3D и Лицо */}
            <AccordionItem value="item-3" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs tracking-wider">Как сделать 3д стикер лица в стиле Пиксар?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Выберите стиль 'Пиксар' (Pixar). Наш <span className="text-white font-bold italic underline">стикер лицо</span> нейросеть отрисует в объеме. Это кратчайший путь, <span className="text-purple-400 font-bold uppercase">как сделать 3d стикер</span> с вашим полным сходством.
              </AccordionContent>
            </AccordionItem>

            {/* СЕРВИС: Токены и Сервер (Privacy) */}
            <AccordionItem value="item-4" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="font-bold py-5 uppercase text-[10px] tracking-widest text-gray-500">Сколько стоит генерация и хранятся ли фото на сервере?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                Вы получаете <span className="text-white font-bold italic">15 бесплатных токенов</span> при регистрации. Ваши исходные фото <span className="text-white font-bold underline">удаляются автоматически</span> сразу после создания пака. Мы не храним личные данные на сервере.
              </AccordionContent>
            </AccordionItem>

            {/* ПОДАРКИ И ЛИЧНЫЙ КАБИНЕТ */}
            <AccordionItem value="item-5" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6 border-purple-500/50 bg-purple-500/5 shadow-xl">
              <AccordionTrigger className="font-bold py-5 uppercase text-xs text-purple-400 italic">🎁 Как получить бесплатные монеты за отзыв?</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-sm">
                Оставьте отзыв в соцсетях или ТГ и получите бонус на баланс! 
                <div className="mt-3">
                   <Button asChild variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 h-8 rounded-xl text-[10px] uppercase font-bold">
                     <a href="/dashboard">Перейти в личный кабинет</a>
                   </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
