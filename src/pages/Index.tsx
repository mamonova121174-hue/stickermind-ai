import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection"; 
import AnimatedStickersSection from "@/components/AnimatedStickersSection"; 
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Главный экран */}
        <HeroSection />

        {/* 2. Блок "Один персонаж — пять стилей" (HowItWorks) */}
        <HowItWorksSection />

        {/* 3. Блок "Анимированные стикеры" С НАШЕЙ НОВОЙ КНОПКОЙ И БАЛАНСОМ */}
        <AnimatedStickersSection />

        {/* 4. Вопросы */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
