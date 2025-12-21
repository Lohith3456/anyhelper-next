import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import ServiceCategories from "@/components/landing/service-categories";
import HowItWorks from "@/components/landing/how-it-works";
import CtaSection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ServiceCategories />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
