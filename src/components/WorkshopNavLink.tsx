"use client";

import { useState } from "react";
import { Sparkles, Box } from "lucide-react";
import { createTranslator, Dictionary } from "@/lib/translation";
import { Animated3DBox } from "@/components/Animated3DBox";

const WorkshopNavLink = ({ dict }: { dict: Dictionary }) => {
  const t = createTranslator(dict);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={
          process.env.NEXT_PUBLIC_MOCKUP_SITE_URL ||
          "https://mockup.kumopack.com"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-pink-400/10 border border-amber-300/30 text-foreground hover:from-amber-400/20 hover:via-orange-400/20 hover:to-pink-400/20 hover:border-amber-400/50 hover:shadow-[0_0_16px_rgba(251,191,36,0.15)] transition-all duration-300"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-medium text-sm">{t("nav.workshop")}</span>
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
      </a>

      {/* Hover dropdown */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 transition-all duration-300 z-50 ${
          hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-float p-5 w-[240px]">
          {/* Animated 3D Box */}
          <div className="flex justify-center mb-3">
            <Animated3DBox size={80} speed={6} />
          </div>

          {/* Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-foreground mb-1">
              <Box className="w-3.5 h-3.5 text-amber-500" />
              3D Mockup
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">
              {t("nav.desc.workshop") || "ออกแบบกล่องและดู 3D แบบเรียลไทม์"}
            </p>
          </div>
        </div>
        {/* Arrow */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card/95 border-l border-t border-border/50 rotate-45" />
      </div>
    </div>
  );
};

export default WorkshopNavLink;
