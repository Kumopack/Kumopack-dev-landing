import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { PromoPopup } from "@/components/PromoPopup";
import { blogApi } from "@/lib/blog-api";
import dynamic from "next/dynamic";

const ValueProposition = dynamic(() => import("@/components/ValueProposition"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const DesignerSection = dynamic(() => import("@/components/DesignerSection"));
const MarketplaceSection = dynamic(
  () => import("@/components/MarketplaceSection"),
);
const CategoriesSection = dynamic(
  () => import("@/components/CategoriesSection"),
);
const GallerySection = dynamic(() => import("@/components/GallerySection"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const LogoTicker = dynamic(() => import("@/components/LogoTicker"));

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
