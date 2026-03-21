import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Consent = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-20">
      <div className="container max-w-2xl prose prose-invert prose-sm">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          Согласие на обработку персональных данных
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          В соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных»,
          настоящим я даю согласие на обработку моих персональных данных.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">Перечень данных</h2>
        <ul className="text-muted-foreground space-y-1">
          <li>Адрес электронной почты</li>
          <li>Фотографические изображения (обрабатываются и удаляются немедленно)</li>
          <li>Данные об оплате (обрабатываются платёжным провайдером Prodamus)</li>
        </ul>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">Цели обработки</h2>
        <ul className="text-muted-foreground space-y-1">
          <li>Предоставление доступа к сервису генерации стикеров</li>
          <li>Обработка платежей</li>
          <li>Информирование о статусе заказа</li>
        </ul>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">Отзыв согласия</h2>
        <p className="text-muted-foreground leading-relaxed">
          Согласие может быть отозвано путём направления письменного заявления на адрес
          support@stickermind.ai. При отзыве согласия все персональные данные будут удалены
          в течение 30 дней.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Consent;
