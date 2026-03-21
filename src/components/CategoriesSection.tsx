"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Box, Printer, Ribbon, ShoppingBag, Cylinder, Mail } from "lucide-react";

const categories = [
  {
    icon: Box,
    nameKey: "categories.items.corrugated.name",
    descriptionKey: "categories.items.corrugated.desc",
    specs: ["Flexo Print", "Digital UV", "Custom Die-Cut"],
    color: "from-amber-100 to-orange-100",
  },
  {
    icon: Printer,
    nameKey: "categories.items.offset.name",
    descriptionKey: "categories.items.offset.desc",
    specs: ["Offset 4 Color", "Spot UV", "Embossing & Foil"],
    color: "from-violet-100 to-purple-100",
  },
  {
    icon: Ribbon,
    nameKey: "categories.items.tape.name",
    descriptionKey: "categories.items.tape.desc",
    specs: ["1-3 Color Print", "Strong Adhesive", "Custom Widths"],
    color: "from-blue-100 to-indigo-100",
  },
  {
    icon: ShoppingBag,
    nameKey: "categories.items.film.name",
    descriptionKey: "categories.items.film.desc",
    specs: ["Matte/Gloss Finish", "Resealable Zippers", "Stand-up Design"],
    color: "from-emerald-100 to-teal-100",
  },
  {
    icon: Cylinder,
    nameKey: "categories.items.tube.name",
    descriptionKey: "categories.items.tube.desc",
    specs: ["Custom Size", "Premium Finish", "Eco-Friendly"],
    color: "from-rose-100 to-pink-100",
  },
  {
    icon: Mail,
    nameKey: "categories.items.mailer.name",
    descriptionKey: "categories.items.mailer.desc",
    specs: ["Bubble Lined", "Self-Seal", "Custom Print"],
    color: "from-sky-100 to-cyan-100",
  },
];

const CategoriesSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="categories" className="py-24 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium mb-4">
            {t("categories.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("categories.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("categories.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer group"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div
                className={`
                  p-6 rounded-3xl border border-border/50 bg-card text-center h-full
                  transition-all duration-500 hover:shadow-float hover:-translate-y-2
                  ${activeCategory === index ? "shadow-float -translate-y-2" : ""}
                `}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}
                >
                  <category.icon className="w-8 h-8 text-foreground/70" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm min-h-[2.5rem] flex items-center justify-center">
                  {t(category.nameKey)}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {t(category.descriptionKey)}
                </p>
              </div>

              <div
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 z-20
                  floating-card p-4 transition-all duration-300
                  ${activeCategory === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
              >
                <p className="text-sm font-medium text-foreground mb-3">
                  {t("categories.specs")}
                </p>
                <div className="space-y-2">
                  {category.specs.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
