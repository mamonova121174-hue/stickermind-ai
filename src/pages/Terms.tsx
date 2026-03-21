import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-20">
      <div className="container max-w-2xl prose prose-invert prose-sm">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Публичная оферта</h1>

        <p className="text-muted-foreground leading-relaxed">
          Настоящий документ является публичной офертой на оказание услуг по генерации
          персонализированных стикеров с использованием технологий искусственного интеллекта.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">1. Предмет оферты</h2>
        <p className="text-muted-foreground leading-relaxed">
          Исполнитель предоставляет Заказчику доступ к сервису генерации стикеров StickerMind AI
          в соответствии с выбранным тарифным планом.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">2. Порядок оплаты</h2>
        <p className="text-muted-foreground leading-relaxed">
          Оплата производится через платёжный сервис Prodamus. Момент оплаты является моментом
          акцепта настоящей оферты.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">3. Возврат средств</h2>
        <p className="text-muted-foreground leading-relaxed">
          Возврат средств возможен в течение 24 часов с момента оплаты, если услуга не была оказана
          (стикеры не были сгенерированы).
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">4. Ограничение ответственности</h2>
        <p className="text-muted-foreground leading-relaxed">
          Исполнитель не несёт ответственности за качество загружаемых Заказчиком фотографий
          и их влияние на результат генерации.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
