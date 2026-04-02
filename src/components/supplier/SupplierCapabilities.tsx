"use client";

import { Award } from "lucide-react";
import { Supplier } from "@/types/supplier";
import { SafeImage } from "@/components/ui/safe-image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SupplierCapabilitiesProps {
  features: Supplier["features"];
  lang: string;
}

export const SupplierCapabilities = ({
  features,
  lang,
}: SupplierCapabilitiesProps) => {
  const language = lang;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
        <span className="p-2 rounded-xl bg-coral/50 text-coral-foreground">
          <Award className="w-5 h-5" />
        </span>
        {language === "th" ? (
          <>
            จุดเด่นของเรา{" "}
            <span className="text-primary italic">(Highlights)</span>
          </>
        ) : (
          <>
            Strength in <span className="text-primary italic">Every Layer</span>
          </>
        )}
      </h2>

      <div className="flex flex-wrap gap-4 p-6 md:p-8 rounded-[2rem] bg-card/30 border border-border/50 backdrop-blur-xl">
        {features.map((feature, idx) => (
          <FeatureItem
            key={feature.id || idx}
            feature={feature}
            language={language}
          />
        ))}
        {features.length === 0 && (
          <p className="text-xs text-muted-foreground italic">
            No specific features listed.
          </p>
        )}
      </div>
    </section>
  );
};

const FeatureItem = ({
  feature,
  language,
}: {
  feature: Supplier["features"][0];
  language: string;
}) => {
  const title =
    language === "th" && feature.nameTh ? feature.nameTh : feature.title;

  const description = feature.description;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center gap-2 cursor-pointer group w-[88px]">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-border/50 p-3 group-hover:scale-110 group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-full h-full">
              <SafeImage
                src={feature.icon}
                alt={title}
                className="object-contain p-0.5"
              />
            </div>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight line-clamp-2 group-hover:text-foreground transition-colors">
            {title}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 rounded-xl shadow-xl border-border/50 bg-white/95 backdrop-blur-md">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 p-1.5 border border-border/20 shrink-0">
              <SafeImage
                src={feature.icon}
                alt={title}
                className="object-contain"
              />
            </div>
            <h4 className="font-bold text-sm leading-tight text-foreground">
              {title}
            </h4>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed pl-[52px]">
              {description}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
