"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${getAssetPath("/asset/hero-bg-premium.jpg")}")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium backdrop-blur-xl border border-white/30 shadow-glow"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-sm font-semibold text-foreground/90 tracking-wide uppercase">
                Trusted by 500+ global brands
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tighter"
            >
              <span className="block">
                {t("home.heroTitle").split(" ").length > 2
                  ? t("home.heroTitle").split(" ").slice(0, 3).join(" ")
                  : t("home.heroTitle")}
              </span>
              <span className="text-primary italic">
                {t("home.heroTitle").split(" ").length > 2
                  ? t("home.heroTitle").split(" ").slice(3).join(" ")
                  : ""}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl text-muted-foreground/80 max-w-xl leading-relaxed font-medium"
            >
              {t("home.heroSubtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Link href="/pricing">
                <Button
                  variant="hero"
                  size="xl"
                  className="shadow-glow hover:scale-110 active:scale-95 transition-all duration-300 px-8 py-6 text-lg"
                >
                  {t("common.getStarted")}
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="soft"
                  size="xl"
                  className="glass-premium hover:bg-white/20 transition-all duration-300 px-8 py-6 text-lg"
                >
                  {t("pricing.title")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Price Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:pl-16"
          >
            <div className="floating-card p-10 max-w-lg mx-auto hover:shadow-glow transition-all duration-700 hover:-translate-y-4 group">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse-soft" />
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-muted-foreground/60">
                    Live Sourcing Network
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-primary/20 text-[10px] font-black text-primary italic border border-primary/30 tracking-widest">
                  REAL-TIME
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    factory: "ShenZhen Pack Co.",
                    price: "$0.42",
                    time: "5-7 days",
                    badge: "Popular",
                    delay: 0.6,
                  },
                  {
                    factory: "GuangZhou Premium",
                    price: "$0.38",
                    time: "7-10 days",
                    badge: "Best Price",
                    delay: 0.7,
                  },
                  {
                    factory: "Dongguan Fast",
                    price: "$0.45",
                    time: "3-5 days",
                    badge: "Fast",
                    delay: 0.8,
                  },
                ].map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: quote.delay,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/15 hover:border-primary/40 transition-all duration-500 group/item cursor-pointer shadow-sm hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                          <Factory className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg text-foreground group-hover/item:text-primary transition-colors">
                          {quote.factory}
                        </span>
                      </div>
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/30">
                        {quote.badge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="p-1.5 rounded-lg bg-white/5">
                          <DollarSign className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-bold text-foreground text-xl">
                          {quote.price}
                          <span className="text-[12px] text-muted-foreground/60 ml-1">
                            /unit
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                        <Truck className="w-5 h-5 text-lavender-deep" />
                        <span className="italic">{quote.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/30 blur-[120px] -z-10 animate-pulse-soft" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lavender/40 blur-[150px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
