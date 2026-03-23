import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

// Простая анимация появления (заменяет ScrollReveal, если он барахлит)
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

const HeroSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert("Фото выбрано: " + file.name + ". Двигатель StickersPak запущен!");
    }
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      <div className="container relative z-10 text-center max-w-3xl px-4">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Нейросеть нового поколения</span>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Нейро-стикеры по фото: твоё лицо — твой бренд
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Создай персональный стикерпак за 30 секунд. 
            Загрузи фото — получи уникальные стикеры для Telegram.
          </p>
        </FadeIn>

        <FadeIn delay={600}>
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleCreateClick}
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-6 text-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Создать первый стикер бесплатно
            </Button>
            <p className="text-xs text-muted-foreground/60">
              15 ⚪ бесплатно — хватит на 2 анимации
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={800}>
          <a
            href="#generator"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-12"
          >
            Попробовать сейчас
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
