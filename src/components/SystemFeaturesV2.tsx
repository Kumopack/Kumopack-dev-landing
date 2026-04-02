"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BarChart3,
  Clock,
  ShieldCheck,
  MapPin,
  Star,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const SystemFeaturesV2 = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"buyers" | "manufacturers">(
    "buyers",
  );

  const buyerFeatures = [
    {
      icon: Search,
      title: t("systemFeatures.buyerFeature1Title"),
      description: t("systemFeatures.buyerFeature1Desc"),
    },
    {
      icon: BarChart3,
      title: t("systemFeatures.buyerFeature2Title"),
      description: t("systemFeatures.buyerFeature2Desc"),
    },
    {
      icon: Clock,
      title: t("systemFeatures.buyerFeature3Title"),
      description: t("systemFeatures.buyerFeature3Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("systemFeatures.buyerFeature4Title"),
      description: t("systemFeatures.buyerFeature4Desc"),
    },
  ];

  const manufacturerFeatures = [
    {
      icon: Search,
      title: t("systemFeatures.factoryFeature1Title"),
      description: t("systemFeatures.factoryFeature1Desc"),
    },
    {
      icon: BarChart3,
      title: t("systemFeatures.factoryFeature2Title"),
      description: t("systemFeatures.factoryFeature2Desc"),
    },
    {
      icon: Clock,
      title: t("systemFeatures.factoryFeature3Title"),
      description: t("systemFeatures.factoryFeature3Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("systemFeatures.factoryFeature4Title"),
      description: t("systemFeatures.factoryFeature4Desc"),
    },
  ];

  const currentFeatures =
    activeTab === "buyers" ? buyerFeatures : manufacturerFeatures;

  return (
    <div className="space-y-10">
      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="inline-flex bg-muted/50 rounded-full p-1.5 border border-border/50">
          <button
            onClick={() => setActiveTab("buyers")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "buyers"
                ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("systemFeatures.buyerTab")}
          </button>
          <button
            onClick={() => setActiveTab("manufacturers")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "manufacturers"
                ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("systemFeatures.factoryTab")}
          </button>
        </div>
      </motion.div>

      {}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("systemFeatures.buyerTitle")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}{" "}
                <span className="text-gradient">
                  {activeTab === "buyers" ? "Buyers" : "Manufacturers"}
                </span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                {activeTab === "buyers"
                  ? t("systemFeatures.buyerSubtitle")
                  : t("systemFeatures.factorySubtitle")}
              </p>
            </div>

            <div className="space-y-4">
              {currentFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-brand-purple/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative flex items-end justify-center gap-4">
            {}
            <div className="relative">
              <div className="bg-card border border-border/50 rounded-xl shadow-soft overflow-hidden w-full max-w-md">
                {}
                <div className="bg-muted/50 px-3 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground">
                    kumopack.com/marketplace
                  </div>
                </div>
                {}
                <div className="p-4 space-y-3 bg-gradient-to-b from-background to-muted/20">
                  {}
                  <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Search factories...
                    </span>
                  </div>
                  {}
                  {[
                    {
                      name: "Premium Print Co.",
                      rating: 4.9,
                      location: "Bangkok, Sukhumvit",
                    },
                    {
                      name: "BoxCraft Industries",
                      rating: 4.8,
                      location: "Samut Prakan",
                    },
                  ].map((factory, idx) => (
                    <div
                      key={idx}
                      className="bg-card/80 border border-border/30 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm font-medium text-foreground">
                            {factory.name}
                          </h5>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {factory.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-brand-purple/10 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 text-brand-purple fill-brand-purple" />
                          <span className="text-xs font-medium text-brand-purple">
                            {factory.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Monitor className="w-5 h-5 text-muted-foreground mt-2" />
              </div>
            </div>

            {}
            <div className="relative -mb-4">
              <div className="bg-card border-2 border-border/50 rounded-3xl shadow-soft overflow-hidden w-36 md:w-44">
                {}
                <div className="bg-foreground/90 mx-auto w-16 h-4 rounded-b-xl" />
                {}
                <div className="p-3 space-y-2 bg-gradient-to-b from-background to-muted/20">
                  <div className="flex items-center gap-1.5 bg-muted/50 rounded-md px-2 py-1">
                    <Search className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      Search...
                    </span>
                  </div>
                  <div className="bg-card/80 border border-border/30 rounded-lg p-2 space-y-1">
                    <div className="text-[10px] font-medium text-foreground">
                      Quality Box Ltd.
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-brand-purple fill-brand-purple" />
                      <span className="text-[9px] text-brand-purple">4.9</span>
                    </div>
                  </div>
                  <div className="bg-card/80 border border-border/30 rounded-lg p-2 space-y-1">
                    <div className="text-[10px] font-medium text-foreground">
                      PackPro Factory
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-brand-purple fill-brand-purple" />
                      <span className="text-[9px] text-brand-purple">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Smartphone className="w-4 h-4 text-muted-foreground mt-2" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemFeaturesV2;
