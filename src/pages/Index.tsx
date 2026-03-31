import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
// УДАЛИЛИ GeneratorSection, чтобы не было дубля!
import AnimatedStickersSection from "@/components/AnimatedStickersSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Здесь теперь ВСЕ 4 экрана, включая твой любимый генератор */}
        <HeroSection />

        {/* Галерея анимированных стикеров */}
        <AnimatedStickersSection />

        {/* Вопросы */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
