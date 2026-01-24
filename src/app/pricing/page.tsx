"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Info, Star, ShoppingBag, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const buyerPlans = [
    {
        name: "Starter",
        price: "Free",
        desc: "For small brands starting their packaging journey.",
        features: ["Access to 50+ factories", "Standard material options", "Basic design workshop", "Standard support"],
        button: "Get Started",
        variant: "outline"
    },
    {
        name: "Pro",
        price: "$49",
        unit: "/mo",
        desc: "Comprehensive solution for scaling brands.",
        features: ["Full access to 200+ factories", "Premium material options", "Advanced design tools", "Priority quote fulfillment", "Dedicated account manager"],
        button: "Join Pro",
        variant: "hero",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For large organizations with complex needs.",
        features: ["Private supplier networks", "Custom logistics integration", "Unlimited quote requests", "Early access to new materials", "Full API access"],
        button: "Talk to Sales",
        variant: "outline"
    }
];

const supplierPlans = [
    {
        name: "Verified",
        price: "Free",
        desc: "Get discovered by thousands of brands.",
        features: ["Basic business profile", "Receive standard RFQs", "Community forum access", "Standard analytics"],
        button: "List Factory",
        variant: "outline"
    },
    {
        name: "Premium",
        price: "$99",
        unit: "/mo",
        desc: "Boost your visibility and win more orders.",
        features: ["Top placement in search", "Featured factory badge", "Unlimited RFQ responses", "Advanced sales analytics", "Direct marketing tools"],
        button: "Go Premium",
        variant: "hero",
        popular: true
    },
    {
        name: "Industrial",
        price: "Custom",
        desc: "Scalable tools for large manufacturing groups.",
        features: ["Multi-factory management", "White-label quoting system", "Priority support line", "ERP integration API", "Dedicated success manager"],
        button: "Contact Sales",
        variant: "outline"
    }
];

export default function PricingPage() {
    const [audience, setAudience] = useState<"buyer" | "supplier">("buyer");
    const { t } = useLanguage();

    const activePlans = audience === "buyer" ? buyerPlans : supplierPlans;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        {audience === "buyer" ? t('pricing.simple') : t('pricing.industrial')} <span className="text-primary">{t('pricing.title')}</span>
                    </h1>

                    {/* Audience Toggle */}
                    <div className="inline-flex p-1 bg-muted/50 backdrop-blur-md rounded-2xl border border-border/50 mb-12">
                        <button
                            onClick={() => setAudience("buyer")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${audience === "buyer" ? "bg-white shadow-soft text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            {t('pricing.forBuyers')}
                        </button>
                        <button
                            onClick={() => setAudience("supplier")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${audience === "supplier" ? "bg-white shadow-soft text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <Factory className="w-4 h-4" />
                            {t('pricing.forSuppliers')}
                        </button>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {audience === "buyer"
                            ? "Choose the plan that fits your brand's stage. No hidden fees, ever."
                            : "Accelerate your factory growth with our specialized supplier tools."}
                    </p>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatePresence mode="wait">
                            {activePlans.map((plan, idx) => (
                                <motion.div
                                    key={`${audience}-${plan.name}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`bg-card p-10 rounded-[2.5rem] border ${plan.popular ? "border-2 border-primary shadow-glow scale-105 z-10" : "border-border/50 hover:border-primary/30 shadow-soft"} transition-all flex flex-col relative`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                                            {t('pricing.mostPopular')}
                                        </div>
                                    )}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                        <div className="text-4xl font-bold mb-1">
                                            {plan.price}
                                            {plan.unit && <span className="text-lg text-muted-foreground">{plan.unit}</span>}
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-3">{plan.desc}</p>
                                    </div>
                                    <div className="space-y-4 mb-10 flex-1">
                                        {plan.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex gap-3 text-sm">
                                                <Check className="w-5 h-5 text-primary shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant={plan.variant as any} className="w-full rounded-2xl py-6 shadow-soft">
                                        {plan.button}
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Quote Disclaimer */}
            <section className="py-20 px-4 md:px-8 border-t border-border/50">
                <div className="container mx-auto max-w-4xl bg-muted/20 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Info className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">{t('pricing.unitCostsTitle')}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('pricing.unitCostsDesc')}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
