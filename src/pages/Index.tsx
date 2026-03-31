import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GeneratorSection from "@/components/GeneratorSection";
import AnimatedStickersSection from "@/components/AnimatedStickersSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <GeneratorSection /> 
        <AnimatedStickersSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
