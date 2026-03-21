import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GeneratorSection from "@/components/GeneratorSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <GeneratorSection />
        <FAQSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
