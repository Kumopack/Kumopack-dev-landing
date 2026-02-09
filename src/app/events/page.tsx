"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SafeImage } from "@/components/ui/safe-image";
import { Sparkles, ArrowRight, Gift, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const events = [
  {
    id: 1,
    title: "Kumo Pack Design Awards 2024",
    description:
      "Showcase your most innovative packaging designs and win up to $10,000.",
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=2074",
    type: "Competition",
    status: "Upcoming",
    color: "bg-coral",
  },
  {
    id: 2,
    title: "Sustainable Sourcing Summit",
    description:
      "Join industry leaders to discuss the next generation of eco-friendly materials.",
    image:
      "https://images.unsplash.com/photo-1591115765373-520b7a426090?auto=format&fit=crop&q=80&w=2070",
    type: "Webinar",
    status: "Live",
    color: "bg-mint",
  },
  {
    id: 3,
    title: "Factory Partners Networking",
    description:
      "Exclusively for verified suppliers. Expand your network and find new opportunities.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    type: "Networking",
    status: "Open",
    color: "bg-sky",
  },
];

export default function EventsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            {t("nav.events")}
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            {t("events.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("events.subtitle")}
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card rounded-[3rem] overflow-hidden border border-border/50 hover:shadow-float transition-all cursor-pointer"
                onClick={() =>
                  window.open(
                    process.env.NEXT_PUBLIC_EVENT_URL ||
                      "https://event.kumopack.com",
                    "_blank",
                  )
                }
              >
                <div className="aspect-[4/3] relative">
                  <SafeImage
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span
                      className={`px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase ${event.color}`}
                    >
                      {event.type}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold uppercase">
                      {event.status}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-10">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="participant"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                        +42
                      </div>
                    </div>
                    <div className="text-primary font-bold text-sm flex items-center gap-1">
                      {t("events.joinNow")}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-lavender rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                  Have an Idea for an{" "}
                  <span className="text-primary">Engagement?</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We love collaborating with our community. If you want to host
                  a workshop or propose an event, get in touch!
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  className="rounded-2xl px-10 py-8 text-lg"
                >
                  Contact Partnership
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-4">
                  <Gift className="w-10 h-10 text-coral mx-auto" />
                  <div className="text-3xl font-extrabold">2.4k</div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Prizes Won
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-4">
                  <Trophy className="w-10 h-10 text-sky mx-auto" />
                  <div className="text-3xl font-extrabold">150+</div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Events Hosted
                  </div>
                </div>
                <div className="col-span-2 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-primary fill-current"
                      />
                    ))}
                  </div>
                  <div className="font-bold">4.9/5 Rating</div>
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
