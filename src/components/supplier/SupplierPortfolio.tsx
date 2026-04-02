"use client";

import { useState } from "react";
import { Boxes, ChevronDown, ChevronUp } from "lucide-react";
import { Supplier } from "@/data/suppliers";
import { SafeImage } from "@/components/ui/safe-image";

interface SupplierPortfolioProps {
  categories: Supplier["categories"];
  lang: string;
}

export const SupplierPortfolio = ({ categories, lang }: SupplierPortfolioProps) => {
  const language = lang;
  const [isExpanded, setIsExpanded] = useState(false);

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const showToggle = totalItems > 12;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
        <span className="p-2 rounded-xl bg-sky/50 text-sky-foreground">
          <Boxes className="w-5 h-5" />
        </span>
        {language === "th" ? (
          <>
            สินค้าแพ็กเกจจิ้ง{" "}
            <span className="text-primary italic">(Product Portfolio)</span>
          </>
        ) : (
          <>
            Product <span className="text-primary italic">Portfolio</span>
          </>
        )}
      </h2>

      <div className="relative">
        <div
          className={`space-y-8 transition-all duration-700 ease-in-out ${
            !isExpanded && showToggle ? "max-h-[400px] overflow-hidden" : ""
          }`}
        >
          {categories.map((cat, idx) => (
            <div
              key={cat.id || idx}
              className="p-6 md:p-8 rounded-[2rem] bg-accent/20 border border-border/10 space-y-6 transition-colors hover:bg-accent/30"
            >
              <h3 className="text-xl font-black flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full shadow-glow" />
                {cat.name}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="group/prod relative aspect-square rounded-2xl overflow-hidden bg-white border border-border/40 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer"
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      fill={true}
                      className="object-cover transition-transform duration-700 group-hover/prod:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/prod:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                      <p className="text-xs font-bold text-white text-center leading-tight">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlay & Toggle Button */}
        {showToggle && (
          <div
            className={`absolute bottom-0 left-0 right-0 flex justify-center pt-24 pb-0 ${
              !isExpanded
                ? "bg-gradient-to-t from-background via-background/80 to-transparent"
                : "mt-8"
            }`}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95 z-10"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View All Products <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
