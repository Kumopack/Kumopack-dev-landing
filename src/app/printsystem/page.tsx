"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Move3D, RotateCcw, Paintbrush, Save, Layout } from "lucide-react";

export default function PrintSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 px-4 md:px-8 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 h-[800px]">
            <div className="flex-1 bg-white rounded-3xl border border-border/50 shadow-float relative overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-4">
                <Move3D className="w-24 h-24 text-primary/20 mx-auto animate-float" />
                <h2 className="text-2xl font-bold">3D Designer Canvas</h2>
                <p className="text-muted-foreground">
                  Interactive 3D preview would render here.
                </p>
              </div>

              <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-4">
                {[Layout, Paintbrush, Cog].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="w-12 h-12 rounded-xl bg-white shadow-soft border border-border/50 flex items-center justify-center hover:bg-primary/5 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-foreground" />
                  </button>
                ))}
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-border/50 flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm font-medium">
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <div className="w-px h-4 bg-border" />
                <button className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Save className="w-4 h-4" /> Save Design
                </button>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-card rounded-3xl border border-border/50 p-8 space-y-10 overflow-y-auto">
              <div>
                <h3 className="text-xl font-bold mb-6">Design Controls</h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Box Style</label>
                    <select className="w-full bg-muted/30 border border-border/50 rounded-xl px-4 py-2 outline-none">
                      <option>Standard Mailer</option>
                      <option>Tuck Top</option>
                      <option>Shipping Box</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Material Color
                    </label>
                    <div className="flex gap-3">
                      {["#FFFFFF", "#EAD7BB", "#000000"].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold">Dimensions (cm)</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["L", "W", "H"].map((dim) => (
                    <div key={dim} className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        {dim}
                      </label>
                      <input
                        type="number"
                        defaultValue={20}
                        className="w-full bg-muted/30 border border-border/50 rounded-lg px-2 py-1 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border/50">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-sm text-muted-foreground">
                    Estimated Unit Price
                  </div>
                  <div className="text-2xl font-bold">$0.45</div>
                </div>
                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-glow hover:scale-[1.02] transition-transform">
                  Add to Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { Cog } from "lucide-react";
