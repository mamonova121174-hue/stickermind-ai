import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection"; // Витрина 1: Стили
import AnimatedStickersSection from "@/components/AnimatedStickersSection"; // Витрина 2: Анимация
import GeneratorSection from "@/components/GeneratorSection"; // САМ ГЕНЕРАТОР (Рабочая зона)
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Заголовок и призыв */}
        <HeroSection />

        {/* 2. Показываем, что умеем делать стили (статику) */}
        <HowItWorksSection />

        {/* 3. Показываем, что умеем анимировать (+ кнопка-переход) */}
        <AnimatedStickersSection />

        {/* 4. САМА РАБОЧАЯ ЗОНА (Где списываются токены) */}
        <div id="generator" className="py-10"> 
           <GeneratorSection />
        </div>

        {/* 5. Ответы на вопросы */}
        <FAQSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
