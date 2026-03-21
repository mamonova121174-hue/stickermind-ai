import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import ScrollReveal from "@/components/ScrollReveal";

const plans = [
  {
    name: "Старт",
    price: "290",
    stickers: "240 токенов",
    features: [
      "240 токенов (~48 статичных стикеров)",
      "Для одного идеального стикерпака",
      "Все 5 стилей на выбор",
      "PNG без фона",
      "Скачивание в 1 клик",
    ],
    payUrl: "https://checkout.prodamus.ru/pay/start-pack",
  },
  {
    name: "Профи",
    price: "890",
    stickers: "1 000 токенов",
    popular: true,
    features: [
      "1 000 токенов (~200 статичных стикеров)",
      "На все стили и анимации",
      "Все 5 стилей + анимация TGS",
      "PNG без фона",
      "Готовый пак для Telegram",
      "Приоритетная генерация",
    ],
    payUrl: "https://checkout.prodamus.ru/pay/pro-pack",
  },
  {
    name: "Бизнес",
    price: "2 490",
    stickers: "3 500 токенов",
    features: [
      "3 500 токенов (~700 статичных стикеров)",
      "Для максимального продвижения бренда",
      "Все 5 стилей + анимация TGS + микс",
      "PNG без фона",
      "Пак для Telegram + WhatsApp",
      "Приоритетная генерация",
      "Персональная поддержка",
    ],
    payUrl: "https://checkout.prodamus.ru/pay/business",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3" style={{ textWrap: "balance" }}>
              Магазин токенов
            </h1>
            <p className="text-muted-foreground text-center mb-4 max-w-md mx-auto">
              Пополните баланс и создавайте уникальные стикерпаки без ограничений
            </p>
            <p className="text-sm text-center text-muted-foreground/70 mb-12">
              Статичный стикер = 5 🪙 · Анимация TGS = 7 🪙
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 100}>
                <PricingCard {...plan} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <p className="text-xs text-muted-foreground/50 text-center mt-10">
              Оплата через Prodamus. Безопасно. Возврат в течение 24 часов если токены не были использованы.
            </p>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
