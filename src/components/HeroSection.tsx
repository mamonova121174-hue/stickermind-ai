import { Sparkles, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

// ВАЖНО: Проверь, что эти файлы реально лежат в src/assets/
import originalImg from "@/assets/original-photo.png";
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-10 overflow-hidden px-4 bg-[#0a0a0c] text-white">
      <div className="container relative z-10 max-w-7xl flex flex-col items-center">
        
        {/* ЭКРАН 1 */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="text-5xl sm:text-6xl font-black uppercase mb-4">
              Создавай свои стикеры [cite: 18-19]
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-6">
              Загрузи фото — получи стикеры для Телеграм [cite: 22-23].
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-4">
              <Button asChild className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white h-12 px-8 font-bold rounded-2xl shadow-xl">
                <a href="#generator" className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  <span>Создать бесплатно [cite: 31]</span>
                </a>
              </Button>
              <div className="text-[10px] text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Coins className="w-3 h-3" /> 15
                </span>
                бесплатно [cite: 37-39]
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ГЕНЕРАТОР (УПРОЩЕННЫЙ) */}
        <div id="generator" className="mt-12 w-full max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-black uppercase mb-10">Создать стикер [cite: 131-132]</h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-[40px] p-10 backdrop-blur-md">
                <p className="text-purple-500 font-black uppercase tracking-widest">Блок генератора загружается... [cite: 135]</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
