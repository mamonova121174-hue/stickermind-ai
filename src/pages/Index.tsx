// src/pages/Index.tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GeneratorSection from "@/components/GeneratorSection"; // Рабочая зона
import AnimatedStickersSection from "@/components/AnimatedStickersSection"; // Галерея результатов
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Главный экран (Заголовок "СОЗДАЙ СТИКЕР") */}
        <HeroSection />

        {/* 2. Сама зона генерации (Где кнопка "Создать стикерпак") */}
        <GeneratorSection /> 
        
        {/* 3. Галерея (Сначала демо, потом - готовые стикеры юзера) */}
        <AnimatedStickersSection />

        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};
