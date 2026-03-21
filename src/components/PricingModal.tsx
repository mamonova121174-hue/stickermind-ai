import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PricingCard from "./PricingCard";

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

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-background border-border p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-center">
            Пополнить токены
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Статичный стикер = 5 токенов · Анимация TGS = 7 токенов
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
