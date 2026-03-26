import { Sparkles, Coins, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Импорты ассетов (проверь пути!)
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

        {/* ЭКРАН 1 */}
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
                  <Coins className="w-3 h-3" /> 15
                </span>
                бесплатно — хватит на 2 анимации
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* СЕТКА СТИЛЕЙ */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-0 mb-24 p-0">
            <div className="w-full max-w-[240px] flex flex-col items-center gap-3 shrink-0">
              <div className="w-[240px] h-[300px] rounded-[36px] overflow-hidden border-2 border-primary/20 bg-card/50 shadow-2xl">
                <img src={originalImg} className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">Твой оригинал</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[demoPixar, demoGta, demoGhibli, demoCyberpunk, demoLineart].map((img, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="w-[160px] h-[220px] md:w-[200px] md:h-[260px] rounded-[32px] overflow-hidden border-2 bg-card/50 border-white/5 hover:border-purple-500/30 transition-all">
                    <img src={img} className="w-full h-full object-cover" alt="Стиль стикера" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* КАК СДЕЛАТЬ */}
        <div className="mt-12 mb-20 w-full max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
                Как сделать <span className="text-primary">свой стикер</span> за 30 секунд?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Загрузи фото", desc: "Выбери селфи. ИИ автоматически удалит фон.", icon: "📸" },
              { step: "02", title: "Выбери стили", desc: "Создавай стикеры в одном стиле или разные для эмоций.", icon: "🎨" },
              { step: "03", title: "Забирай пак", desc: "Сгенерируй стикеры и добавь их в Telegram.", icon: "🚀" }
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

        {/* ГЕНЕРАТОР */}
        <div id="generator" className="mt-12 mb-24 w-full max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
              Создать <span className="text-primary text-shadow-glow">стикер</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/10 rounded-[40px] p-6 md:p-10 mb-10 backdrop-blur-md">
              <div className="lg:col-span-12 text-gray-500 italic">Блок генерации активен</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-16 px-12 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-all border-none">
              <Sparkles className="w-6 h-6 mr-3" />
              <span>СОЗДАТЬ СТИКЕРПАК</span>
            </Button>
          </ScrollReveal>
        </div>

        {/* FAQ */}
        <div className="w-full max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <HelpCircle className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl md:text-4xl font-black uppercase text-white">FAQ</h2>
            </div>
          </ScrollReveal>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="text-white font-bold hover:no-underline uppercase text-sm py-5">
                Это действительно бесплатно?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5">
                Да! Мы даем 15 приветственных монет каждому новому пользователю.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/10 bg-white/[0.02] rounded-[24px] px-6">
              <AccordionTrigger className="text-white font-bold hover:no-underline uppercase text-sm py-5">
                Формат стикеров?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5">
                Мы используем WebP для идеальной анимации в Telegram.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
