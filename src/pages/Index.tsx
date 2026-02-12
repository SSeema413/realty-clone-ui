import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrowseHomes from "@/components/BrowseHomes";
import FindAgentSection from "@/components/FindAgentSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BrowseHomes />
        <FindAgentSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
