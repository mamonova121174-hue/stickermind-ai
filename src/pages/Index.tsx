import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
// 1. Проверь, что этот импорт есть
import AnimatedStickersSection from "@/components/AnimatedStickersSection"; 
import Pricing from "./Pricing"; // Проверь путь к файлу
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <Header />
      <main>
        {/* Твой восстановленный Hero со всеми 4 экранами */}
        <HeroSection />

        {/* 2. Добавь эту строку здесь, чтобы мстикеры появились под генератором */}
        <AnimatedStickersSection />
<Pricing />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
