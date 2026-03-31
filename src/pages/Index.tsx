import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection"; // ЭТО НАШ ГЕНЕРАТОР
import AnimatedStickersSection from "@/components/AnimatedStickersSection"; // ГАЛЕРЕЯ ДЕМО/RESULTS
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <Header />
      <main>
        {/* 1. Главный экран (Заголовок "СОЗДАЙ СТИКЕР") */}
        <HeroSection />

        {/* 2. НАШ РАБОЧИЙ ГЕНЕРАТОР (с фиолетовой кнопкой и умным балансом) */}
        <HowItWorksSection /> 
        
        {/* 3. Галерея (Сначала демо, потом - готовые стикеры юзера) */}
        <AnimatedStickersSection />

        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
