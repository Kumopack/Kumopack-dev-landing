"use client";

import { MapPin, Printer, Award, Zap, Leaf, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    icon: MapPin,
    titleKey: "features.items.location.title",
    descKey: "features.items.location.desc",
    badgeKey: "features.items.location.badge",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Printer,
    titleKey: "features.items.printing.title",
    descKey: "features.items.printing.desc",
    badgeKey: "features.items.printing.badge",
    badgeColor: "bg-lavender text-purple-soft",
  },
  {
    icon: Award,
    titleKey: "features.items.badges.title",
    descKey: "features.items.badges.desc",
    badgeKey: "features.items.badges.badge",
    badgeColor: "bg-lavender text-purple-soft",
  },
  {
    icon: Zap,
    titleKey: "features.items.quotes.title",
    descKey: "features.items.quotes.desc",
    badgeKey: "features.items.quotes.badge",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Leaf,
    titleKey: "features.items.sustainable.title",
    descKey: "features.items.sustainable.desc",
    badgeKey: "features.items.sustainable.badge",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Clock,
    titleKey: "features.items.ondemand.title",
    descKey: "features.items.ondemand.desc",
    badgeKey: "features.items.ondemand.badge",
    badgeColor: "bg-lavender text-purple-soft",
  },
];

const FeaturesSection = () => {
  const { t } = useLanguage();
  return (
    <section id="features" className="py-24 bg-accent/30 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium mb-4">
            {t("features.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("features.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bento-card opacity-0 animate-fade-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-lavender flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-purple-soft" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${feature.badgeColor}`}
                >
                  {t(feature.badgeKey)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
