"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import FeaturesSection from "@/components/FeaturesSection";
import DesignerSection from "@/components/DesignerSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import CategoriesSection from "@/components/CategoriesSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import LogoTicker from "@/components/LogoTicker";
import Footer from "@/components/Footer";
import { PromoPopup } from "@/components/PromoPopup";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PromoPopup />
      <HeroSection />
      <ValueProposition />
      <FeaturesSection />
      <DesignerSection />
      <MarketplaceSection />
      <CategoriesSection />
      <GallerySection />
      <BlogSection />
      <LogoTicker />
      <Footer />
    </main>
  );
}
