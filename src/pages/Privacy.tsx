import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-20">
      <div className="container max-w-2xl prose prose-invert prose-sm">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Политика конфиденциальности</h1>

        <p className="text-muted-foreground leading-relaxed">
          Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
          пользователей сервиса StickerMind AI (далее — «Сервис»).
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">1. Сбор данных</h2>
        <p className="text-muted-foreground leading-relaxed">
          Мы собираем минимальный объём данных, необходимых для предоставления услуг: адрес электронной почты
          при регистрации и загруженные фотографии для генерации стикеров.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">2. Обработка фотографий</h2>
        <p className="text-muted-foreground leading-relaxed">
          Загруженные фотографии используются исключительно для генерации стикеров и удаляются
          с серверов сразу после завершения обработки. Мы не храним исходные фотографии пользователей.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">3. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          Сервис использует файлы cookie для обеспечения функциональности сайта и сбора анонимной
          аналитической информации.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">4. Права пользователей</h2>
        <p className="text-muted-foreground leading-relaxed">
          В соответствии с Федеральным законом №152-ФЗ «О персональных данных», вы имеете право
          на доступ, исправление и удаление своих персональных данных. Для этого свяжитесь с нами
          по электронной почте.
        </p>

        <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-3">5. Контакты</h2>
        <p className="text-muted-foreground leading-relaxed">
          По вопросам обработки персональных данных: support@stickermind.ai
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
