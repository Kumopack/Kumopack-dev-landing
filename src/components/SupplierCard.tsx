"use client";

import { motion } from "framer-motion";
import Link from "@/components/common/LocalizedLink";
import {
  Star,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Factory,
  Package,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { Supplier } from "@/data/suppliers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

interface SupplierCardProps {
  supplier: Supplier;
  layout: "grid" | "list";
  index: number;
}

export default function SupplierCard({
  supplier,
  layout,
  index,
}: SupplierCardProps) {
  const isGrid = layout === "grid";

  const isVerified = supplier.isVerified;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group bg-white rounded-[1.5rem] border ${
        isVerified
          ? "border-primary/40 shadow-sm shadow-primary/10"
          : "border-neutral-100"
      } hover:border-primary/50 hover:shadow-xl transition-all duration-500 overflow-hidden flex ${
        isGrid
          ? "flex-col"
          : "flex-col md:flex-row md:items-stretch md:h-[260px]"
      }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden shrink-0 ${
          isGrid ? "aspect-square w-full" : "h-48 w-full md:h-full md:w-[300px]"
        }`}
      >
        <SafeImage
          src={supplier.image || "/asset/thumb-supplier-no-img.png"}
          fallbackSrc="/asset/thumb-supplier-no-img.png"
          alt={supplier.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        {isVerified && (
          <div className="absolute top-3 left-3 z-10">
            <VerifiedBadge />
          </div>
        )}

        {/* Logo Overlay */}
        <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white p-1 shadow-lg shadow-black/10">
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-50">
            <SafeImage
              src={supplier.logo || "/asset/logo-supplier-no-img.png"}
              fallbackSrc="/asset/logo-supplier-no-img.png"
              alt={`${supplier.name} logo`}
              fill
              className="object-contain mix-blend-multiply"
            />
          </div>
          {isVerified && (
            <div
              className="absolute -top-1.5 -right-1.5 bg-green-500 text-white rounded-full p-0.5 border-2 border-white shadow-sm"
              title="Verified Producer"
            >
              <CheckCircle2 className="w-2.5 h-2.5" />
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold text-white">
            {supplier.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col relative h-full p-4 md:p-5">
        <div className="flex-1 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  {supplier.code && (
                    <span className="text-[10px] font-bold text-muted-foreground bg-neutral-100 px-1.5 py-0.5 rounded-md border border-neutral-200">
                      {supplier.code}
                    </span>
                  )}
                  {isVerified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
                      <Award className="w-3 h-3 text-amber-500" />
                      Guarantee
                    </span>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 flex items-center gap-2">
                  {supplier.displayTitle || supplier.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-medium">
                  {supplier.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-muted-foreground mb-2">
            <div className="flex items-start gap-1.5 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100 max-w-full w-full">
              <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0 mt-0.5" />
              <span className="line-clamp-2 font-medium leading-relaxed">
                {supplier.address}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100">
              <Package className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span className="truncate max-w-[150px] font-medium">
                {supplier.specialized}
              </span>
            </div>
            {supplier.stats.orderAmount && (
              <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <span className="font-medium">
                  {supplier.stats.orderAmount} Orders
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Features (Icons) - Pushed to bottom */}
        <div className="mt-2 pt-2 border-t border-dashed border-neutral-200">
          <div className="flex flex-wrap gap-2">
            {supplier.features.slice(0, 4).map((feature, i) => (
              <Popover key={feature.id || i}>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-neutral-50 border border-neutral-200/50 cursor-pointer hover:bg-neutral-100 hover:scale-105 hover:border-primary/20 transition-all duration-200">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="max-w-full max-h-full object-contain opacity-80"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3 shadow-xl border-neutral-100 bg-white/95 backdrop-blur-md z-[60]">
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                        <img
                          src={feature.icon}
                          alt=""
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <h4 className="font-semibold text-sm text-foreground leading-tight">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/10 ml-2 py-0.5">
                      {feature.description}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
            {supplier.features.length > 4 && (
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center justify-center px-2 py-1 rounded-lg bg-neutral-100 text-[10px] font-bold text-neutral-500 cursor-pointer hover:bg-neutral-200 transition-colors h-8">
                    +{supplier.features.length - 4}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4" align="end">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100">
                    <h4 className="font-bold text-sm">
                      All Features ({supplier.features.length})
                    </h4>
                  </div>
                  <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                    {supplier.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-white border border-neutral-100 rounded-md p-1">
                          <img
                            src={feature.icon}
                            alt=""
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">
                            {feature.title}
                          </p>
                          {feature.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>

        {/* Footer / Action - Positioned for compact layout */}
        <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-medium text-neutral-500">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-foreground font-bold">{supplier.rating}</span>
            <span className="text-neutral-400">
              ({supplier.stats.orderAmount})
            </span>
          </div>
          <Link
            href={`/supplier/${supplier.slug || supplier.id}`}
            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
          >
            View Profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
