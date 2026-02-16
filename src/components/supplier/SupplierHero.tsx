"use client";

import { motion } from "framer-motion";
import { Supplier } from "@/data/suppliers";
import { SafeImage } from "@/components/ui/safe-image";

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
        <div className="h-[280px] md:h-[380px] rounded-[2.5rem] overflow-hidden shadow-float border border-border/10 relative">
          <SafeImage
            src={supplier.image}
            alt={supplier.name}
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/10" />
        </div>

        <div className="absolute -bottom-12 left-6 md:left-10 flex items-end gap-5 md:gap-6 z-20">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-[2rem] bg-card p-5 md:p-6 shadow-float border border-border/50 backdrop-blur-xl group hover:-translate-y-1 transition-transform duration-500">
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
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[9px] font-black uppercase tracking-widest backdrop-blur-sm border border-primary/10">
                  Verified Supplier
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-[9px] font-black uppercase tracking-widest backdrop-blur-sm border border-green-500/10">
                  Gold Member
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground drop-shadow-sm">
                {supplier.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-16 md:hidden space-y-3 px-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/5">
            Verified
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[8px] font-black uppercase tracking-widest border border-green-500/5">
            Gold
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight">{supplier.name}</h1>
      </div>
    </motion.div>
  );
};
