import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTokens } from "@/components/TokenContext";
import PricingModal from "@/components/PricingModal";
import logo from "@/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const { balance } = useTokens();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Стили", href: "/#styles" },
    { label: "Тарифы", href: "/pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-glass">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="StickerMind AI логотип" className="w-8 h-8" />
            <span className="font-display font-bold text-lg text-foreground">
              Sticker<span className="text-gradient">Mind</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border/80 text-sm">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground tabular-nums">{balance}</span>
              <span className="text-muted-foreground">🪙</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 font-medium"
              onClick={() => setPricingOpen(true)}
            >
              Пополнить
            </Button>
            <Button
              size="sm"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all duration-150"
              onClick={() => navigate("/#generator")}
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Создать
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-fade-up">
            <div className="container py-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 py-2">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Баланс: {balance} 🪙</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-primary text-xs"
                  onClick={() => { setPricingOpen(true); setMenuOpen(false); }}
                >
                  Пополнить
                </Button>
              </div>
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted-foreground py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <Button
                className="bg-gradient-primary text-primary-foreground mt-2"
                onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
              >
                Войти
              </Button>
            </div>
          </div>
        )}
      </header>

      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
    </>
  );
};

export default Header;
