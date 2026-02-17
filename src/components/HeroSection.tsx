"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Factory, DollarSign, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

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
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 transition-transform duration-75 ease-out scale-105"
      >
        <SafeImage
          src="/asset/hero-bg-premium.jpg"
          alt="Kumopack Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] w-12 h-12 bg-primary/20 backdrop-blur-3xl rounded-xl border border-white/20 transform -rotate-12 shadow-glow"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[20%] left-[10%] w-16 h-16 bg-lavender/30 backdrop-blur-3xl rounded-2xl border border-white/20 transform rotate-6 shadow-glow"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[20%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                {t("aboutUs.brandsTrusted") || "Trusted by 500+ global brands"}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tighter"
            >
              <span className="block drop-shadow-sm">
                {t("home.heroTitleMain")}
              </span>
              <span className="text-primary italic inline-block mt-2 drop-shadow-sm">
                {t("home.heroTitleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground/90 max-w-xl leading-relaxed font-medium"
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
                  className="shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 px-10 py-7 text-lg rounded-2xl"
                >
                  {t("common.getStarted")}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="soft"
                  size="xl"
                  className="glass-premium hover:bg-white/20 transition-all duration-300 px-10 py-7 text-lg rounded-2xl"
                >
                  {t("pricing.title")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:pl-16 hidden lg:block"
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

            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/30 blur-[120px] -z-10 animate-pulse-soft" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lavender/40 blur-[150px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
