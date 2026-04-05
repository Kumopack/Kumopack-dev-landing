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

import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const articlesResponse = await blogApi.getArticles(1, 3);
  const articles = articlesResponse.data;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar lang={lang} dict={dict} />
      <PromoPopup />
      <HeroSection dict={dict} />
      <MockupCategoriesV2 dict={dict} />
      <SystemFeaturesSection dict={dict} />
      <GallerySection dict={dict} />
      <ValueProposition dict={dict} />
      <HowItWorks dict={dict} />
      <FeaturesSection dict={dict} />
      <CategoriesSection dict={dict} />
      <BlogSection articles={articles} dict={dict} />
      <LogoTicker dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
