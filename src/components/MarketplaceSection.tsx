"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Check } from "lucide-react";
// Image import removed

const benefits = [
  "No minimum orders",
  "Ready-to-ship packaging",
  "Premium quality materials",
  "Fast 2-3 day delivery",
];

const MarketplaceSection = () => {
  return (
    <section id="marketplace" className="py-24 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-float">
              <img
                src="/asset/marketplace.jpg"
                alt="Small business owner with Kumopack packaging"
                className="w-full h-auto object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 floating-card px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">10,000+ Products</p>
                  <p className="text-xs text-muted-foreground">Ready to ship today</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-lavender/50 blur-3xl -z-10" />
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2 animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium">
              Retail Marketplace
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              No minimums?
              <span className="text-primary"> No problem.</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-lg">
              Shop our retail marketplace for ready-to-use packaging. Perfect for small businesses,
              startups, and anyone who needs quality packaging without the bulk order requirements.
            </p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-lavender flex items-center justify-center">
                    <Check className="w-4 h-4 text-purple-soft" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="xl">
              <Package className="w-5 h-5" />
              Browse Marketplace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
