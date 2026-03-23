"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield,
  FileText,
  Lock,
  RefreshCcw,
  MapPin,
  Printer,
  MonitorSmartphone,
  Star,
  Layers,
  Zap,
  Hash,
  Headphones,
  ShieldCheck,
  Box,
  Palette,
  Factory,
  Truck,
  CreditCard,
  ClipboardList,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ────────── Icon maps (index-matched to locale arrays) ────────── */

const policyIcons: LucideIcon[] = [Shield, FileText, Lock, RefreshCcw];
const termIcons: LucideIcon[] = [Box, Palette, Factory, ClipboardList, Truck, CreditCard];
const advIcons: LucideIcon[] = [
  MapPin, Printer, MonitorSmartphone, Star, Layers, Zap, Hash, Headphones, ShieldCheck,
];

const tabKeys = ["policy", "terms", "advantages"] as const;

/* ────────────────────────── COMPONENT ────────────────────────── */

export default function PolicyPage() {
  const { t, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("policy");

  const policyKeys = ["security", "terms", "privacy", "refund"];
  const sections = dict.policy.platformTerms?.sections || [];
  const advItems = dict.policy.factoryAdvantages?.items || [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t("policy.title")}
          </h1>
          <p className="text-muted-foreground mb-2">
            {t("policy.supportEmail")}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-4">
            <span>{t("policy.forBuyers")}</span>
            <span>•</span>
            <span>{t("policy.forSuppliers")}</span>
            <span>•</span>
            <span>{t("policy.more")}</span>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Current as of 20 Jan 2022
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-20 md:top-24 z-30 bg-background/90 backdrop-blur-md border-y border-border/50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2 py-3">
            {tabKeys.map((key) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative px-5 md:px-7 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                    isActive
                      ? "text-white"
                      : "text-muted-foreground/50 hover:text-primary"
                  }`}
                >
                  <span className="relative z-10">
                    {t(`policy.tabs.${key}`)}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="policyTab"
                      className="absolute inset-0 bg-primary shadow-glow-sm z-0 rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {/* ─── Tab 1: Policies ─── */}
            {activeTab === "policy" && (
              <motion.div
                key="policy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {policyKeys.map((key, idx) => {
                  const Icon = policyIcons[idx];
                  return (
                    <div key={key} className="flex gap-6 md:gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold">
                          {t(`policy.${key}.title`)}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {t(`policy.${key}.content`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* ─── Tab 2: Platform Terms ─── */}
            {activeTab === "terms" && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-12">
                  <h2 className="text-3xl font-extrabold mb-4">
                    {t("policy.platformTerms.heading")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t("policy.platformTerms.intro")}
                  </p>
                </div>

                <div className="space-y-12">
                  {sections.map((section: { title: string; items: string[] }, sIdx: number) => {
                    const Icon = termIcons[sIdx] || Box;
                    return (
                      <div
                        key={sIdx}
                        className="bg-card/50 border border-border/50 rounded-3xl p-6 md:p-8"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold">
                            {section.title}
                          </h3>
                        </div>
                        <div className="space-y-4 pl-4 md:pl-16">
                          {section.items.map((item: string, iIdx: number) => (
                            <div key={iIdx} className="flex gap-4">
                              <span className="text-primary font-extrabold text-lg shrink-0 w-8">
                                {iIdx + 1}.
                              </span>
                              <p className="text-muted-foreground leading-relaxed">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── Tab 3: Factory Advantages ─── */}
            {activeTab === "advantages" && (
              <motion.div
                key="advantages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Advantages descriptions */}
                <div className="mb-16">
                  <h2 className="text-3xl font-extrabold mb-4">
                    {t("policy.factoryAdvantages.heading")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-10">
                    {t("policy.factoryAdvantages.intro")}
                  </p>

                  <div className="space-y-4">
                    {advItems.map(
                      (
                        adv: { title: string; description: string },
                        idx: number,
                      ) => {
                        const Icon = advIcons[idx] || ShieldCheck;
                        return (
                          <div
                            key={idx}
                            className="bg-card/50 border border-border/50 rounded-2xl p-5 md:p-6 flex items-start gap-4 hover:border-primary/20 transition-colors"
                          >
                            <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="font-bold text-base mb-1">
                                {adv.title}
                              </h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {adv.description}
                              </p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* How to get icons */}
                <div>
                  <h2 className="text-3xl font-extrabold mb-4">
                    {t("policy.factoryAdvantages.howToGetHeading")}
                  </h2>
                  <div className="space-y-4">
                    {advItems.map(
                      (
                        adv: { title: string; criteria: string },
                        idx: number,
                      ) => {
                        const Icon = advIcons[idx] || ShieldCheck;
                        return (
                          <div
                            key={idx}
                            className="bg-card/50 border border-border/50 rounded-2xl p-5 md:p-6 flex items-start gap-4"
                          >
                            <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="font-bold text-base mb-1">
                                {adv.title}
                              </h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {adv.criteria}
                              </p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
