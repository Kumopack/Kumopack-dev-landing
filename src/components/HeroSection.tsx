"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Factory, DollarSign, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/asset/hero-bg.jpg")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 backdrop-blur-sm border border-border/50">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-sm text-muted-foreground">Trusted by 500+ brands</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              {t('home.heroTitle')}
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/pricing">
                <Button variant="hero" size="xl">
                  {t('common.getStarted')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="soft" size="xl">
                  {t('pricing.title')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Floating Price Card */}
          <div className="relative lg:pl-12">
            <div className="floating-card p-6 max-w-md mx-auto animate-float">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-sm font-medium text-muted-foreground">Live Price Comparison</span>
              </div>

              <div className="space-y-4">
                {[
                  { factory: "ShenZhen Pack Co.", price: "$0.42", time: "5-7 days", badge: "Popular" },
                  { factory: "GuangZhou Premium", price: "$0.38", time: "7-10 days", badge: "Best Price" },
                  { factory: "Dongguan Fast", price: "$0.45", time: "3-5 days", badge: "Fast" },
                ].map((quote, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-accent/50 border border-border/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Factory className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{quote.factory}</span>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-lavender text-purple-soft">
                        {quote.badge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="w-3 h-3" />
                        <span>{quote.price}/unit</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Truck className="w-3 h-3" />
                        <span>{quote.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-lavender/50 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
