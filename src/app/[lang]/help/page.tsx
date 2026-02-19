"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ChevronRight, HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-16 px-4 md:px-8 bg-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            How can we help you?
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search for articles, guides..."
              className="w-full bg-white border border-border/50 rounded-2xl px-12 py-4 shadow-soft focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Getting Started", count: 12 },
              { title: "Ordering Process", count: 8 },
              { title: "Manufacturer Tips", count: 15 },
              { title: "Materials Guide", count: 20 },
              { title: "Payment & Billing", count: 6 },
              { title: "Troubleshooting", count: 10 },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="bg-card p-8 rounded-3xl border border-border/50 hover:border-primary/30 hover:shadow-float transition-all cursor-pointer group"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="text-sm">{cat.count} Articles</span>
                  <ChevronRight className="w-4 h-4" />
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
