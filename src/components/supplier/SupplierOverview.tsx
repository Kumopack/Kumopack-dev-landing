"use client";

import { Factory, MapPin } from "lucide-react";
import { Supplier } from "@/data/suppliers";

interface SupplierOverviewProps {
  supplier: Supplier;
}

export const SupplierOverview = ({ supplier }: SupplierOverviewProps) => {
  return (
    <section className="space-y-6 animate-fade-up">
      <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
        <span className="p-2 rounded-xl bg-lavender/50 text-purple-soft">
          <Factory className="w-5 h-5" />
        </span>
        Factory <span className="text-primary italic">Overview</span>
      </h2>
      <div className="bg-card/40 backdrop-blur-sm p-6 md:p-10 rounded-[2.5rem] border border-border/50 shadow-soft space-y-10 group hover:bg-card/60 transition-colors duration-500">
        <p className="text-xl md:text-2xl font-black text-foreground/90 leading-tight tracking-tight">
          "{supplier.tagline}"
        </p>
        <div
          className="max-w-none text-muted-foreground leading-relaxed font-medium space-y-4 text-sm [&_p]:mb-3"
          dangerouslySetInnerHTML={{ __html: supplier.description }}
        />

        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-[2rem] bg-accent/30 border border-border/20 items-center hover:shadow-float transition-all group/loc">
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--glass))] backdrop-blur-md border border-[hsl(var(--glass-border))] flex items-center justify-center shrink-0 shadow-soft group-hover/loc:scale-110 transition-transform">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center md:text-left space-y-1">
            <div className="text-[9px] font-black uppercase text-primary tracking-[0.2em] mb-1">
              FACTORY HEADQUARTER
            </div>
            <div className="text-lg md:text-xl font-black">
              {supplier.address}
            </div>
            <div className="text-xs text-muted-foreground font-bold tracking-tight">
              {supplier.location}, Thailand
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
