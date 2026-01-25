"use client";

import { Boxes } from "lucide-react";
import { Supplier } from "@/data/suppliers";

interface SupplierPortfolioProps {
    categories: Supplier["categories"];
}

import { SafeImage } from "@/components/ui/safe-image";

export const SupplierPortfolio = ({ categories }: SupplierPortfolioProps) => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <span className="p-2 rounded-xl bg-sky/50 text-sky-foreground">
                    <Boxes className="w-5 h-5" />
                </span>
                Product <span className="text-primary italic">Portfolio</span>
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {categories.map((cat, idx) => (
                    <div key={cat.id || idx} className="p-6 md:p-8 rounded-[2rem] bg-accent/20 border border-border/10 space-y-6 transition-colors hover:bg-accent/30">
                        <h3 className="text-xl font-black flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-primary rounded-full shadow-glow" />
                            {cat.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cat.items.map((item) => (
                                <div key={item.id} className="group/prod flex items-center gap-4 p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all shadow-soft hover:shadow-float">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-muted/20 shrink-0 relative">
                                        <SafeImage
                                            src={item.image}
                                            alt={item.name}
                                            fill={true}
                                            className="object-cover group-hover/prod:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-2">
                                        <p className="text-xs sm:text-sm font-black tracking-tight text-foreground leading-tight truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                                            Premium Finish
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

