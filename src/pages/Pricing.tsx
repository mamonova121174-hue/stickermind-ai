import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import ScrollReveal from "@/components/ScrollReveal";

const plans = [
  {
    name: "Тест-драйв",
    price: "290",
    stickers: "3 персональных стикера",
    features: [
      "1 фото → 3 уникальных стикера",
      "Любой стиль на выбор",
      "PNG без фона",
      "Скачивание в 1 клик",
    ],
    payUrl: "https://checkout.prodamus.ru/pay/test-drive",
  },
  {
    name: "Профи-Пак",
    price: "890",
    stickers: "15 персональных стикеров",
    popular: true,
    features: [
      "До 5 фото → 15 стикеров",
      "Все 5 стилей доступны",
      "PNG без фона",
      "Готовый пак для Telegram",
      "Приоритетная генерация",
    ],
    payUrl: "https://checkout.prodamus.ru/pay/pro-pack",
  },
  {
    name: "Бизнес-Бренд",
    price: "2 490",
    stickers: "50 стикеров",
    features: [
      "До 15 фото → 50 стикеров",
      "Все 5 стилей + микс",
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
              Тарифы
            </h1>
            <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
              Выберите подходящий план и создайте уникальный стикерпак за считаные секунды
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
              Оплата через Prodamus. Безопасно. Возврат в течение 24 часов если стикеры не были сгенерированы.
            </p>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
