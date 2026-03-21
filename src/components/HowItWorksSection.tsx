import { Camera, Palette, Sparkles, Send } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Camera,
    title: "Загрузите фото",
    desc: "Селфи или портрет — ИИ распознает лицо автоматически",
  },
  {
    icon: Palette,
    title: "Выберите стиль",
    desc: "5 премиум-стилей: 3D Pixar, GTA, Miyazaki, Cyberpunk, Line Art",
  },
  {
    icon: Sparkles,
    title: "Статика или анимация",
    desc: "Статичный стикер (5 🪙) или анимация TGS (7 🪙) — решать вам",
  },
  {
    icon: Send,
    title: "Готово для Telegram",
    desc: "Скачайте PNG без фона и добавьте в Telegram через @Stickers",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 scroll-mt-20">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-center mb-3"
            style={{ textWrap: "balance" }}
          >
            Как это работает
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-sm max-w-md mx-auto">
            Создать стикерпак в ТГ из своих фото — проще, чем кажется
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 100}>
              <div className="relative surface-elevated rounded-xl p-5 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
