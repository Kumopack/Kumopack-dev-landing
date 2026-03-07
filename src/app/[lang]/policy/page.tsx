"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, FileText, Lock, RefreshCcw } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function PolicyPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            {t("policy.title")}
          </h1>

          <div className="space-y-16">
            {[
              {
                icon: Shield,
                title: t("policy.security.title"),
                content: t("policy.security.content"),
              },
              {
                icon: FileText,
                title: t("policy.terms.title"),
                content: t("policy.terms.content"),
              },
              {
                icon: Lock,
                title: t("policy.privacy.title"),
                content: t("policy.privacy.content"),
              },
              {
                icon: RefreshCcw,
                title: t("policy.refund.title"),
                content: t("policy.refund.content"),
              },
            ].map((policy, idx) => (
              <div key={idx} className="flex gap-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <policy.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{policy.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {policy.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
