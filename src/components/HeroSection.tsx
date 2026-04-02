"use client";

import { useState } from "react";
import { createTranslator, Dictionary } from "@/lib/translation";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/LocalizedLink";
import {
  ArrowRight,
  Factory,
  DollarSign,
  Truck,
  Search,
  MapPin,
  Star,
} from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

const allFactories = [
  {
    factory: "Khon Kaen Packaging Co., Ltd.",
    province: "ขอนแก่น",
    price: "12.50",
    time: "5 days",
    badge: "Popular",
    rating: 4.9,
  },
  {
    factory: "Saraburi Plastic Factory",
    province: "สระบุรี",
    price: "11.20",
    time: "7 days",
    badge: "Best Value",
    rating: 4.8,
  },
  {
    factory: "Samut Prakan Packaging",
    province: "สมุทรปราการ",
    price: "14.00",
    time: "3 days",
    badge: "Fast",
    rating: 4.7,
  },
  {
    factory: "Chiang Mai BoxCraft",
    province: "เชียงใหม่",
    price: "13.50",
    time: "6 days",
    badge: "Eco",
    rating: 4.9,
  },
  {
    factory: "Nakhon Ratchasima Print",
    province: "นครราชสีมา",
    price: "10.80",
    time: "5 days",
    badge: "Low MOQ",
    rating: 4.6,
  },
  {
    factory: "Surat Thani Pack Hub",
    province: "สุราษฎร์ธานี",
    price: "12.00",
    time: "8 days",
    badge: "Premium",
    rating: 4.8,
  },
  {
    factory: "Chonburi Corrugated Co.",
    province: "ชลบุรี",
    price: "11.50",
    time: "4 days",
    badge: "Top Rated",
    rating: 5.0,
  },
  {
    factory: "Rayong Green Pack",
    province: "ระยอง",
    price: "13.00",
    time: "5 days",
    badge: "Eco",
    rating: 4.7,
  },
  {
    factory: "Bangkok Premium Box",
    province: "กรุงเทพฯ",
    price: "15.00",
    time: "2 days",
    badge: "Express",
    rating: 4.9,
  },
  {
    factory: "Udon Thani Packaging",
    province: "อุดรธานี",
    price: "10.50",
    time: "6 days",
    badge: "Budget",
    rating: 4.5,
  },
];

const HeroSection = ({ dict }: { dict: Dictionary }) => {
  const t = createTranslator(dict);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFactories = allFactories.filter(
    (f) =>
      f.factory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.province.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/15 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-bold text-primary tracking-wide">
                {t("home.heroBadge")}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="space-y-3">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                {t("home.heroTitleMain")}
              </span>
              <span className="relative block text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b15fce] via-[#9b7dd4] to-[#76b3cf] animate-gradient bg-[length:200%_auto] drop-shadow-sm">
                  {t("home.heroTitleHighlight")}
                </span>
                <span className="absolute -inset-4 bg-gradient-to-r from-[#b15fce]/15 via-[#9b7dd4]/10 to-[#76b3cf]/15 blur-3xl rounded-full -z-10" />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed font-medium"
            >
              {t("home.heroSubtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Link href="/register">
                <Button
                  variant="hero"
                  size="xl"
                  className="shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 px-10 py-7 text-lg font-bold rounded-2xl"
                >
                  {t("common.getStarted")}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="soft"
                  size="xl"
                  className="glass-premium hover:bg-white/20 transition-all duration-300 px-10 py-7 text-lg font-bold rounded-2xl"
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
            className="relative lg:pl-8"
          >
            <div className="relative flex items-end justify-center gap-4">
              {}
              <div className="relative w-full max-w-xl">
                <div className="bg-card border border-border/50 rounded-2xl shadow-soft overflow-hidden">
                  {}
                  <div className="bg-muted/50 px-4 py-2.5 flex items-center gap-2.5 border-b border-border/30">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 bg-background/50 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                      kumopack.com/quotes
                    </div>
                  </div>

                  {}
                  <div className="p-4 md:p-5 space-y-3 bg-gradient-to-b from-background to-muted/20">
                    {}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse-soft" />
                        <span className="text-[10px] md:text-xs font-black tracking-wider uppercase text-muted-foreground/60">
                          {t("home.quoteComparison")}
                        </span>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-primary/20 text-[8px] md:text-[10px] font-black text-primary italic border border-primary/30 tracking-wider">
                        {t("home.realTime")}
                      </div>
                    </div>

                    {}
                    <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2.5 border border-border/30 focus-within:border-primary/40 transition-colors">
                      <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                      <input
                        type="text"
                        placeholder="ค้นหาโรงงาน หรือจังหวัด..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-xs md:text-sm placeholder:text-muted-foreground/50 focus:outline-none text-foreground"
                      />
                    </div>

                    {}
                    <div className="max-h-[240px] md:max-h-[280px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {filteredFactories.length === 0 ? (
                        <div className="text-center py-8 text-xs text-muted-foreground">
                          ไม่พบโรงงานที่ค้นหา
                        </div>
                      ) : (
                        filteredFactories.map((quote, index) => (
                          <motion.div
                            key={quote.factory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index, duration: 0.3 }}
                            className="bg-card/80 border border-border/30 rounded-xl p-3 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group/item"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
                                  <Factory className="w-4 h-4 text-primary" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs md:text-sm font-semibold text-foreground truncate group-hover/item:text-primary transition-colors">
                                    {quote.factory}
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                                    <MapPin className="w-2.5 h-2.5" />
                                    {quote.province}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                                <span className="px-2 py-0.5 rounded-full text-[7px] md:text-[8px] font-black uppercase bg-primary/10 text-primary border border-primary/20">
                                  {quote.badge}
                                </span>
                                <div className="flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-primary fill-primary" />
                                  <span className="text-[10px] font-bold text-primary">
                                    {quote.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] md:text-xs">
                              <div className="flex items-center gap-1 font-bold text-foreground">
                                <span className="text-primary">฿</span>{" "}
                                {quote.price}
                                <span className="text-muted-foreground/50 font-normal">
                                  {t("home.perPiece")}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Truck className="w-3 h-3 text-lavender-deep" />
                                <span>{quote.time}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="relative -mb-6 hidden md:block">
                <div className="bg-card border-2 border-border/50 rounded-3xl shadow-soft overflow-hidden w-44 lg:w-52">
                  <div className="bg-foreground/90 mx-auto w-16 h-4 rounded-b-xl" />
                  <div className="p-3 space-y-2 bg-gradient-to-b from-background to-muted/20">
                    <div className="flex items-center gap-1.5 bg-muted/50 rounded-md px-2 py-1.5">
                      <Search className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[9px] text-muted-foreground">
                        ค้นหาโรงงาน...
                      </span>
                    </div>
                    {[
                      {
                        name: "Bangkok Premium Box",
                        province: "กรุงเทพฯ",
                        price: "15.00",
                        rating: 4.9,
                      },
                      {
                        name: "Chonburi Corrugated",
                        province: "ชลบุรี",
                        price: "11.50",
                        rating: 5.0,
                      },
                      {
                        name: "Chiang Mai BoxCraft",
                        province: "เชียงใหม่",
                        price: "13.50",
                        rating: 4.9,
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-card/80 border border-border/30 rounded-lg p-2.5 space-y-1"
                      >
                        <div className="text-[9px] font-semibold text-foreground truncate">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                          <MapPin className="w-2 h-2" />
                          {item.province}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-primary font-bold">
                            ฿{item.price}/ชิ้น
                          </span>
                          <div className="flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 text-primary fill-primary" />
                            <span className="text-[8px] font-bold text-primary">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
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
