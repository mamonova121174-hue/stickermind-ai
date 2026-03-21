import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="StickerMind AI" className="w-6 h-6" />
            <span className="font-display font-semibold text-sm text-foreground">
              StickerMind AI
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Оферта
            </Link>
            <Link to="/consent" className="hover:text-foreground transition-colors">
              Согласие на обработку ПД (152-ФЗ)
            </Link>
          </nav>

          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} StickerMind AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
