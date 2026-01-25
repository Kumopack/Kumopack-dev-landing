"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Factory, DollarSign, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/lib/utils";

const HeroSection = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${getAssetPath("/asset/hero-bg.jpg")}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium backdrop-blur-md border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-sm font-medium text-foreground/80">Trusted by 500+ global brands</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            >
              {t('home.heroTitle')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              {t('home.heroSubtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/pricing">
                <Button variant="hero" size="xl" className="shadow-glow hover:scale-105 transition-transform">
                  {t('common.getStarted')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="soft" size="xl" className="glass-premium hover:bg-white/10 transition-colors">
                  {t('pricing.title')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Price Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative lg:pl-12"
          >
            <div className="floating-card p-8 max-w-md mx-auto hover:shadow-glow transition-shadow duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse-soft" />
                  <span className="text-sm font-bold tracking-wider uppercase text-muted-foreground/80">Live Comparison</span>
                </div>
                <div className="px-2 py-1 rounded bg-accent/50 text-[10px] font-bold text-primary italic">REAL-TIME</div>
              </div>

              <div className="space-y-5">
                {[
                  { factory: "ShenZhen Pack Co.", price: "$0.42", time: "5-7 days", badge: "Popular", delay: 0.6 },
                  { factory: "GuangZhou Premium", price: "$0.38", time: "7-10 days", badge: "Best Price", delay: 0.7 },
                  { factory: "Dongguan Fast", price: "$0.45", time: "3-5 days", badge: "Fast", delay: 0.8 },
                ].map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: quote.delay, duration: 0.5 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Factory className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{quote.factory}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-primary/10 text-primary border border-primary/20">
                        {quote.badge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span className="font-medium">{quote.price}<span className="text-[10px] opacity-60">/unit</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Truck className="w-3.5 h-3.5 text-lavender-deep" />
                        <span className="font-medium italic">{quote.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/20 blur-[100px] -z-10 animate-pulse-soft" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-lavender/30 blur-[120px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
