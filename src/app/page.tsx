import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import DesignerSection from "@/components/DesignerSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import CategoriesSection from "@/components/CategoriesSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import LogoTicker from "@/components/LogoTicker";
import Footer from "@/components/Footer";
import { PromoPopup } from "@/components/PromoPopup";
import { blogApi } from "@/lib/blog-api";

export default async function Home() {
  const articlesResponse = await blogApi.getArticles(1, 3);
  const articles = articlesResponse.data;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PromoPopup />
      <HeroSection />
      <GallerySection />
      <ValueProposition />
      <HowItWorks />
      <FeaturesSection />
      <DesignerSection />
      <MarketplaceSection />
      <CategoriesSection />
      <BlogSection articles={articles} />
      <LogoTicker />
      <Footer />
    </main>
  );
}
