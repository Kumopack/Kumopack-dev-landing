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
const SystemFeaturesSection = dynamic(
  () => import("@/components/SystemFeaturesSection"),
);
const SystemFeaturesV2 = dynamic(() => import("@/components/SystemFeaturesV2"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const LogoTicker = dynamic(() => import("@/components/LogoTicker"));
const MockupCategoriesV2 = dynamic(
  () => import("@/components/MockupCategoriesV2"),
);

export default async function Home() {
  const articlesResponse = await blogApi.getArticles(1, 3);
  const articles = articlesResponse.data;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PromoPopup />
      <HeroSection />
      {}
      <MockupCategoriesV2 />

      {}
      <section className="space-y-32 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-12">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] border border-primary/20">
              Option A: Original Design
            </span>
          </div>
          <SystemFeaturesSection />
        </div>

        {/* <div className="max-w-6xl mx-auto px-4 pt-24 border-t border-border/40">
          <div className="flex justify-center mb-12">
            <span className="px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-black uppercase tracking-[0.2em] border border-brand-purple/20">
              Option B: New Layout
            </span>
          </div>
          <SystemFeaturesV2 />
        </div> */}
      </section>

      <ValueProposition />
      <HowItWorks />
      <FeaturesSection />
      {}
      {}
      <CategoriesSection />
      <BlogSection articles={articles} />
      <LogoTicker />
      <Footer />
    </main>
  );
}
