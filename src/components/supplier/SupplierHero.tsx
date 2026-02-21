"use client";

import { motion } from "framer-motion";
import { Supplier } from "@/types/supplier";
import { SafeImage } from "@/components/ui/safe-image";

import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

interface SupplierHeroProps {
  supplier: Supplier;
}

export const SupplierHero = ({ supplier }: SupplierHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-24"
    >
      <div className="relative">
        <div className="h-[400px] md:h-[500px] rounded-[1.5rem] overflow-hidden shadow-float border border-border/10 relative group">
          <SafeImage
            src={supplier.image}
            alt={supplier.name}
            fill={true}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
        </div>

        <div className="absolute -bottom-12 left-6 md:left-10 flex items-end gap-5 md:gap-8 z-20">
          <div className="w-28 h-28 md:w-48 md:h-48 rounded-[1rem] bg-card p-4 md:p-6 shadow-float border border-border/50 backdrop-blur-xl group hover:-translate-y-2 transition-transform duration-500 flex items-center justify-center">
            <SafeImage
              src={supplier.logo}
              alt={`${supplier.name} Logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="pb-14 hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                {supplier.isVerified && <VerifiedBadge />}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground drop-shadow-sm leading-none">
                {supplier.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-20 md:hidden space-y-4 px-4">
        <div className="flex items-center gap-2 flex-wrap">
          {supplier.isVerified && <VerifiedBadge />}
          {supplier.isVerified && (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
              Gold
            </span>
          )}
        </div>
        <h1 className="text-3xl font-black tracking-tight leading-tight">
          {supplier.name}
        </h1>
      </div>
    </motion.div>
  );
};
