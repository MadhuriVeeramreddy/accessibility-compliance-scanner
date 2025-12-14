import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhoIsItForSection from "@/components/WhoIsItForSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <WhySection />
        <HowItWorksSection />
        <FeaturesSection />
        <WhoIsItForSection />
        <WhyDifferentSection />
        <FAQSection />
        {/* <TestimonialsSection /> */}
      </main>
      <Footer />
    </div>
  );
}

