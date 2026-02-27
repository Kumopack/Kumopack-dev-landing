"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GitCompareArrows,
  Clock,
  ShieldCheck,
  Handshake,
  FileText,
  MessageCircle,
  TrendingUp,
  CheckCircle2,
  Zap,
  Globe,
  BarChart3,
  Users,
  Timer,
  CreditCard,
  Award,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const buyerFeatures = [
  {
    icon: Search,
    titleKey: "buyerFeature1Title",
    descKey: "buyerFeature1Desc",
  },
  {
    icon: GitCompareArrows,
    titleKey: "buyerFeature2Title",
    descKey: "buyerFeature2Desc",
  },
  { icon: Clock, titleKey: "buyerFeature3Title", descKey: "buyerFeature3Desc" },
  {
    icon: ShieldCheck,
    titleKey: "buyerFeature4Title",
    descKey: "buyerFeature4Desc",
  },
];

const factoryFeatures = [
  {
    icon: Handshake,
    titleKey: "factoryFeature1Title",
    descKey: "factoryFeature1Desc",
  },
  {
    icon: FileText,
    titleKey: "factoryFeature2Title",
    descKey: "factoryFeature2Desc",
  },
  {
    icon: MessageCircle,
    titleKey: "factoryFeature3Title",
    descKey: "factoryFeature3Desc",
  },
  {
    icon: TrendingUp,
    titleKey: "factoryFeature4Title",
    descKey: "factoryFeature4Desc",
  },
];

const buyerHighlights = [
  {
    icon: Timer,
    valueKey: "buyerHighlight1Value",
    labelKey: "buyerHighlight1Label",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    valueKey: "buyerHighlight2Value",
    labelKey: "buyerHighlight2Label",
    color: "bg-lavender/60 text-lavender-deep",
  },
  {
    icon: CreditCard,
    valueKey: "buyerHighlight3Value",
    labelKey: "buyerHighlight3Label",
    color: "bg-mint/30 text-mint-foreground",
  },
  {
    icon: Award,
    valueKey: "buyerHighlight4Value",
    labelKey: "buyerHighlight4Label",
    color: "bg-coral/20 text-coral-foreground",
  },
];

const factoryHighlights = [
  {
    icon: Zap,
    valueKey: "factoryHighlight1Value",
    labelKey: "factoryHighlight1Label",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    valueKey: "factoryHighlight2Value",
    labelKey: "factoryHighlight2Label",
    color: "bg-lavender/60 text-lavender-deep",
  },
  {
    icon: BarChart3,
    valueKey: "factoryHighlight3Value",
    labelKey: "factoryHighlight3Label",
    color: "bg-mint/30 text-mint-foreground",
  },
  {
    icon: CheckCircle2,
    valueKey: "factoryHighlight4Value",
    labelKey: "factoryHighlight4Label",
    color: "bg-coral/20 text-coral-foreground",
  },
];

const SystemFeaturesSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"buyer" | "factory">("buyer");

  const features = activeTab === "buyer" ? buyerFeatures : factoryFeatures;
  const highlights =
    activeTab === "buyer" ? buyerHighlights : factoryHighlights;
  const title =
    activeTab === "buyer"
      ? t("systemFeatures.buyerTitle")
      : t("systemFeatures.factoryTitle");
  const subtitle =
    activeTab === "buyer"
      ? t("systemFeatures.buyerSubtitle")
      : t("systemFeatures.factorySubtitle");

  return (
    <section className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title & Subtitle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-header"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Tab Switcher */}
        <div className="inline-flex items-center bg-accent/50 dark:bg-white/5 rounded-full p-1.5 mb-12 border border-border">
          <button
            onClick={() => setActiveTab("buyer")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === "buyer"
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("systemFeatures.buyerTab")}
          </button>
          <button
            onClick={() => setActiveTab("factory")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === "factory"
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("systemFeatures.factoryTab")}
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Highlight Stats Panel (no images, pure CSS) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-highlights"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-float hover:-translate-y-1 transition-all duration-500 group"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-bold text-foreground mb-0.5">
                        {t(`systemFeatures.${item.valueKey}`)}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {t(`systemFeatures.${item.labelKey}`)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA-like info box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-lavender/30 border border-primary/10">
                <p className="text-sm font-semibold text-foreground mb-1">
                  {t(`systemFeatures.${activeTab}InfoTitle`)}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(`systemFeatures.${activeTab}InfoDesc`)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Feature List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-features"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="lg:col-span-3 space-y-0 divide-y divide-border"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group flex gap-5 py-7 first:pt-0 last:pb-0"
                  >
                    {/* Icon with connecting line */}
                    <div className="hidden sm:flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      {index < features.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent mt-3" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 sm:hidden">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {t(`systemFeatures.${feature.titleKey}`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`systemFeatures.${feature.descKey}`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SystemFeaturesSection;
