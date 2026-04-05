import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, Coins, Plus } from "lucide-react";
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
    { label: "Тарифы", href: "#pricing" }, // Убрали слэш, теперь это переход по ID
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="StickerMind AI логотип" className="w-8 h-8" />
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Sticker<span className="text-gradient">Mind</span>
            </span>
          </Link>

          {/* Навигация (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Правая часть: Баланс и Кнопки */}
          <div className="hidden md:flex items-center gap-4">
            {/* Улучшенный блок баланса */}
            <div 
              onClick={() => setPricingOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 cursor-pointer transition-all group"
            >
              <div className="relative">
                <Coins className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                <span className="absolute inset-0 bg-yellow-500/20 blur-sm rounded-full animate-pulse"></span>
              </div>
              <span className="font-bold text-sm tabular-nums">{balance ?? 0}</span>
              <div className="bg-primary/20 p-0.5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus className="w-3 h-3" />
              </div>
            </div>

            <Button
              size="sm"
              className="bg-gradient-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.97] transition-all"
              onClick={() => navigate("/#generator")}
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Создать
            </Button>
          </div>

          {/* Бургер-меню (Mobile) */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Мобильное выпадающее меню */}
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="container py-6 flex flex-col gap-4">
              <div 
                className="flex items-center justify-between bg-secondary/50 p-4 rounded-2xl border border-border"
                onClick={() => { setPricingOpen(true); setMenuOpen(false); }}
              >
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Твой баланс</p>
                    <p className="text-lg font-bold">{balance ?? 0} 🪙</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full border-primary/50 text-primary">
                  Пополнить
                </Button>
              </div>
              
              <div className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-base font-medium py-3 border-b border-border/50 text-foreground/80"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              
              <Button
                className="bg-gradient-primary text-primary-foreground py-6 text-lg font-bold mt-2"
                onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
              >
                Личный кабинет
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
