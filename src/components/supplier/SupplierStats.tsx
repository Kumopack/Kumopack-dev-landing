"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Boxes, ShieldCheck } from "lucide-react";
import { Supplier } from "@/data/suppliers";

interface SupplierStatsProps {
    stats: Supplier["stats"];
}

export const SupplierStats = ({ stats }: SupplierStatsProps) => {
    const statItems = [
        { icon: Clock, label: "Heritage", value: stats.experience },
        { icon: Boxes, label: "Outflow", value: stats.capacity },
        { icon: ShieldCheck, label: "Orders", value: stats.orderAmount },
        { icon: Zap, label: "Lead", value: stats.leadTime }
    ];


    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <span className="p-2 rounded-xl bg-mint/50 text-mint-foreground">
                    <Zap className="w-5 h-5" />
                </span>
                Operational <span className="text-primary italic">DNA</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {statItems.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-[2rem] border border-border/30 shadow-soft bg-card overflow-hidden group text-center flex flex-col items-center gap-3 hover:border-primary/20 transition-all font-bold"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-black text-foreground tracking-tighter">{stat.value}</div>
                            <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
