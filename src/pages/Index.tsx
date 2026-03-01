import HeroSection from "@/components/landing/HeroSection";
import ImpactCounter from "@/components/landing/ImpactCounter";
import EcoBenefitsSection from "@/components/landing/EcoBenefitsSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ImpactCounter />
      <EcoBenefitsSection />
      <Footer />
    </div>
  );
};

export default Index;
