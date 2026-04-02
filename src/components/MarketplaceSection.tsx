"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Check } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

const benefits = [
  "marketplace.benefits.noMin",
  "marketplace.benefits.ready",
  "marketplace.benefits.premium",
  "marketplace.benefits.fast",
];

const MarketplaceSection = () => {
  const { t } = useTranslation();
  return (
    <section
      id="marketplace"
      className="py-24 bg-white relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-accent/20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-float group">
              <SafeImage
                src="/asset/marketplace-premium.png"
                alt="Small business owner with Kumopack packaging"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-8 left-8 floating-card px-6 py-4 flex items-center gap-4 bg-white/90"
              >
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {t("marketplace.statValue")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("marketplace.statLabel")}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-primary/10 blur-[100px] -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-premium text-purple-soft text-sm font-bold tracking-wide uppercase">
              {t("marketplace.badge")}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t("marketplace.title")}
              <span className="text-primary italic">
                {" "}
                {t("marketplace.highlight")}
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t("marketplace.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-transparent hover:border-primary/20 hover:bg-white transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">
                    {t(benefit)}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="xl" className="shadow-glow group">
              <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t("marketplace.cta")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
