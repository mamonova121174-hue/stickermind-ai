import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Стили", href: "/#styles" },
    { label: "Тарифы", href: "/pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
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
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/dashboard")}
          >
            Войти
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
  );
};

export default Header;
