import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Как сделать стикер в Телеграм без фона?",
    a: "StickerMind AI автоматически удаляет фон при генерации стикера. Вы получаете готовые PNG-файлы с прозрачным фоном, которые можно добавить в Telegram через @Stickers бота. Просто загрузите фото — нейросеть сделает всё за вас.",
  },
  {
    q: "Как сделать 3D стикеры?",
    a: "Выберите стиль «3D Pixar» в нашем генераторе. Нейросеть превратит ваше фото в объёмный 3D-стикер в стиле мультфильмов Pixar. Это один из самых популярных стилей — стикеры получаются яркими и выразительными.",
  },
  {
    q: "Как сделать стикерпак в ТГ из своих фото?",
    a: "Загрузите своё фото в StickerMind AI, выберите стиль и нажмите «Сгенерировать». После оплаты вы получите набор стикеров, который можно скачать и загрузить в Telegram через бота @Stickers. Весь процесс занимает меньше минуты.",
  },
  {
    q: "Как сделать стикер лица нейросетью?",
    a: "Наша нейросеть специализируется именно на стикерах лиц. Загрузите селфи или портретное фото — ИИ определит черты лица и перерисует его в выбранном стиле (GTA, Cyberpunk, Anime и другие). Результат — уникальный стикер с вашим лицом.",
  },
  {
    q: "Можно сделать стикерпак на айфоне?",
    a: "Да! StickerMind AI полностью адаптирован для мобильных устройств. Откройте сайт на iPhone или Android, загрузите фото из галереи или сделайте селфи камерой — и получите готовый стикерпак.",
  },
  {
    q: "Мои фото хранятся на сервере?",
    a: "Нет. Ваши фото удаляются сразу после обработки нейросетью. Мы не храним персональные данные и изображения пользователей. Подробнее — в нашей Политике конфиденциальности.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 scroll-mt-20">
      <div className="container max-w-2xl">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
            Частые вопросы
          </h2>
          <p className="text-muted-foreground text-center mb-10 text-sm">
            Как сделать стикерпак для Telegram с помощью нейросети
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="surface-elevated rounded-xl px-5 border-none"
              >
                <AccordionTrigger className="text-left text-sm font-medium py-4 hover:no-underline text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
