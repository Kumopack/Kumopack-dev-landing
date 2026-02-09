"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import { Supplier } from "@/data/suppliers";
import { SafeImage } from "@/components/ui/safe-image";
import { useState } from "react";

interface SupplierCapabilitiesProps {
  features: Supplier["features"];
}

export const SupplierCapabilities = ({
  features,
}: SupplierCapabilitiesProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
        <span className="p-2 rounded-xl bg-coral/50 text-coral-foreground">
          <Award className="w-5 h-5" />
        </span>
        Strength in <span className="text-primary italic">Every Layer</span>
      </h2>

      <div className="flex flex-wrap gap-4 p-6 md:p-8 rounded-[2rem] bg-card/30 border border-border/50 backdrop-blur-xl">
        {features.map((feature, idx) => (
          <FeatureChip key={feature.id || idx} feature={feature} />
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

const FeatureChip = ({ feature }: { feature: Supplier["features"][0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-12 h-12 rounded-full bg-white shadow-lg border border-border/50 p-2.5 cursor-help flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-accent/20"
      >
        <SafeImage
          src={feature.icon}
          alt={feature.title}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 w-64 max-w-[90vw] p-4 rounded-2xl bg-foreground text-background shadow-2xl pointer-events-none"
          >
            <div className="space-y-1 break-words">
              <p className="text-xs font-black uppercase tracking-widest text-primary/80">
                {feature.title}
              </p>
              <p className="text-sm font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
