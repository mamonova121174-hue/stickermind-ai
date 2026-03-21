import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  price: string;
  stickers: string;
  features: string[];
  popular?: boolean;
  payUrl: string;
}

const PricingCard = ({ name, price, stickers, features, popular, payUrl }: PricingCardProps) => {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        popular
          ? "surface-elevated glow-primary border border-primary/30"
          : "surface-elevated"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-medium">
          Популярный
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{stickers}</p>
      </div>

      <div className="mb-6">
        <span className="font-display text-3xl font-bold text-foreground">{price}</span>
        <span className="text-sm text-muted-foreground ml-1">₽</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-secondary-foreground">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        className={`w-full h-11 font-semibold active:scale-[0.97] transition-all duration-150 ${
          popular
            ? "bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
        asChild
      >
        <a href={payUrl} target="_blank" rel="noopener noreferrer">
          Оплатить
        </a>
      </Button>
    </div>
  );
};

export default PricingCard;
