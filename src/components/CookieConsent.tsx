import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-fade-up">
      <div className="surface-elevated rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Мы используем cookie для аналитики и улучшения сервиса. Продолжая использовать сайт, вы соглашаетесь с{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Политикой конфиденциальности
            </a>
            .
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="ghost" className="text-xs h-8" onClick={accept}>
            Отклонить
          </Button>
          <Button
            size="sm"
            className="text-xs h-8 bg-gradient-primary text-primary-foreground hover:opacity-90 active:scale-[0.97]"
            onClick={accept}
          >
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
